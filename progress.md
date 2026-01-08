# Project Progress Log: Resume Studio

This document outlines the development journey, key decisions, and current status of the Resume Studio application.

## 📅 Last Updated: 2023-11-20 (Revised)

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
    *   **Solution (Current attempt):**
        *   Removed the invalid `type: "static"` property from `vercel.json`.
        *   Retained `outputDirectory: "build"`, `buildCommand: "npm run build"`, and `installCommand: "npm install"` to provide clear instructions for building and serving the static `build` folder.
        *   Kept the `ls -R build` command in `package.json`'s `build` script to aid in debugging by displaying build output in Vercel logs.
    *   **Current Status:** **PENDING VERIFICATION.** This latest set of changes aims to adhere to Vercel's `vercel.json` schema while providing necessary build instructions. We need to push these changes and observe the new Vercel logs.

## ➡️ Next Steps

*   **Deploy current changes:** Push the updated `vercel.json` to GitHub and allow Vercel to attempt a new deployment.
*   **Analyze Vercel logs:** Carefully review the new Vercel build logs, especially the output of `ls -R build`, to confirm if the `build/` directory is correctly populated and if Vercel proceeds to deploy.
*   **Troubleshoot (if necessary):** If deployment still fails, the `ls -R build` output will be critical for the next diagnostic step, indicating if the `build` directory itself is the problem or if Vercel is still misinterpreting the final output.

## 🔗 Related Files

*   `index.tsx`, `App.tsx`, `components/*.tsx`: Core React components.
*   `types.ts`, `constants.ts`: Type definitions and static data.
*   `services/pdfService.ts`: PDF export logic.
*   `utils/cssUtils.ts`: Custom CSS prefixing utility.
*   `package.json`: Project dependencies and build scripts.
*   `tsconfig.json`: TypeScript compiler configuration.
*   `vercel.json`: Vercel deployment configuration.
*   `README.md`: Project overview and setup instructions.
