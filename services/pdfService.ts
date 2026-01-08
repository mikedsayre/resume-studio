// html2pdf.js is now imported as an ES module from its npm package.
import html2pdf from 'html2pdf.js';

interface Html2PdfOptions {
  margin?: number | [number, number, number, number]; // Top, Left, Bottom, Right
  filename?: string;
  image?: { type: string; quality: number };
  html2canvas?: { scale: number; logging: boolean; useCORS: boolean };
  jsPDF?: { unit: string; format: string; orientation: string };
}

/**
 * Exports an HTML element to a PDF file.
 * Requires html2pdf.js library to be installed as a project dependency and imported.
 *
 * @param element The HTML element to convert to PDF.
 * @param filename The name of the output PDF file.
 * @param options Optional configuration for html2pdf.
 */
export const exportToPdf = async (element: HTMLElement, filename: string = 'resume.pdf', options?: Html2PdfOptions) => {
  try {
    const defaultOptions: Html2PdfOptions = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: false, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      ...options,
    };

    html2pdf().from(element).set(defaultOptions).save();
  } catch (error: any) {
    console.error('PDF export failed:', error.message);
    alert(`PDF export failed: ${error.message}. Please check console for details.`);
  }
};
