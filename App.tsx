import React, { useState, useEffect, useCallback, useRef } from 'react';
import ThemeToggle from './components/ThemeToggle.js';
import MarkdownEditor from './components/MarkdownEditor.js';
import ResumePreview from './components/ResumePreview.js';
import StyleControls from './components/StyleControls.js';
import ExportButtons from './components/ExportButtons.js';
// Removed CssEditorButton import
import CssEditorModal from './components/CssEditorModal.js';
import CssViewer from './components/CssViewer.js';
import HelpModal from './components/HelpModal.js';
import { Theme, StylePresetName } from './types.js';
import {
  DEFAULT_MARKDOWN_CONTENT,
  STYLE_PRESETS,
  HEADER_LOGO_PATH,
  FOOTER_LOGO_PATH,
} from './constants.js';
import { exportToPdf } from './services/pdfService.js';
import { prefixCss } from './utils/cssUtils.js';

const App: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>(DEFAULT_MARKDOWN_CONTENT);
  const [currentTheme, setCurrentTheme] = useState<Theme>(Theme.Dark);
  const [selectedStylePreset, setSelectedStylePreset] = useState<StylePresetName>(StylePresetName.Modern);
  const [customCssContent, setCustomCssContent] = useState<string>('');
  const [showCssEditor, setShowCssEditor] = useState<boolean>(false);
  const [showCssViewer, setShowCssViewer] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (currentTheme === Theme.Dark) {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    }
    document.body.classList.toggle('dark', currentTheme === Theme.Dark);
    document.body.classList.toggle('light', currentTheme === Theme.Light);
  }, [currentTheme]);

  const handleThemeToggle = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
  }, []);

  const handleMarkdownChange = useCallback((value: string) => {
    setMarkdownContent(value);
  }, []);

  const handleStylePresetChange = useCallback((preset: StylePresetName) => {
    setSelectedStylePreset(preset);
  }, []);

  const handleExportPdf = useCallback(() => {
    if (previewRef.current) {
      exportToPdf(previewRef.current, 'resume.pdf');
    } else {
      alert('Resume preview not available for export.');
    }
  }, []);

  const copyToClipboard = useCallback(async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(successMessage);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy to clipboard.');
    }
  }, []);

  const handleCopyMarkdown = useCallback(() => {
    copyToClipboard(markdownContent, 'Markdown content copied to clipboard!');
  }, [markdownContent, copyToClipboard]);

  const handleCopyHtml = useCallback(() => {
    if (previewRef.current) {
      const currentCustomCss = prefixCss(customCssContent, '.resume-preview-root');
      const styledHtml = `<style>${currentCustomCss}</style>${previewRef.current.innerHTML}`;
      copyToClipboard(
        styledHtml,
        'Rendered HTML copied to clipboard! Note: Pasting into Google Docs may not perfectly retain all styles.'
      );
    } else {
      alert('Resume preview not available to copy HTML from.');
    }
  }, [copyToClipboard, customCssContent]);

  const currentYear = new Date().getFullYear();

  const prefixedCustomCss = prefixCss(customCssContent, '.resume-preview-root');

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center py-4 px-2 sm:p-4 font-inter transition-colors duration-300
                    ${currentTheme === Theme.Dark
                      ? 'bg-gradient-to-br from-gray-900 to-black text-gray-100'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800'}`
                    }>
      {prefixedCustomCss && <style>{prefixedCustomCss}</style>}

      <header className="w-full max-w-7xl bg-gray-800 dark:bg-white rounded-xl shadow-xl transition-colors duration-300 mb-4 flex flex-col p-4 sm:p-3">
        {/* Top row: Logo, Title, Tagline, Brand, and Utility Buttons (Help, Theme, View CSS) */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end w-full pb-3 sm:pb-2 border-b border-gray-700 dark:border-gray-300 mb-3 sm:mb-2">
          {/* Logo and Title Group */}
          <div className="flex items-end mb-2 sm:mb-0">
            <img
              src={HEADER_LOGO_PATH}
              alt="Resume Studio Logo"
              className="w-[4em] h-[4em] object-contain mr-2 leading-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start">
              <h1 className="font-rajdhani text-2xl sm:text-3xl font-extrabold text-indigo-400 dark:text-indigo-700 tracking-wide">
                Resume Studio
              </h1>
              <span className="text-xs sm:text-sm font-light text-gray-400 dark:text-gray-500 mt-1">
                Style Your Future.
              </span>
              <a
                href="https://swanlakedigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 text-gray-400 dark:text-gray-500 text-xs hover:underline hover:text-indigo-400 dark:hover:text-indigo-600 transition-colors duration-200"
                aria-label="Visit Swan Lake Digital website"
              >
                by swan lake digital
              </a>
            </div>
          </div>

          {/* Utility Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-2 gap-y-1">
            <button
              onClick={() => setShowHelpModal(true)}
              className="px-3 py-1 text-sm rounded-md shadow-sm transition-all duration-300 hover:scale-105
                         bg-gray-700 hover:bg-gray-600 dark:bg-gray-100 dark:hover:bg-gray-200
                         text-gray-100 dark:text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              aria-label="Open Help and Readme"
            >
              Help
            </button>
            <ThemeToggle currentTheme={currentTheme} onToggle={handleThemeToggle} displayAsText={true} />
            <button
              onClick={() => setShowCssViewer(true)}
              className="px-3 py-1 text-sm rounded-md shadow-sm transition-all duration-300 hover:scale-105
                         bg-gray-700 hover:bg-gray-600 dark:bg-gray-100 dark:hover:bg-gray-200
                         text-gray-100 dark:text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              aria-label="View current style preset CSS"
            >
              View Style CSS
            </button>
          </div>
        </div>

        {/* Second row: Style Controls and Export/Custom CSS Buttons */}
        <div className="flex flex-col items-center gap-y-3 sm:flex-row sm:flex-wrap sm:justify-between sm:items-center sm:gap-x-3 sm:gap-y-2 w-full">
          <StyleControls
            selectedPreset={selectedStylePreset}
            onSelectPreset={handleStylePresetChange}
          />
          <ExportButtons
            onExportPdf={handleExportPdf}
            onCopyMarkdown={handleCopyMarkdown}
            onCopyHtml={handleCopyHtml}
            showCssEditor={showCssEditor}
            onToggleCssEditor={() => setShowCssEditor(!showCssEditor)}
          />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl flex-grow bg-gray-900 dark:bg-gray-50
                      rounded-xl shadow-xl overflow-hidden transition-colors duration-300">
        <section className="flex-1 p-4 sm:p-6 border-r border-gray-700 dark:border-gray-300 lg:min-h-0 min-h-[45vh] flex flex-col">
          <h2 className="font-rajdhani text-xl sm:text-2xl font-bold text-gray-200 dark:text-gray-800 mb-3 flex items-center">
            Markdown Editor
            <span className="text-[0.75rem] leading-[0.85rem] sm:text-xs md:text-sm text-gray-400 dark:text-gray-500 ml-2">
              Write your resume using Markdown syntax, including raw HTML. Changes are reflected instantly.
            </span>
          </h2>
          <MarkdownEditor value={markdownContent} onChange={handleMarkdownChange} />
        </section>

        <section className="flex-1 p-4 sm:p-6 lg:min-h-0 min-h-[45vh] flex flex-col">
          <h2 className="font-rajdhani text-xl sm:text-2xl font-bold text-gray-200 dark:text-gray-800 mb-3 flex items-center">
            Resume Preview
            <span className="text-[0.75rem] leading-[0.85rem] sm:text-xs md:text-sm text-gray-400 dark:text-gray-500 ml-2">
              See how your resume will look with the selected style. This is what will be exported.
            </span>
          </h2>
          <ResumePreview
            ref={previewRef}
            markdown={markdownContent}
            stylePreset={STYLE_PRESETS[selectedStylePreset]}
          />
        </section>
      </div>

      <footer className="mt-6 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 text-sm font-inter">
        <img
          src={FOOTER_LOGO_PATH}
          alt="Swan Lake Digital Logo"
          className="w-[4em] h-[4em] object-contain mb-2 leading-none"
          aria-hidden="true"
        />
        <span>
          Made by Google AI Studio and <a href="https://swanlakedigital.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 dark:text-indigo-600 hover:underline">swanlakedigital.com</a> &copy; {currentYear}
        </span>
      </footer>

      <CssViewer show={showCssViewer} onClose={() => setShowCssViewer(false)} stylePreset={STYLE_PRESETS[selectedStylePreset]} />
      <HelpModal show={showHelpModal} onClose={() => setShowHelpModal(false)} />

      <CssEditorModal
        show={showCssEditor}
        onClose={() => setShowCssEditor(false)}
        customCssContent={customCssContent}
        setCustomCssContent={setCustomCssContent}
      />
    </div>
  );
};

export default App;