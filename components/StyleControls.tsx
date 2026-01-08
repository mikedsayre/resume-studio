import React from 'react';
import { StylePresetName } from '../types.js'; // Added .js extension
import { STYLE_PRESETS } from '../constants.js'; // Added .js extension
import InfoIcon from './InfoIcon.js'; // Added .js extension

interface StyleControlsProps {
  selectedPreset: StylePresetName;
  onSelectPreset: (preset: StylePresetName) => void;
}

const StyleControls: React.FC<StyleControlsProps> = ({ selectedPreset, onSelectPreset }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="style-preset-select" className="text-gray-200 dark:text-gray-800 text-sm font-medium mr-1">
        Style:
      </label>
      <select
        id="style-preset-select"
        value={selectedPreset}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSelectPreset(e.target.value as StylePresetName)}
        className="px-3 py-1.5 rounded-lg bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-gray-800
                   border border-gray-600 dark:border-gray-300 focus:outline-none focus:ring-2
                   focus:ring-indigo-500 dark:focus:ring-indigo-400 shadow-sm appearance-none
                   transition-colors duration-300 cursor-pointer text-sm"
        title={`Current style: ${STYLE_PRESETS[selectedPreset].name}. ${STYLE_PRESETS[selectedPreset].description}`}
        aria-label="Choose resume style preset"
      >
        {Object.values(StylePresetName).map((presetName) => (
          <option key={presetName} value={presetName}>
            {STYLE_PRESETS[presetName].name}
          </option>
        ))}
      </select>
      <InfoIcon
        id="style-preset-info"
        tooltipText="Select a predefined styling preset to change the look and feel of your resume."
        // Removed className="hidden sm:inline-flex" to always show the icon
      />
    </div>
  );
};

export default StyleControls;