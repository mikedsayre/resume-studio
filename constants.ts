import { StylePreset, StylePresetName } from './types';

export const DEFAULT_MARKDOWN_CONTENT = `# John Doe
---
### Senior Frontend React Engineer

**Email:** [john.doe@example.com](mailto:john.doe@example.com) | **Phone:** (123) 456-7890 | **LinkedIn:** [linkedin.com/in/johndoe](https://www.linkedin.com/in/johndoe) | **Portfolio:** [johndoe.dev](https://www.johndoe.dev)

---

## Summary
Highly skilled and results-driven Senior Frontend React Engineer with 8+ years of experience in developing and deploying scalable, high-performance web applications. Expertise in modern JavaScript, TypeScript, React, Redux, and cutting-edge UI/UX design. Passionate about creating intuitive and engaging user experiences.

---

## Experience

### Senior Frontend Engineer | Tech Solutions Inc. | New York, NY
**June 2020 – Present**
*   Led the development of a real-time analytics dashboard, improving data visualization and user engagement by 30% using D3.js and Recharts.
*   Architected and implemented a component library in React Storybook, increasing development efficiency by 25% across multiple projects.
*   Mentored junior developers on best practices in React, TypeScript, and state management (Zustand/Jotai).
*   Optimized application performance, reducing load times by 40% through code splitting, lazy loading, and intelligent data fetching.

### Frontend Developer | Innovate Web Group | San Francisco, CA
**January 2016 – May 2020**
*   Developed responsive and accessible user interfaces for e-commerce platforms using React and styled-components.
*   Collaborated with backend teams to integrate RESTful APIs, ensuring seamless data flow and user experience.
*   Implemented A/B testing features, leading to a 15% increase in conversion rates.

---

## Skills

*   **Languages:** JavaScript (ES6+), TypeScript, HTML5, CSS3
*   **Frameworks/Libraries:** React, Redux, Next.js, Material-UI, Tailwind CSS, D3.js, Recharts
*   **Tools & Technologies:** Git, Webpack, Babel, Jest, React Testing Library, Figma, JIRA, Agile/Scrum
*   **Concepts:** Responsive Design, Accessibility (WCAG), Performance Optimization, SEO Best Practices, PWA

---

## Education

### Master of Science in Computer Science | University of California, Berkeley
**September 2014 – May 2016**

### Bachelor of Science in Software Engineering | University of Washington
**September 2010 – May 2014**

---

## Projects

### Personal Portfolio (johndoe.dev)
*   Developed a dynamic personal portfolio site using Next.js and Tailwind CSS, showcasing projects and skills.
*   Implemented dark mode toggle and responsive design for optimal viewing across devices.

### Recipe Finder App
*   Built a React application that fetches and displays recipes from a public API, with features for searching, filtering, and saving favorites.

---

## Interests
Hiking, photography, open-source contributions, competitive programming.
`;

export const STYLE_PRESETS: { [key in StylePresetName]: StylePreset } = {
  [StylePresetName.Modern]: {
    name: 'Modern',
    description: 'Clean, spacious, and highly readable with a professional touch.',
    classes: {
      base: 'font-inter leading-relaxed text-gray-800 dark:text-gray-200',
      h1: 'font-rajdhani text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-2 mt-6',
      h2: 'font-rajdhani text-3xl font-bold text-teal-700 dark:text-teal-400 mt-5 mb-3 border-b-2 border-teal-200 dark:border-teal-700 pb-1',
      h3: 'font-rajdhani text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2',
      h4: 'font-rajdhani text-xl font-medium text-gray-700 dark:text-gray-300 mt-3 mb-1',
      p: 'text-base mb-2',
      ul: 'list-disc list-inside ml-4 mb-2',
      ol: 'list-decimal list-inside ml-4 mb-2',
      li: 'mb-1',
      a: 'text-blue-600 dark:text-blue-400 hover:underline',
      strong: 'font-bold text-gray-900 dark:text-white',
      em: 'italic text-gray-600 dark:text-gray-300',
      blockquote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:text-gray-400 my-4',
      code: 'font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-red-700 dark:text-red-300 text-sm',
      pre: 'bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto my-4 text-sm',
      table: 'w-full border-collapse my-4',
      th: 'border p-2 text-left bg-gray-200 dark:bg-gray-700 font-semibold',
      td: 'border p-2',
      hr: 'my-6 border-t-2 border-gray-300 dark:border-gray-600',
    },
  },
  [StylePresetName.Classic]: {
    name: 'Classic',
    description: 'A timeless and formal look, emphasis on readability.',
    classes: {
      base: 'font-inter leading-normal text-gray-900 dark:text-gray-100',
      h1: 'font-rajdhani text-4xl font-bold text-gray-800 dark:text-gray-200 mb-3 mt-7',
      h2: 'font-rajdhani text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-2 border-b border-gray-400 dark:border-gray-600 pb-1',
      h3: 'font-rajdhani text-2xl font-medium text-gray-800 dark:text-gray-200 mt-5 mb-2',
      h4: 'font-rajdhani text-xl text-gray-700 dark:text-gray-300 mt-4 mb-1',
      p: 'text-lg mb-2',
      ul: 'list-disc list-outside ml-6 mb-2',
      ol: 'list-decimal list-outside ml-6 mb-2',
      li: 'mb-1',
      a: 'text-blue-700 dark:text-blue-300 hover:underline',
      strong: 'font-extrabold text-black dark:text-white',
      em: 'italic text-gray-600 dark:text-gray-400',
      blockquote: 'border-l-2 border-gray-500 pl-3 italic text-gray-700 dark:text-gray-300 my-3',
      code: 'font-mono bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-200 text-sm',
      pre: 'bg-gray-50 dark:bg-gray-800 p-3 rounded overflow-auto my-3 text-sm',
      table: 'w-full border border-gray-300 dark:border-gray-700 my-3',
      th: 'border border-gray-300 dark:border-gray-700 p-2 text-left bg-gray-100 dark:bg-gray-800 font-bold',
      td: 'border border-gray-300 dark:border-gray-700 p-2',
      hr: 'my-5 border-t border-gray-400 dark:border-gray-500',
    },
  },
  [StylePresetName.Minimalist]: {
    name: 'Minimalist',
    description: 'Clean, simple, and uncluttered design for maximum focus.',
    classes: {
      base: 'font-inter tracking-wide text-gray-700 dark:text-gray-300',
      h1: 'font-rajdhani text-3xl font-bold text-gray-900 dark:text-white mb-1 mt-5 uppercase',
      h2: 'font-rajdhani text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-1 tracking-wide',
      h3: 'font-rajdhani text-xl font-medium text-gray-700 dark:text-gray-200 mt-3 mb-1',
      h4: 'font-rajdhani text-lg text-gray-600 dark:text-gray-300 mt-2',
      p: 'text-base mb-1.5',
      ul: 'list-none pl-0 mb-1.5',
      ol: 'list-decimal list-inside mb-1.5',
      li: 'relative pl-5 before:absolute before:left-0 before:top-0.5 before:content-["•"] before:text-gray-500 dark:before:text-gray-400 mb-1',
      a: 'text-indigo-500 dark:text-indigo-300 hover:underline',
      strong: 'font-bold text-gray-900 dark:text-white',
      em: 'italic',
      blockquote: 'border-l-2 border-gray-400 pl-3 text-gray-500 dark:text-gray-400 my-3',
      code: 'font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-red-600 dark:text-red-300 text-sm',
      pre: 'bg-gray-50 dark:bg-gray-900 p-3 rounded overflow-auto my-3 text-sm',
      table: 'w-full my-3',
      th: 'p-2 text-left border-b border-gray-300 dark:border-gray-700 font-semibold',
      td: 'p-2 border-b border-gray-200 dark:border-gray-800',
      hr: 'my-4 border-t border-gray-200 dark:border-gray-700',
    },
  },
  [StylePresetName.Elegant]: {
    name: 'Elegant',
    description: 'Sophisticated and refined, with a focus on aesthetics and subtle details.',
    classes: {
      base: 'font-inter leading-relaxed text-gray-700 dark:text-gray-300',
      h1: 'font-rajdhani text-5xl font-light text-purple-700 dark:text-purple-300 mb-3 mt-8 tracking-wider',
      h2: 'font-rajdhani text-3xl font-normal text-gray-800 dark:text-gray-100 mt-6 mb-3 border-b border-purple-200 dark:border-purple-800 pb-1',
      h3: 'font-rajdhani text-2xl font-light text-gray-700 dark:text-gray-200 mt-5 mb-2 tracking-wide',
      h4: 'font-rajdhani text-xl text-gray-600 dark:text-gray-300 mt-4 mb-1',
      p: 'text-lg mb-2.5',
      ul: 'list-disc list-outside pl-6 mb-2.5',
      ol: 'list-decimal list-outside pl-6 mb-2.5',
      li: 'mb-1.5',
      a: 'text-purple-600 dark:text-purple-400 hover:underline',
      strong: 'font-semibold text-gray-900 dark:text-white',
      em: 'italic text-purple-500 dark:text-purple-300',
      blockquote: 'border-l-4 border-purple-300 pl-4 italic text-gray-600 dark:text-gray-400 my-4',
      code: 'font-mono bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-700 dark:text-red-300 text-sm',
      pre: 'bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-auto my-4 text-sm',
      table: 'w-full border-collapse my-4',
      th: 'border p-2 text-left bg-purple-100 dark:bg-purple-900 font-medium',
      td: 'border p-2',
      hr: 'my-7 border-t border-purple-200 dark:border-purple-800',
    },
  },
  [StylePresetName.Futuristic]: {
    name: 'Futuristic',
    description: 'Bold lines and vibrant accents for a cutting-edge, tech-forward feel.',
    classes: {
      base: 'font-inter leading-snug text-gray-800 dark:text-gray-200', // Adjusted base text color for better light theme visibility
      h1: 'font-rajdhani text-5xl font-bold text-blue-700 dark:text-blue-300 mb-2 mt-8 tracking-widest uppercase', // Adjusted h1 color
      h2: 'font-rajdhani text-3xl font-semibold text-green-700 dark:text-green-300 mt-6 mb-3 border-b-2 border-green-300 dark:border-green-700 pb-1', // Adjusted h2 color
      h3: 'font-rajdhani text-2xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2 tracking-wide',
      h4: 'font-rajdhani text-xl font-medium text-gray-700 dark:text-gray-300 mt-3 mb-1', // Adjusted h4 color
      p: 'text-base mb-2.5 leading-relaxed',
      ul: 'list-none pl-6 mb-2.5 marker:text-blue-400',
      ol: 'list-decimal list-outside pl-6 mb-2.5 marker:text-blue-400',
      li: 'relative before:content-["›"] before:absolute before:left-0 before:top-0 before:text-blue-500 dark:before:text-blue-300 before:font-bold before:text-lg mb-1.5 pl-4', // Adjusted li marker color
      a: 'text-blue-700 dark:text-blue-400 hover:underline hover:text-blue-500 dark:hover:text-blue-200 transition-colors', // Adjusted link colors
      strong: 'font-extrabold text-blue-800 dark:text-blue-200', // Adjusted strong color
      em: 'italic text-green-700 dark:text-green-400', // Adjusted emphasis color
      blockquote: 'border-l-4 border-blue-500 dark:border-blue-600 pl-4 italic text-gray-600 dark:text-gray-400 my-4 bg-blue-50 dark:bg-gray-800 p-3 rounded', // Adjusted blockquote
      code: 'font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded text-blue-800 dark:text-blue-200 text-sm',
      pre: 'bg-gray-100 dark:bg-gray-700 text-green-700 dark:text-green-200 p-4 rounded-lg overflow-auto my-4 text-sm border border-blue-600 dark:border-blue-400', // Adjusted pre bg and text
      table: 'w-full border-collapse my-4 border border-blue-300 dark:border-blue-700',
      th: 'border p-2 text-left bg-blue-700 dark:bg-blue-900 text-white font-semibold uppercase',
      td: 'border p-2 border-blue-200 dark:border-blue-800',
      hr: 'my-6 border-t-2 border-dashed border-blue-500 dark:border-blue-400',
    },
  },
  [StylePresetName.Professional]: {
    name: 'Professional',
    description: 'A refined and conservative style, perfect for traditional industries.',
    classes: {
      base: 'font-inter leading-relaxed text-gray-800 dark:text-gray-200',
      h1: 'font-rajdhani text-4xl font-bold text-gray-900 dark:text-white mb-3 mt-7 border-b border-gray-300 dark:border-gray-700 pb-1',
      h2: 'font-rajdhani text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-5 mb-2',
      h3: 'font-rajdhani text-xl font-medium text-gray-700 dark:text-gray-300 mt-4 mb-1',
      h4: 'font-rajdhani text-lg text-gray-600 dark:text-gray-400 mt-3 mb-0.5',
      p: 'text-base mb-2',
      ul: 'list-disc list-outside ml-5 mb-2',
      ol: 'list-decimal list-outside ml-5 mb-2',
      li: 'mb-1',
      a: 'text-blue-700 dark:text-blue-400 hover:underline',
      strong: 'font-bold text-gray-900 dark:text-white',
      em: 'italic text-gray-600 dark:text-gray-300',
      blockquote: 'border-l-4 border-gray-400 pl-4 italic text-gray-600 dark:text-gray-400 my-4',
      code: 'font-mono bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-700 dark:text-red-300 text-sm',
      pre: 'bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto my-4 text-sm',
      table: 'w-full border-collapse my-4',
      th: 'border p-2 text-left bg-gray-200 dark:bg-gray-700 font-semibold',
      td: 'border p-2',
      hr: 'my-6 border-t border-gray-300 dark:border-gray-600',
    },
  },
};