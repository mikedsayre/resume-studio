import React, { useRef, useMemo, useEffect } from 'react';
import { StylePreset, StyleClasses } from '../types';

interface ResumePreviewProps {
  markdown: string;
  stylePreset: StylePreset;
  customCss: string;
}

// A simple markdown to HTML converter.
// This is a minimal implementation for the purpose of this demo.
// For robust markdown parsing, a library like `marked` or `react-markdown` would be used.
const convertMarkdownToHtml = (markdown: string, classes: StyleClasses): string => {
  let html = markdown;

  // Replace HR
  html = html.replace(/^---\s*$/gm, `<hr class="${classes.hr || ''}" />`);

  // Headings
  html = html.replace(/^###### (.*$)/gm, `<h6 class="${classes.h6 || ''}">$1</h6>`);
  html = html.replace(/^##### (.*$)/gm, `<h5 class="${classes.h5 || ''}">$1</h5>`);
  html = html.replace(/^#### (.*$)/gm, `<h4 class="${classes.h4 || ''}">$1</h4>`);
  html = html.replace(/^### (.*$)/gm, `<h3 class="${classes.h3 || ''}">$1</h3>`);
  html = html.replace(/^## (.*$)/gm, `<h2 class="${classes.h2 || ''}">$1</h2>`);
  html = html.replace(/^# (.*$)/gm, `<h1 class="${classes.h1 || ''}">$1</h1>`);

  // Bold and Italic (order matters for overlapping)
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, `<strong class="${classes.strong || ''}"><em class="${classes.em || ''}">$1</em></strong>`);
  html = html.replace(/\*\*(.*?)\*\*/g, `<strong class="${classes.strong || ''}">$1</strong>`);
  html = html.replace(/\*(.*?)\*/g, `<em class="${classes.em || ''}">$1</em>`);
  html = html.replace(/__(.*?)__/g, `<strong class="${classes.strong || ''}">$1</strong>`);
  html = html.replace(/_(.*?)_/g, `<em class="${classes.em || ''}">$1</em>`);

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2" class="${classes.a || ''}" target="_blank" rel="noopener noreferrer">$1</a>`);

  // Blockquote
  html = html.replace(/^> (.*$)/gm, `<blockquote class="${classes.blockquote || ''}"><p>${(classes.p || '') ? `<span class="${classes.p}">` : ''}$1${(classes.p || '') ? '</span>' : ''}</p></blockquote>`);

  // Inline Code
  html = html.replace(/`([^`]+)`/g, `<code class="${classes.code || ''}">$1</code>`);

  // Code Blocks (simple, assumes fenced code blocks without language specifiers)
  html = html.replace(/```\n([\s\S]*?)\n```/g, `<pre class="${classes.pre || ''}"><code class="${classes.code || ''}">$1</code></pre>`);

  // Lists (simple: assumes one list type per block and single level)
  const ulRegex = /^((\*|-)\s+.*(\n(\*|-)\s+.*)*)+/gm;
  html = html.replace(ulRegex, (match) => {
    const items = match.split('\n').map(line => {
      const trimmedLine = line.replace(/(\*|-)\s+/, '').trim();
      return `<li class="${classes.li || ''}">${(classes.p || '') ? `<span class="${classes.p}">` : ''}${trimmedLine}${(classes.p || '') ? '</span>' : ''}</li>`;
    }).join('');
    return `<ul class="${classes.ul || ''}">${items}</ul>`;
  });

  const olRegex = /^((\d+\.)\s+.*(\n(\d+\.)\s+.*)*)+/gm;
  html = html.replace(olRegex, (match) => {
    const items = match.split('\n').map(line => {
      const trimmedLine = line.replace(/(\d+\.)\s+/, '').trim();
      return `<li class="${classes.li || ''}">${(classes.p || '') ? `<span class="${classes.p}">` : ''}${trimmedLine}${(classes.p || '') ? '</span>' : ''}</li>`;
    }).join('');
    return `<ol class="${classes.ol || ''}">${items}</ol>`;
  });

  // Paragraphs (must be done last to not interfere with other block elements)
  html = html.split('\n\n').map(block => {
    // If block is empty or already handled by other parsers (e.g., headings, lists, blockquotes, code blocks, HR)
    if (block.trim() === '' || block.match(/<\/?h\d|<ul|<ol|<blockquote|<pre|<hr/)) {
        return block;
    }
    // Check if the block consists of a single line that's an HR
    if (block.trim().match(/^---\s*$/)) {
        return block;
    }
    // Wrap remaining lines that are not part of other blocks in paragraphs.
    // This is a very simplified paragraph handling. Real Markdown parsers are more complex.
    const lines = block.split('\n').filter(line => line.trim() !== '');
    if (lines.length > 0) {
      return `<p class="${classes.p || ''}">${lines.join('<br>')}</p>`;
    }
    return '';
  }).join('\n');

  // Remove empty lines from output
  html = html.split('\n').filter(line => line.trim() !== '').join('\n');

  return html;
};

// Utility function to prefix CSS selectors
const prefixCss = (css: string, prefixSelector: string): string => {
  if (!css) return '';

  // This regex attempts to match CSS rules (selector { ... }) and prepend the prefixSelector.
  // It handles multiple selectors separated by commas for a single rule.
  // It's a simplification and might not handle all complex CSS cases (e.g., @media, @keyframes, nested selectors)
  // but should cover common element, class, and ID selectors for styling resume content.
  // It also tries to avoid double-prefixing.
  return css.replace(/(^|\})(?:[^{]*?){/g, (match, p1) => {
    const selectorPart = match.substring(p1.length, match.indexOf('{')).trim();
    if (!selectorPart) return match; // skip if no selector found

    const prefixedSelectors = selectorPart.split(',').map(s => {
      const trimmed = s.trim();
      if (!trimmed || trimmed.startsWith(prefixSelector)) {
        return trimmed; // keep original if empty or already prefixed
      }
      return `${prefixSelector} ${trimmed}`; // prepend prefix
    }).filter(Boolean).join(', ');

    return `${p1}${prefixedSelectors}{`;
  });
};


const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ markdown, stylePreset, customCss }, ref) => {
    const { classes } = stylePreset;

    // Memoize the HTML generation to avoid unnecessary re-renders if markdown or classes don't change.
    const renderedHtml = useMemo(() => {
      return convertMarkdownToHtml(markdown, classes);
    }, [markdown, classes]);

    // Combine custom CSS with rendered HTML, injecting custom CSS as an inline <style> tag
    const finalContent = useMemo(() => {
      // Prefix custom CSS with a unique class to scope it to the preview area
      const prefixedCustomCss = prefixCss(customCss, '.resume-preview-root');
      const styleTag = prefixedCustomCss ? `<style>${prefixedCustomCss}</style>` : '';
      return `${styleTag}${renderedHtml}`;
    }, [renderedHtml, customCss]);

    useEffect(() => {
      // This effect ensures that the DOM element for PDF export is updated
      // after markdown content or styles change.
      // No direct DOM manipulation needed here, as React handles it via dangerouslySetInnerHTML.
      // This hook primarily ensures `ref.current` is fresh.
    }, [renderedHtml, customCss]);

    return (
      <div
        ref={ref}
        className={`w-full flex-1 p-8 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700
                   rounded-lg shadow-lg overflow-y-auto transition-colors duration-300 ${classes.base || ''} resume-preview-root`}
        dangerouslySetInnerHTML={{ __html: finalContent }}
      />
    );
  }
);

export default ResumePreview;
