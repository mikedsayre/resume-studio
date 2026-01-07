import React from 'react';
import InfoIcon from './InfoIcon';

interface ExportButtonsProps {
  onExportPdf: () => void;
  onCopyMarkdown: () => void;
  onCopyHtml: () => void;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ onExportPdf, onCopyMarkdown, onCopyHtml }) => {
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
    <div className="flex items-center gap-3">
      <button onClick={onExportPdf} className={primaryButtonClasses} aria-label="Export resume to PDF">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-4.5h5.25A2.25 2.25 0 0118 7.5v4.625" />
        </svg>
        PDF
      </button>

      <div className="flex gap-2">
        <button onClick={onCopyMarkdown} className={secondaryButtonClasses} aria-label="Copy Markdown code to clipboard">
          Copy MD
        </button>
        <button onClick={onCopyHtml} className={secondaryButtonClasses} aria-label="Copy rendered HTML to clipboard">
          Copy HTML
        </button>
      </div>
      <InfoIcon
        id="export-buttons-info"
        tooltipText="Export your resume as a PDF, or copy the Markdown/HTML content to your clipboard for use elsewhere (e.g., Google Docs)."
        className="hidden sm:inline-flex"
      />
    </div>
  );
};

export default ExportButtons;