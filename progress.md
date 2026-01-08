# Project Progress Log: Resume Studio

This document outlines the development journey, key decisions, and current status of the Resume Studio application.

## 📅 Last Updated: 2023-11-20 (Addressing Missing React Types)

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

7.  **Problem: Missing React Type Declarations (TS2307, TS7026, TS2875) - Iteration 5 (Current Attempt)**
    *   **Diagnosis:** The project relies on `importmap` for runtime React loading, but the TypeScript compiler (tsc) during the build process requires explicit type declarations (from `@types/react` and `@types/react-dom`) to be present in `node_modules` for successful type-checking and compilation of `.tsx` files. These type packages were missing from `devDependencies`.
    *   **Solution (Current attempt):**
        *   Added `@types/react` and `@types/react-dom` as `devDependencies` to `package.json`. This ensures these type definitions are installed during `npm install` and available for `tsc` to use.
    *   **Current Status:** **PENDING VERIFICATION.** This change addresses the fundamental type-checking issue for React components.

## ➡️ Next Steps

*   **Deploy current changes:** Push the updated `package.json` to GitHub and allow Vercel to attempt a new deployment.
*   **Analyze Vercel logs:** Carefully review the new Vercel build logs. We expect the `TS2307` and JSX-related errors to be resolved. The verbose `echo` statements should continue to track the build's progress.
*   **Troubleshoot (if necessary):** If deployment still fails, the logs will once again be the primary tool for diagnosis.

## 🔗 Related Files

*   `index.tsx`, `App.tsx`, `components/*.tsx`: Core React components.
*   `types.ts`, `constants.ts`: Type definitions and static data.
*   `services/pdfService.ts`: PDF export logic.
*   `utils/cssUtils.ts`: Custom CSS prefixing utility.
*   `package.json`: Project dependencies and build scripts. **(Modified)**
*   `tsconfig.json`: TypeScript compiler configuration.
*   `vercel.json`: Vercel deployment configuration.
*   `README.md`: Project overview and setup instructions.
