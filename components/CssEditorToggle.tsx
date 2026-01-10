import React from 'react';

interface CssEditorModalProps {
  customCssContent: string;
  setCustomCssContent: (css: string) => void;
  show: boolean;
  onClose: () => void;
}

const CssEditorModal: React.FC<CssEditorModalProps> = ({
  customCssContent,
  setCustomCssContent,
  show,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
      onClick={onClose} // Close modal on backdrop click
      role="dialog"
      aria-modal="true"
      aria-labelledby="css-editor-modal-title"
    >
      <div
        className="bg-gray-800/90 dark:bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center border-b border-gray-700 dark:border-gray-300 pb-3 mb-4">
          <h3 id="css-editor-modal-title" className="font-rajdhani text-2xl font-bold text-indigo-400 dark:text-indigo-700">
            Custom CSS Editor
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-gray-800
                       hover:bg-gray-600 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close Custom CSS Editor"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <textarea
          id="custom-css-editor-area"
          className="w-full h-64 p-3 text-sm font-mono bg-gray-900 dark:bg-gray-100
                     text-gray-200 dark:text-gray-800 border border-gray-700 dark:border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                     shadow-md resize-y transition-colors duration-300 placeholder-gray-400"
          value={customCssContent}
          onChange={(e) => setCustomCssContent(e.target.value)}
          placeholder="/* Add your custom CSS here (e.g., .resume-preview-root h1 { color: red !important; }) */"
          aria-label="Custom CSS Editor"
        />
        <p className="mt-4 text-gray-400 dark:text-gray-600 text-sm">
          Use custom CSS to override or add new styles. For full control, especially over font styles, you may need to use `!important`.
          Styles will be scoped to the `.resume-preview-root` class.
        </p>
      </div>
    </div>
  );
};

export default CssEditorModal;