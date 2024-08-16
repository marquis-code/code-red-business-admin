// utils/fileReader.ts
import mammoth from 'mammoth';
import { PDFDocument } from 'pdf-lib';

export async function readDocxFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

export async function readPdfFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  let text = '';

  for (const page of pages) {
    const { textContent } = await page.getTextContent();
    text += textContent.items.map(item => item.str).join(' ') + '\n';
  }

  return text;
}
