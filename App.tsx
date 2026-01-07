import React, { useState, useEffect, useCallback, useRef } from 'react';
import ThemeToggle from './components/ThemeToggle';
import MarkdownEditor from './components/MarkdownEditor';
import ResumePreview from './components/ResumePreview';
import StyleControls from './components/StyleControls';
import ExportButtons from './components/ExportButtons';
import CssEditorToggle from './components/CssEditorToggle';
import CssViewer from './components/CssViewer';
import HelpModal from './components/HelpModal';
import InfoIcon from './components/InfoIcon';
import { Theme, StylePresetName } from './types';
import { DEFAULT_MARKDOWN_CONTENT, STYLE_PRESETS } from './constants';
import { exportToPdf } from './services/pdfService';

const App: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>(DEFAULT_MARKDOWN_CONTENT);
  const [currentTheme, setCurrentTheme] = useState<Theme>(Theme.Dark);
  const [selectedStylePreset, setSelectedStylePreset] = useState<StylePresetName>(StylePresetName.Modern);
  const [customCssContent, setCustomCssContent] = useState<string>('');
  const [showCssEditor, setShowCssEditor] = useState<boolean>(false);
  const [showCssViewer, setShowCssViewer] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const customCssStyleTagRef = useRef<HTMLStyleElement | null>(null);

  // Effect to apply theme class to the documentElement (html tag)
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (currentTheme === Theme.Dark) {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    }
    // Also explicitly set body classes for consistent base styling
    document.body.classList.toggle('dark', currentTheme === Theme.Dark);
    document.body.classList.toggle('light', currentTheme === Theme.Light);
  }, [currentTheme]);

  // Effect to inject custom CSS into the document head
  useEffect(() => {
    if (!customCssStyleTagRef.current) {
      customCssStyleTagRef.current = document.createElement('style');
      customCssStyleTagRef.current.type = 'text/css';
      customCssStyleTagRef.current.id = 'custom-resume-styles';
      document.head.appendChild(customCssStyleTagRef.current);
    }
    customCssStyleTagRef.current.innerHTML = customCssContent;
  }, [customCssContent]);

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
      copyToClipboard(
        previewRef.current.innerHTML,
        'Rendered HTML copied to clipboard! Note: Pasting into Google Docs may not perfectly retain all styles.'
      );
    } else {
      alert('Resume preview not available to copy HTML from.');
    }
  }, [copyToClipboard]);

  const currentYear = new Date().getFullYear();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center py-4 px-2 sm:p-4 font-inter transition-colors duration-300
                    ${currentTheme === Theme.Dark
                      ? 'bg-gradient-to-br from-gray-900 to-black text-gray-100'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800'}`
                    }>
      <header className="w-full max-w-7xl bg-gray-800 dark:bg-white rounded-xl shadow-xl transition-colors duration-300 mb-4 flex flex-col p-4 sm:p-3">
        {/* Top Header Row: Title, Help, Theme Toggle, Show CSS, CSS Editor Toggle */}
        <div className="flex justify-between items-center w-full pb-3 sm:pb-2 border-b border-gray-700 dark:border-gray-300 mb-3 sm:mb-2">
          <div className="flex items-end">
            <h1 className="font-rajdhani text-2xl sm:text-3xl font-extrabold text-indigo-400 dark:text-indigo-700 tracking-wide">
              Resume Studio
            </h1>
            <a
              href="https://swanlakedigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-gray-400 dark:text-gray-500 text-sm hover:underline hover:text-indigo-400 dark:hover:text-indigo-600 transition-colors duration-200"
              aria-label="Visit Swan Lake Digital website"
            >
              by swan lake digital
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
             {/* Help Button */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2 rounded-full bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                         hover:scale-105 transition-all duration-300 shadow-md"
              aria-label="Open Help and Readme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.784.47-1.391 1.254-1.391 2.115v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <ThemeToggle currentTheme={currentTheme} onToggle={handleThemeToggle} />
            {/* Show CSS Used Button */}
            <button
              onClick={() => setShowCssViewer(true)}
              className="p-2 rounded-full bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                         hover:scale-105 transition-all duration-300 shadow-md"
              aria-label="View current style preset CSS"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.25H9.75a2.25 2.25 0 00-2.25 2.25v.75A2.25 2.25 0 019.75 13.5h.75m-3 0l3-3m-3 3l3 3m6.75-9V8.25a2.25 2.25 0 00-2.25-2.25H16.5m-3 0l3-3m-3 3l3 3m-.75-9h4.5a2.25 2.25 0 012.25 2.25v4.5a2.25 2.25 0 01-2.25 2.25h-2.25" />
              </svg>
            </button>
            <CssEditorToggle
              customCssContent={customCssContent}
              setCustomCssContent={setCustomCssContent}
              showCssEditor={showCssEditor}
              setShowCssEditor={setShowCssEditor}
            />
          </div>
        </div>

        {/* Bottom Header Row (Toolbar): Style Controls, Export Buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-6 w-full">
          <StyleControls
            selectedPreset={selectedStylePreset}
            onSelectPreset={handleStylePresetChange}
          />
          <ExportButtons
            onExportPdf={handleExportPdf}
            onCopyMarkdown={handleCopyMarkdown}
            onCopyHtml={handleCopyHtml}
          />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl flex-grow bg-gray-900 dark:bg-gray-50
                      rounded-xl shadow-xl overflow-hidden transition-colors duration-300">
        {/* Markdown Editor Panel */}
        <section className="flex-1 p-4 sm:p-6 border-r border-gray-700 dark:border-gray-300 lg:min-h-0 min-h-[45vh] flex flex-col">
          <h2 className="font-rajdhani text-xl sm:text-2xl font-bold text-gray-200 dark:text-gray-800 mb-3 flex items-center">
            Markdown Editor
            <InfoIcon id="editor-info" tooltipText="Write your resume using Markdown syntax. Changes are reflected instantly in the preview." />
          </h2>
          <MarkdownEditor value={markdownContent} onChange={handleMarkdownChange} />
        </section>

        {/* Resume Preview Panel */}
        <section className="flex-1 p-4 sm:p-6 lg:min-h-0 min-h-[45vh] flex flex-col">
          <h2 className="font-rajdhani text-xl sm:text-2xl font-bold text-gray-200 dark:text-gray-800 mb-3 flex items-center">
            Resume Preview
            <InfoIcon id="preview-info" tooltipText="See how your resume will look with the selected style. This is what will be exported." />
          </h2>
          <ResumePreview ref={previewRef} markdown={markdownContent} stylePreset={STYLE_PRESETS[selectedStylePreset]} />
        </section>
      </div>

      <footer className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm font-inter">
        Made by Google AI Studio and <a href="https://swanlakedigital.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 dark:text-indigo-600 hover:underline">swanlakedigital.com</a> &copy; {currentYear}
      </footer>

      {/* Modals */}
      <CssViewer show={showCssViewer} onClose={() => setShowCssViewer(false)} stylePreset={STYLE_PRESETS[selectedStylePreset]} />
      <HelpModal show={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </div>
  );
};

export default App;