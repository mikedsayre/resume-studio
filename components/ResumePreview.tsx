import React, { useRef, useMemo, useEffect } from 'react';
import { marked } from 'marked'; // Import marked
import DOMPurify from 'dompurify'; // Import DOMPurify
import { StylePreset, StyleClasses } from '../types.js'; // Added .js extension
// Removed import of prefixCss as it's moved to a separate utility file

interface ResumePreviewProps {
  markdown: string;
  stylePreset: StylePreset;
  // customCss prop is no longer needed here as it will be applied globally
}

/**
 * Converts Markdown content to HTML, sanitizes it, and applies Tailwind CSS classes
 * from the active style preset to the generated HTML elements.
 *
 * This function now uses the `marked` library for robust Markdown parsing, which
 * includes support for raw HTML passthrough. `DOMPurify` is used to sanitize
 * the HTML output, preventing potential Cross-Site Scripting (XSS) vulnerabilities.
 *
 * @param markdown The Markdown content to convert.
 * @param classes The StyleClasses object from the active StylePreset.
 * @returns An HTML string with applied styles and sanitization.
 */
const convertMarkdownToHtml = (markdown: string, classes: StyleClasses): string => {
  if (!markdown) return '';

  // 1. Parse markdown to HTML using marked
  // Configure marked for GitHub Flavored Markdown (GFM) and other common options.
  const rawHtml = marked.parse(markdown, {
    gfm: true,        // Enable GitHub Flavored Markdown
    breaks: true,     // Convert newlines to <br> tags (useful for resumes)
    mangle: false,    // Do not mangle email addresses
    headerIds: false, // Do not generate header IDs
  }) as string; // marked.parse returns string | Promise<string>, cast for synchronous use

  // 2. Sanitize HTML - CRITICAL for security when allowing raw HTML passthrough
  // We forbid script tags and common event attributes for a resume context.
  const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true }, // Allow standard HTML elements and attributes
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed'], // Restrict potentially dangerous tags
    FORBID_ATTR: ['onerror', 'onload', 'onmouseover', 'onmouseout', 'onfocus', 'onblur', 'onclick', 'ondblclick'], // Restrict event handlers
  });

  // 3. Create a temporary DOM element to apply classes dynamically
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = sanitizedHtml;

  // 4. Apply Tailwind CSS classes from the style preset to the generated HTML elements
  // Iterate over each style type (key) defined in StyleClasses
  const elementTypesToStyle: (keyof StyleClasses)[] = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a',
    'strong', 'em', 'blockquote', 'code', 'pre', 'table', 'th', 'td', 'hr'
  ];

  elementTypesToStyle.forEach(type => {
    const classString = classes[type];
    if (classString) {
      // Determine the HTML tag selector based on the StyleClasses key
      let selector: string = type.toString(); // Works for h1, p, ul, ol, li, a, blockquote, pre, table, th, td, hr

      // Special handling for elements that might have different Markdown-to-HTML mappings
      if (type === 'strong') {
        selector = 'strong';
      } else if (type === 'em') {
        selector = 'em';
      } else if (type === 'code') {
        // `marked` generates `<code>` for both inline code and within `<pre>` blocks
        selector = 'code';
      }

      tempDiv.querySelectorAll(selector).forEach(element => {
        // Split classString by space and add each class individually
        element.classList.add(...classString.split(' ').filter(Boolean));
      });
    }
  });

  // Return the inner HTML of the temporary div, which now contains sanitized and styled content
  return tempDiv.innerHTML;
};

// Moved prefixCss to utils/cssUtils.ts

const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ markdown, stylePreset }, ref) => { // Removed customCss from props
    const { classes } = stylePreset;

    // Memoize the HTML generation to avoid unnecessary re-renders if markdown or classes don't change.
    const renderedHtml = useMemo(() => {
      return convertMarkdownToHtml(markdown, classes);
    }, [markdown, classes]);

    // finalContent now only contains renderedHtml, no inline style tag
    const finalContent = useMemo(() => {
      return renderedHtml;
    }, [renderedHtml]);

    useEffect(() => {
      // This effect ensures that the DOM element for PDF export is updated
      // after markdown content or styles change.
      // No direct DOM manipulation needed here, as React handles it via dangerouslySetInnerHTML.
      // This hook primarily ensures `ref.current` is fresh.
    }, [renderedHtml]); // Removed customCss from dependency array

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