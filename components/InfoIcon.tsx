import React, { useState, useMemo } from 'react';

interface InfoIconProps {
  tooltipText: string;
  id?: string;
  className?: string;
  tooltipAlign?: 'left' | 'center' | 'right'; // New prop for tooltip alignment
  tooltipPlacement?: 'top' | 'bottom'; // New prop for tooltip vertical placement
}

const InfoIcon: React.FC<InfoIconProps> = ({
  tooltipText,
  id,
  className,
  tooltipAlign = 'center',
  tooltipPlacement = 'bottom', // Default to bottom
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipClasses = useMemo(() => {
    let alignmentClasses = '';
    let verticalClasses = '';
    let arrowClasses = '';
    let heightClasses = ''; // Added for height constraints

    // Horizontal alignment
    if (tooltipAlign === 'right') {
      alignmentClasses = 'right-0';
      arrowClasses += ' before:right-2';
    } else if (tooltipAlign === 'left') {
      alignmentClasses = 'left-0';
      arrowClasses += ' before:left-2';
    } else { // center (default)
      alignmentClasses = 'left-1/2 -translate-x-1/2';
      arrowClasses += ' before:left-1/2 before:-translate-x-1/2';
    }

    // Vertical placement
    if (tooltipPlacement === 'top') {
      verticalClasses = '-top-full mb-2'; // Position above, with margin
      arrowClasses += ' before:border-t-gray-700 dark:before:border-t-gray-200 before:bottom-0'; // Arrow points down, positioned at bottom of tooltip
      heightClasses = 'max-h-40 overflow-y-auto'; // Add max height and scroll for top-placed tooltips
    } else { // bottom (default)
      verticalClasses = '-bottom-full mt-2'; // Position below, with margin
      arrowClasses += ' before:border-b-gray-700 dark:before:border-b-gray-200 before:top-0'; // Arrow points up, positioned at top of tooltip
      // No max-h for bottom-placed tooltips by default, as they expand downwards
    }

    return `absolute z-70 p-2 text-xs text-gray-100 dark:text-gray-900 bg-gray-700 dark:bg-gray-200
            rounded-md shadow-lg w-48 break-words text-left
            ${verticalClasses}
            ${alignmentClasses}
            ${heightClasses}
            before:content-[''] before:absolute before:border-8 before:border-transparent
            ${arrowClasses}`;
  }, [tooltipAlign, tooltipPlacement]);

  return (
    <span
      className={`relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900 text-xs font-bold
                  cursor-help ml-2 opacity-70 hover:opacity-100 transition-opacity duration-200 ${className || ''}`}
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
          className={tooltipClasses}
          style={{ whiteSpace: 'normal' }}
        >
          {tooltipText}
        </div>
      )}
    </span>
  );
};

export default InfoIcon;