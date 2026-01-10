import React from 'react';
import CssEditorButton from './CssEditorButton.js'; // Import the new CssEditorButton

interface ExportButtonsProps {
  onExportPdf: () => void;
  onCopyMarkdown: () => void;
  onCopyHtml: () => void;
  showCssEditor: boolean; // Added prop for CssEditorButton
  onToggleCssEditor: () => void; // Added prop for CssEditorButton
}

const ExportButtons: React.FC<ExportButtonsProps> = ({
  onExportPdf,
  onCopyMarkdown,
  onCopyHtml,
  showCssEditor,
  onToggleCssEditor,
}) => {
  const primaryButtonClasses = "px-4 py-2 rounded-lg text-sm font-semibold tracking-wide " +
                        "flex items-center justify-center gap-1.5 " +
                        "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 " +
                        "text-white shadow-md transform hover:scale-105 transition-all duration-300 " +
                        "focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400";

  const secondaryButtonClasses = "px-3 py-2 rounded-lg text-xs font-medium " +
                            "bg-gray-600 hover:bg-gray-700 dark:bg-gray-300 dark:hover:bg-gray-400 " +
                            "text-white dark:text-gray-900 shadow-sm transform hover:scale-105 transition-all duration-300 " +
                            "focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-600";

  return (
    <div className="flex flex-col items-center gap-y-2 w-full sm:w-auto sm:flex-row sm:gap-x-3 sm:gap-y-0">
      {/* Group for all buttons (PDF, Copy MD, Copy HTML, CSS) */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
        {/* PDF Button */}
        <button onClick={onExportPdf} className={primaryButtonClasses} aria-label="Export resume to PDF">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-4.5h5.25A2.25 2.25 0 0118 7.5v4.625" />
          </svg>
          PDF
        </button>

        <button onClick={onCopyMarkdown} className={secondaryButtonClasses} aria-label="Copy Markdown code to clipboard">
          Copy MD
        </button>
        <button onClick={onCopyHtml} className={secondaryButtonClasses} aria-label="Copy rendered HTML to clipboard">
          Copy HTML
        </button>
        <CssEditorButton
          showCssEditor={showCssEditor}
          onToggle={onToggleCssEditor}
        />
      </div>

      {/* Descriptive Text - now flows below buttons on mobile */}
      <span className="text-[0.75rem] leading-[0.85rem] sm:text-xs md:text-sm text-gray-400 dark:text-gray-500 w-full text-center sm:text-left sm:w-auto">
        Export PDF, copy Markdown or HTML. Use custom CSS for advanced styling.
      </span>
    </div>
  );
};

export default ExportButtons;