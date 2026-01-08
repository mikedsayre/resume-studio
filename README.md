# 🚀 Resume Studio

A professional and futuristic markdown resume editor that empowers you to craft stunning resumes with unparalleled ease and style. Developed to provide a seamless UI/UX for modern job seekers.

## ✨ Features

*   **Real-time Markdown/HTML Editor:** Write your resume content in Markdown, optionally including raw HTML, and see instant updates in a live preview.
*   **HTML Passthrough Support:** Embed raw HTML directly within your Markdown for advanced customization and intricate layouts. (All HTML is sanitized for security).
*   **Dynamic Style Presets:** Choose from a selection of professionally designed, futuristic themes to transform your resume's aesthetic.
*   **Advanced Custom CSS:** Unleash your creativity with an integrated CSS editor to finely tune or completely overhaul your resume's appearance.
*   **One-Click Export:** Generate high-quality PDF documents or copy styled HTML/raw Markdown directly to your clipboard for use in other applications (e.g., Google Docs).
*   **Intuitive UI/UX:** Enjoy a clean, responsive, and accessible interface designed for a superior user experience.
*   **Light & Dark Theme Toggle:** Switch between sleek dark and bright light modes to suit your preference.

## 🛠️ Technologies

*   **React:** For a dynamic and responsive user interface.
*   **TypeScript:** Ensuring type safety and robust code.
*   **Tailwind CSS:** For rapid and consistent styling.
*   **marked:** For robust Markdown-to-HTML conversion.
*   **DOMPurify:** For sanitizing HTML content, enhancing security.
*   **html2pdf.js:** Powering reliable PDF exports.
*   **ES Modules (Native Browser Support):** For efficient module loading.

## 📦 Getting Started

This application is designed for direct browser execution after transpilation.

1.  **Clone the repository:**
    ```bash
    git clone your-repo-url
    cd resume-studio
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Build the Application:**
    This command transpiles TypeScript to JavaScript and prepares static assets into the `build/` directory.
    ```bash
    npm run build
    ```
4.  **Run Locally (Optional):**
    ```bash
    npm start
    ```
    This will serve the `build/` directory, typically at `http://localhost:5000`.

## 🚀 Deployment on Vercel (or similar static hosting)

This project is configured for straightforward deployment to platforms like Vercel. The `package.json` scripts and `tsconfig.json` handle the necessary TypeScript transpilation, and `vercel.json` directs the deployment platform to serve the generated `build/` directory.

Simply push your code to a Git repository (e.g., GitHub, GitLab, Bitbucket) and connect it to your Vercel project. Vercel will automatically detect the build configuration and deploy your application.

## 💡 Contribution

Feel free to fork this repository, suggest features, or contribute to making Resume Studio even better!

---

**Made with Google AI Studio**
**Powered by [Swan Lake Digital](https://swanlakedigital.com)**