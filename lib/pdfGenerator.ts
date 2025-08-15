// /lib/pdfGenerator.ts
import { Invoice } from "@/types/invoice";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePDF(invoice: Invoice) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 50;

  // ----- Logo -----
  if (invoice.logo) {
    try {
      const logoImage = await pdfDoc.embedPng(invoice.logo);
      page.drawImage(logoImage, { x: 50, y: y - 50, width: 100, height: 50 });
    } catch (err) {
      console.warn("Failed to embed logo:", err);
    }
  }

  y -= 70;

  // ----- Sender -----
  page.drawText(invoice.sender.name, { x: 50, y, size: 16, font: fontBold });
  y -= 20;
  page.drawText(invoice.sender.address, { x: 50, y, size: 12, font });
  y -= 15;
  page.drawText(invoice.sender.email, { x: 50, y, size: 12, font });

  y -= 40;

  // ----- Invoice Info -----
  page.drawText(`Invoice #${invoice.invoiceNumber}`, { x: width - 200, y, size: 14, font: fontBold });
  y -= 20;
  page.drawText(`Date: ${invoice.date}`, { x: width - 200, y, size: 12, font });

  y -= 60;

  // ----- Recipient -----
  page.drawText("Bill To:", { x: 50, y, size: 14, font: fontBold });
  y -= 20;
  page.drawText(invoice.recipient.name, { x: 50, y, size: 12, font });
  y -= 15;
  page.drawText(invoice.recipient.address, { x: 50, y, size: 12, font });
  y -= 15;
  page.drawText(invoice.recipient.email, { x: 50, y, size: 12, font });

  y -= 40;

  // ----- Table Header -----
  const startX = 50;
  const colWidths = [250, 80, 80, 80];
  const headers = ["Description", "Qty", "Price", "Total"];
  headers.forEach((text, i) => {
    page.drawText(text, {
      x: startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0),
      y,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0)
    });
  });

  // ----- Table Rows -----
  y -= 20;
  (invoice.lineItems || []).forEach((item) => {
    const row = [
      item.description,
      item.quantity.toString(),
      `$${item.price.toFixed(2)}`,
      `$${(item.price * item.quantity).toFixed(2)}`
    ];
    row.forEach((text, i) => {
      page.drawText(text, {
        x: startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0),
        y,
        size: 12,
        font
      });
    });
    y -= 18;
  });

  y -= 20;

  // ----- Totals -----
  const subtotal = (invoice.lineItems || []).reduce((sum, item) => sum + item.quantity * item.price, 0);
  const tax = (subtotal * (invoice.taxRate || 0)) / 100;
  const total = subtotal + tax;

  page.drawText(`Subtotal: $${subtotal.toFixed(2)}`, { x: width - 200, y, size: 12, font });
  y -= 15;
  page.drawText(`Tax: $${tax.toFixed(2)}`, { x: width - 200, y, size: 12, font });
  y -= 15;
  page.drawText(`Total: $${total.toFixed(2)}`, { x: width - 200, y, size: 14, font: fontBold });

  // ----- Notes -----
  if (invoice.notes) {
    y -= 30;
    page.drawText("Notes:", { x: 50, y, size: 12, font: fontBold });
    y -= 15;
    page.drawText(invoice.notes, { x: 50, y, size: 12, font });
  }

    // ----- Save & Open PDF -----
const pdfBytes = await pdfDoc.save();
// Wrap it in Uint8Array to satisfy TypeScript
const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
const url = URL.createObjectURL(blob);
window.open(url, "_blank"); 
}


