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
 * Waits for the html2pdf library to be available on the window object.
 * @param timeout The maximum time to wait in milliseconds.
 * @param interval The interval between checks in milliseconds.
 * @returns A promise that resolves with the html2pdf object or rejects if timeout is reached.
 */
const waitForHtml2Pdf = (timeout = 5000, interval = 100): Promise<any> => {
  return new Promise((resolve, reject) => {
    let elapsed = 0;
    const checkInterval = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).html2pdf) {
        clearInterval(checkInterval);
        resolve((window as any).html2pdf);
      } else {
        elapsed += interval;
        if (elapsed >= timeout) {
          clearInterval(checkInterval);
          reject(new Error('html2pdf.js did not load within the specified timeout.'));
        }
      }
    }, interval);
  });
};

/**
 * Exports an HTML element to a PDF file.
 * Requires html2pdf.js library to be loaded in the global scope.
 *
 * @param element The HTML element to convert to PDF.
 * @param filename The name of the output PDF file.
 * @param options Optional configuration for html2pdf.
 */
export const exportToPdf = async (element: HTMLElement, filename: string = 'resume.pdf', options?: Html2PdfOptions) => {
  try {
    const html2pdf = await waitForHtml2Pdf(); // Wait for the html2pdf library to load

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
