// This file assumes html2pdf.bundle.min.js is loaded globally via index.html script tag.
// The `html2pdf` object is expected to be available on `window`.

interface Html2PdfOptions {
  margin?: number | [number, number, number, number]; // Top, Left, Bottom, Right
  filename?: string;
  image?: { type: string; quality: number };
  html2canvas?: { scale: number; logging: boolean; useCORS: boolean };
  jsPDF?: { unit: string; format: string; orientation: string };
}

/**
 * Exports an HTML element to a PDF file.
 * Requires html2pdf.js library to be loaded in the global scope.
 *
 * @param element The HTML element to convert to PDF.
 * @param filename The name of the output PDF file.
 * @param options Optional configuration for html2pdf.
 */
export const exportToPdf = (element: HTMLElement, filename: string = 'resume.pdf', options?: Html2PdfOptions) => {
  if (typeof window !== 'undefined' && (window as any).html2pdf) {
    const defaultOptions: Html2PdfOptions = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: false, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      ...options,
    };

    (window as any).html2pdf().from(element).set(defaultOptions).save();
  } else {
    console.error('html2pdf.js is not loaded. Please ensure the script is included in index.html.');
    alert('PDF export library not found. Please check console for details.');
  }
};
