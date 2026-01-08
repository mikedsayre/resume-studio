# Project Progress Log: Resume Studio

This document outlines the development journey, key decisions, and current status of the Resume Studio application.

## 📅 Last Updated: 2023-11-20 (All Vercel Build Issues Resolved!)

## 📜 Project Goal

To create a modern, futuristic, and professional Markdown resume editor with advanced CSS styling, PDF/Google Doc export capabilities, and a light/dark theme toggle.

## 🛠️ Key Issues Addressed & Solutions

1.  **Initial Problem: PDF Export Not Working**
    *   **Diagnosis:** `html2pdf.js` was likely struggling to pick up custom CSS injected as an inline `<style>` tag within the `ResumePreview` component's `dangerouslySetInnerHTML`.
    *   **Solution:**
        *   Moved the `prefixCss` utility function from `ResumePreview.tsx` to `utils/cssUtils.ts` for better organization and reusability.
        *   Modified `App.tsx` to inject custom CSS globally as a `<style>` tag in the document `<head>`, ensuring `html2pdf.js` consistently applies it.
        *   Simplified `ResumePreview.tsx` to only render HTML content from Markdown, no longer handling inline `<style>` injection.
    *   **Status:** **RESOLVED.** PDF export now works correctly in the preview window.

2.  **Problem: Blank Screen on Vercel Deployment**
    *   **Diagnosis (initial):** Browsers cannot directly execute `.tsx` files. Vercel was attempting to serve `.tsx` directly or was failing to transpile it into JavaScript.
    *   **Solution (Initial - causing regression):** Introduced `package.json` scripts (`clean`, `compile`, `copy-static`, `build`) and `tsconfig.json` to transpile TypeScript (`.tsx` to `.js`) and copy static assets into a `build/` directory, with `vercel.json` pointing to this `build` directory. This addressed the core `TSX -> JS` issue.
    *   **Diagnosis (after initial fix):** The blank screen persisted because native ES Module imports in transpiled `.js` files require explicit `.js` extensions (e.g., `import App from './App.js';`). `tsc` (by default without specific bundler config) doesn't always add these.
    *   **Solution (Current app code):** Manually added `.js` extensions to all relative import paths in the application's `.tsx` and `.ts` files.
    *   **Status:** **RESOLVED.** The application now runs correctly locally and can be transpiled into browser-executable JavaScript.

3.  **Problem: Vercel Deployment Failure (after blank screen fix) - Iteration 1**
    *   **Diagnosis:** Vercel was still failing to deploy, even though the local build process (`npm run build`) was correct and produced the `build/` directory. The issue appeared to be Vercel's interpretation of the project type and output.
    *   **Solution (Attempt 1):** Modified `vercel.json` to be highly explicit with `"type": "static"`, `"outputDirectory": "build"`, `"buildCommand": "npm run build"`, and `"installCommand": "npm install"`.
    *   **Result:** **FAILED.** Vercel logs showed an error: "should NOT have additional property `type`". The `type` property is not valid at the root level of `vercel.json`.

4.  **Problem: Vercel Deployment Failure (after blank screen fix) - Iteration 2**
    *   **Diagnosis:** The explicit `type: "static"` property in `vercel.json` was causing a schema validation error, indicating it's not a supported root-level configuration. Vercel usually infers the static site type from `outputDirectory` and `buildCommand`.
    *   **Solution (Attempt 2):**
        *   Removed the invalid `type: "static"` property from `vercel.json`.
        *   Retained `outputDirectory: "build"`, `buildCommand: "npm run build"`, and `installCommand": "npm install"` to provide clear instructions for building and serving the static `build` folder.
        *   Kept the `ls -R build` command in `package.json`'s `build` script to aid in debugging by displaying build output in Vercel logs.
    *   **Result:** **FAILED.** Vercel logs still showed a build failure after `npm install` completed, with no subsequent output from `npm run build` or the `ls -R build` command. This indicated a silent termination of the build process.

5.  **Problem: Vercel Deployment Failure (Silent Build Termination) - Iteration 3**
    *   **Diagnosis:** The build process was terminating silently after `npm install` but before `npm run build` could log its steps. This is commonly caused by insufficient memory allocated to the Node.js process (e.g., `tsc` compilation) or an unexpected shell command behavior in the Vercel environment.
    *   **Solution (Attempt 3):**
        *   **Enhanced `package.json` `build` script:** Added `echo` statements before each sub-script (`clean`, `compile`, `copy-static`) to make the build process verbose in Vercel logs, helping to pinpoint exactly where a failure might occur.
        *   **Increased Node.js Memory:** Included `NODE_OPTIONS=--max-old-space-size=4096` directly before `npm run compile` (which executes `tsc`). This allocates more memory to the TypeScript compilation process, mitigating potential out-of-memory issues that lead to silent crashes.
        *   **`vercel.json` simplification:** Confirmed `vercel.json` only contains `outputDirectory`, `buildCommand`, and `installCommand`, adhering to the Vercel schema for static sites.
    *   **Result:** **FAILED.** Vercel logs reported a new error: `tsconfig.json(14,35): error TS5096: Option 'allowImportingTsExtensions' can only be used when either 'noEmit' or 'emitDeclarationOnly' is set.` This explicitly identified a conflict within `tsconfig.json`.

6.  **Problem: TypeScript Compiler Error TS5096 - Iteration 4**
    *   **Diagnosis:** The `allowImportingTsExtensions: true` option in `tsconfig.json` directly conflicts with `"noEmit": false`. Since we intend for `tsc` to emit JavaScript files and we are explicitly using `.js` extensions in our imports, this option is unnecessary and problematic.
    *   **Solution (Attempt 4):**
        *   Removed the `allowImportingTsExtensions: true` compiler option from `tsconfig.json`. This allowed `tsc` to compile without the reported error, as it's not needed for our direct ES Module output strategy.
    *   **Result:** **FAILED.** Vercel logs showed a new set of errors, primarily `TS2307: Cannot find module 'react'` and `TS7026: JSX element implicitly has type 'any'`, indicating that the TypeScript compiler cannot locate the necessary type declarations for React.

7.  **Problem: Missing React Type Declarations (TS2307, TS7026, TS2875) - Iteration 5**
    *   **Diagnosis:** The project relies on `importmap` for runtime React loading, but the TypeScript compiler (tsc) during the build process requires explicit type declarations (from `@types/react` and `@types/dom`) to be present in `node_modules` for successful type-checking and compilation of `.tsx` files. These type packages were missing from `devDependencies`.
    *   **Solution (Attempt 5):**
        *   Added `@types/react` and `@types/react-dom` as `devDependencies` to `package.json`. This ensures these type definitions are installed during `npm install` and available for `tsc` to use.
    *   **Result:** **FAILED.** Vercel logs showed new errors: `TS2307: Cannot find module 'html2pdf.js'` and multiple `TS2307` and other errors related to `vite.config.ts`, `path`, `vite`, and `@vitejs/plugin-react`.

8.  **Problem: Missing `html2pdf.js` Types (TS2307) & Unexpected `vite.config.ts` Compilation Errors - Iteration 6**
    *   **Diagnosis:**
        *   `html2pdf.js` types were still missing for `tsc`, similar to the previous React type issue.
        *   Errors related to `vite.config.ts`, `path`, `vite`, and `@vitejs/plugin-react` indicated that `tsc` was attempting to compile a `vite.config.ts` file that existed in the repository. However, the project's current build system (using `tsc` directly, not Vite) doesn't require or correctly handle this file. The necessary `@types` for Vite/Node were also not installed.
    *   **Solution (Attempt 6):**
        *   Added `@types/html2pdf.js` to `devDependencies` in `package.json`.
        *   Explicitly added `"vite.config.ts"` to the `exclude` array in `tsconfig.json`. This prevented `tsc` from trying to compile it, thus resolving all the `vite.config.ts`-related errors without needing to add Vite dependencies to a non-Vite project.
    *   **Status:** **RESOLVED.** All compilation errors have been successfully addressed, and the application now builds and deploys without issues on Vercel.

9.  **Feature: Enable HTML Passthrough and Robust Markdown Parsing with Styling**
    *   **Diagnosis:** The initial `convertMarkdownToHtml` function used simple regex, preventing raw HTML from rendering correctly and not providing full Markdown spec support.
    *   **Solution:**
        *   Integrated `marked` library for comprehensive Markdown-to-HTML conversion, including raw HTML passthrough.
        *   Integrated `DOMPurify` library for sanitizing all generated HTML, mitigating XSS risks when allowing raw HTML input.
        *   Modified `convertMarkdownToHtml` to first parse Markdown with `marked`, then sanitize with `DOMPurify`, and finally use DOM manipulation to apply the predefined Tailwind CSS classes from the selected `StylePreset` to the relevant HTML elements.
    *   **Status:** **RESOLVED.** The editor now correctly renders raw HTML embedded in Markdown, and all existing styling presets continue to function as expected, with added security.

10. **Problem: Vercel Deployment Failure (`npm error notarget` for `@types/marked`) - Iteration 7**
    *   **Diagnosis:** The `package.json` specified `^12.0.0` for `@types/marked`, but this version does not exist on the npm registry. The `@types/marked` package has its own versioning, typically in the `4.x.x` range, which is compatible with `marked` v12 for most features.
    *   **Solution:**
        *   Updated `@types/marked` in `package.json` to `^4.0.0`, which is a valid and available version of the type definitions.
    *   **Status:** **RESOLVED.** The `npm install` command now completes successfully during Vercel builds, allowing the deployment to proceed.

## ✅ Final Status

The Resume Studio application successfully builds and deploys to Vercel. All identified TypeScript compilation, deployment configuration, and core Markdown parsing issues have been resolved. The application is fully functional, secure, and accessible online, now supporting raw HTML passthrough within the Markdown editor.

## 🔗 Related Files

*   `index.tsx`, `App.tsx`, `components/*.tsx`: Core React components.
*   `types.ts`, `constants.ts`: Type definitions and static data.
*   `services/pdfService.ts`: PDF export logic.
*   `utils/cssUtils.ts`: Custom CSS prefixing utility.
*   `package.json`: Project dependencies and build scripts. **(Modified)**
*   `tsconfig.json`: TypeScript compiler configuration.
*   `vercel.json`: Vercel deployment configuration.
*   `README.md`: Project overview and setup instructions.