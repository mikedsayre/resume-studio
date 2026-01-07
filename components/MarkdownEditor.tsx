import React from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  ariaDescribedBy?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, ariaDescribedBy }) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      className="w-full flex-1 p-6 text-lg font-mono bg-gray-800 dark:bg-white
                 text-gray-200 dark:text-gray-800 border border-gray-700 dark:border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                 shadow-lg resize-none transition-colors duration-300 placeholder-gray-400"
      value={value}
      onChange={handleChange}
      placeholder="Start writing your resume in Markdown here..."
      aria-label="Markdown Editor"
      aria-describedby={ariaDescribedBy}
    />
  );
};

export default MarkdownEditor;