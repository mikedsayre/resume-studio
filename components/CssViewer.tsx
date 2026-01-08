
import React from 'react';
import { StylePreset, StyleClasses } from '../types.js'; // Added .js extension
import { STYLE_PRESETS } from '../constants.js'; // Added .js extension

interface CssViewerProps {
  show: boolean;
  onClose: () => void;
  stylePreset: StylePreset;
}

const CssViewer: React.FC<CssViewerProps> = ({ show, onClose, stylePreset }) => {
  if (!show) return null;

  const renderCssClasses = () => {
    // With the index signature added to StyleClasses, direct assignment is correct.
    const classes = stylePreset.classes;
    
    // Fix: Change elements array type to include all keys of StyleClasses,
    // as 'base' is not a MarkdownElementType.
    const elements: (keyof StyleClasses)[] = [
      'base', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a',
      'strong', 'em', 'blockquote', 'code', 'pre', 'table', 'th', 'td', 'hr'
    ];

    return (
      <pre className="text-sm bg-gray-900 dark:bg-gray-100 text-green-300 dark:text-gray-700 p-4 rounded-lg overflow-x-auto">
        {elements.map(type => {
          // 'type' is now correctly inferred as keyof StyleClasses, no explicit cast needed.
          const classString = classes[type];
          return classString ? (
            <div key={type}>
              <span className="text-blue-400 dark:text-blue-700">{`.${String(type).toLowerCase()} `}</span>
              <span className="text-yellow-300 dark:text-yellow-800">{'{\n'}</span>
              <span className="text-gray-300 dark:text-gray-600">{'  /* Tailwind Classes */\n'}</span>
              <span className="text-orange-300 dark:text-orange-800">{`  classes: `}</span>
              <span className="text-white dark:text-gray-800">{`"${classString}"`}</span>
              <span className="text-yellow-300 dark:text-yellow-800">{';\n}\n'}</span>
            </div>
          ) : null;
        })}
      </pre>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4" onClick={onClose}>
      <div
        className="bg-gray-800 dark:bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="css-viewer-title"
      >
        <div className="flex justify-between items-center border-b border-gray-700 dark:border-gray-300 pb-3 mb-4">
          <h3 id="css-viewer-title" className="font-rajdhani text-2xl font-bold text-indigo-400 dark:text-indigo-700">
            CSS for "{stylePreset.name}" Preset
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-gray-800
                       hover:bg-gray-600 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close CSS Viewer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {renderCssClasses()}
        <p className="mt-4 text-gray-400 dark:text-gray-600 text-sm">
          These are the Tailwind CSS classes applied to each Markdown element type for the "{stylePreset.name}" preset.
        </p>
      </div>
    </div>
  );
};

export default CssViewer;