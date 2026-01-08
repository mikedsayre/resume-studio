import React from 'react';
import InfoIcon from './InfoIcon.js'; // Added .js extension

interface CssEditorToggleProps {
  customCssContent: string;
  setCustomCssContent: (css: string) => void;
  showCssEditor: boolean;
  setShowCssEditor: (show: boolean) => void;
}

const CssEditorToggle: React.FC<CssEditorToggleProps> = ({
  customCssContent,
  setCustomCssContent,
  showCssEditor,
  setShowCssEditor,
}) => {
  const toggleEditor = () => setShowCssEditor(!showCssEditor);

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center">
        <button
          onClick={toggleEditor}
          className="p-2 rounded-full bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-gray-800
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                     hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-1"
          aria-expanded={showCssEditor}
          aria-controls="custom-css-editor-area"
          aria-label="Toggle Custom CSS Editor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </button>
        <InfoIcon
          id="css-editor-info"
          tooltipText="Enter custom CSS here to override or add styles to your resume preview. These styles will be included in the PDF export. For full control, especially over font styles, you may need to use `!important`."
          className="hidden sm:inline-flex"
        />
      </div>

      {showCssEditor && (
        <textarea
          id="custom-css-editor-area"
          className="mt-2 w-full max-w-lg h-32 p-3 text-sm font-mono bg-gray-800 dark:bg-white
                     text-gray-200 dark:text-gray-800 border border-gray-700 dark:border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                     shadow-md resize-y transition-colors duration-300 placeholder-gray-400"
          value={customCssContent}
          onChange={(e) => setCustomCssContent(e.target.value)}
          placeholder="/* Add your custom CSS here */"
          aria-label="Custom CSS Editor"
          aria-describedby="css-editor-info"
        />
      )}
    </div>
  );
};

export default CssEditorToggle;