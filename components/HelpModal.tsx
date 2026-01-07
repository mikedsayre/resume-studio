import React from 'react';

interface HelpModalProps {
  show: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4" onClick={onClose}>
      <div
        className="bg-gray-800 dark:bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
      >
        <div className="flex justify-between items-center border-b border-gray-700 dark:border-gray-300 pb-3 mb-4">
          <h3 id="help-modal-title" className="font-rajdhani text-2xl font-bold text-indigo-400 dark:text-indigo-700">
            Welcome to Resume Studio!
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-gray-800
                       hover:bg-gray-600 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close Help"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="text-gray-200 dark:text-gray-700 space-y-4 font-inter">
          <p>
            This is your advanced Markdown Resume Editor, designed to help you create professional and stylish resumes with ease.
          </p>

          <section>
            <h4 className="font-rajdhani text-xl font-semibold text-indigo-300 dark:text-indigo-600 mb-2">How it Works:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Markdown Editor:</strong> Write your resume content using standard Markdown syntax on the left panel.
                Changes are reflected in real-time on the right preview panel.
              </li>
              <li>
                <strong>Resume Preview:</strong> See an instant, styled preview of your resume. This is exactly how it will look when exported to PDF.
              </li>
              <li>
                <strong>Style Presets:</strong> Use the "Choose Style" dropdown in the header to instantly apply one of our professionally designed style presets to your resume.
              </li>
              <li>
                <strong>Custom CSS Editor:</strong> Click the <code className="font-mono bg-gray-700 dark:bg-gray-300 px-1 rounded text-green-300 dark:text-green-800">{'< />'}</code> icon in the top right to open a CSS editor. Here, you can write custom CSS to override or add new styles to your resume, giving you ultimate control.
              </li>
              <li>
                <strong>View Preset CSS:</strong> Click the <code className="font-mono bg-gray-700 dark:bg-gray-300 px-1 rounded text-green-300 dark:text-green-800">{'</>'}</code> icon to see the underlying Tailwind CSS classes used by the currently selected style preset.
              </li>
              <li>
                <strong>Export Options:</strong> Easily export your resume as a PDF, or copy the raw Markdown or styled HTML to your clipboard for use in other applications (e.g., Google Docs).
              </li>
              <li>
                <strong>Theme Toggle:</strong> Switch between a sleek Dark Mode and a bright Light Mode using the sun/moon icon in the top right.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="font-rajdhani text-xl font-semibold text-indigo-300 dark:text-indigo-600 mb-2">Markdown Quick Guide:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li><code className="code-style"># H1</code>, <code className="code-style">## H2</code>, <code className="code-style">### H3</code> for headings.</li>
              <li><code className="code-style">**bold**</code> or <code className="code-style">__bold__</code> for bold text.</li>
              <li><code className="code-style">*italic*</code> or <code className="code-style">_italic_</code> for italic text.</li>
              <li><code className="code-style">- List item</code> or <code className="code-style">* List item</code> for unordered lists.</li>
              <li><code className="code-style">1. List item</code> for ordered lists.</li>
              <li><code className="code-style">[Link Text](URL)</code> for hyperlinks.</li>
              <li><code className="code-style">---</code> for a horizontal rule.</li>
            </ul>
          </section>

          <p className="mt-4 text-center text-gray-300 dark:text-gray-600">
            Happy resume building!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;