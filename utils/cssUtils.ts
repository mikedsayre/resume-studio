// Utility function to prefix CSS selectors
export const prefixCss = (css: string, prefixSelector: string): string => {
  if (!css) return '';

  // This regex attempts to match CSS rules (selector { ... }) and prepend the prefixSelector.
  // It handles multiple selectors separated by commas for a single rule.
  // It's a simplification and might not handle all complex CSS cases (e.g., @media, @keyframes, nested selectors)
  // but should cover common element, class, and ID selectors for styling resume content.
  // It also tries to avoid double-prefixing.
  return css.replace(/(^|\})(?:[^{]*?){/g, (match, p1) => {
    const selectorPart = match.substring(p1.length, match.indexOf('{')).trim();
    if (!selectorPart) return match; // skip if no selector found

    const prefixedSelectors = selectorPart.split(',').map(s => {
      const trimmed = s.trim();
      if (!trimmed || trimmed.startsWith(prefixSelector)) {
        return trimmed; // keep original if empty or already prefixed
      }
      return `${prefixSelector} ${trimmed}`; // prepend prefix
    }).filter(Boolean).join(', ');

    return `${p1}${prefixedSelectors}{`;
  });
};
