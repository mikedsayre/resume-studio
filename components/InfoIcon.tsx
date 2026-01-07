import React, { useState } from 'react';

interface InfoIconProps {
  tooltipText: string;
  id?: string;
  className?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ tooltipText, id, className }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className={`relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900 text-xs font-bold
                  cursor-help ml-2 opacity-70 hover:opacity-100 transition-opacity duration-200 ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      aria-label={tooltipText}
      id={id}
      tabIndex={0} // Make it focusable
    >
      i
      {showTooltip && (
        <div
          role="tooltip"
          id={id ? `${id}-tooltip` : undefined}
          // Increased z-index to ensure it's on top of all other elements
          className="absolute z-70 p-2 text-xs text-gray-100 dark:text-gray-900 bg-gray-700 dark:bg-gray-200
                     rounded-md shadow-lg w-48 break-words text-left
                     -bottom-full left-1/2 -translate-x-1/2 mt-2
                     before:content-[''] before:absolute before:left-1/2 before:bottom-full before:-translate-x-1/2
                     before:border-8 before:border-transparent before:border-b-gray-700 dark:before:border-b-gray-200"
          style={{ transform: 'translateX(-50%)', whiteSpace: 'normal' }} // Override Tailwind transform for better centering
        >
          {tooltipText}
        </div>
      )}
    </span>
  );
};

export default InfoIcon;