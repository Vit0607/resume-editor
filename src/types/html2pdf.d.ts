declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number;
    filename?: string;
    image?: { type: string; quality: number };
    jsPDF?: { format: string; orientation: 'p' | 'l' };
  }

  interface Html2Pdf {
    from(element: HTMLElement | string): Html2Pdf;
    set(opt: Html2PdfOptions): Html2Pdf;
    save(filename?: string): Promise<void>;
    toPdf(): any;
    toCanvas(): any;
  }

  const html2pdf: () => Html2Pdf;
  export default html2pdf;
}
