import React from 'react';

interface CssEditorButtonProps {
  showCssEditor: boolean;
  onToggle: () => void;
}

const CssEditorButton: React.FC<CssEditorButtonProps> = ({ showCssEditor, onToggle }) => {
  const buttonClasses = "px-3 py-2 rounded-lg text-xs font-medium " +
                            "bg-gray-600 hover:bg-gray-700 dark:bg-gray-300 dark:hover:bg-gray-400 " +
                            "text-white dark:text-gray-900 shadow-sm transform hover:scale-105 transition-all duration-300 " +
                            "focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-600 " +
                            "flex items-center gap-1.5"; // Added flexbox for alignment
  return (
    <button
      onClick={onToggle}
      className={buttonClasses}
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
        className="w-4 h-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
      Edit CSS
    </button>
  );
};

export default CssEditorButton;