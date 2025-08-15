"use client";

import { Invoice } from "@/types/invoice";

interface Props {
  invoice: Invoice;
}

export default function InvoiceButtons({ invoice }: Props) {
  const generateInvoiceHTML = () => {
    const subtotal = invoice.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const total = subtotal + (subtotal * invoice.taxRate) / 100;

    return `
      <html>
        <head>
          <title>Invoice #${invoice.invoiceNumber}</title>
          <style>
  body { 
    font-family: Helvetica, Arial, sans-serif; 
    background: #ffffff; /* optional: make background white for better contrast */
    color: #000000; 
    padding: 20px; 
  }
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  th, td { border: 1px solid #ccc; padding: 8px; }
  th { background-color: #e5e7eb; color: #111827; }
  .text-right { text-align: right; }
  .text-center { text-align: center; }
  h3, h4 { margin: 4px 0; }
  img { max-height: 50px; margin-bottom: 10px; }
</style>

        </head>
        <body>
          ${invoice.logo ? `<img src="${invoice.logo}" alt="Logo"/>` : ""}
          <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <div>
              <h3>${invoice.sender.name}</h3>
              <p>${invoice.sender.address}</p>
              <p>${invoice.sender.email}</p>
            </div>
            <div style="text-align:right;">
              <p>Invoice #${invoice.invoiceNumber}</p>
              <p>Date: ${invoice.date}</p>
            </div>
          </div>
          <div style="margin-bottom:10px;">
            <h4>Bill To:</h4>
            <p>${invoice.recipient.name}</p>
            <p>${invoice.recipient.address}</p>
            <p>${invoice.recipient.email}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.lineItems
                .map(
                  (item) => `
                <tr>
                  <td>${item.description}</td>
                  <td class="text-center">${item.quantity}</td>
                  <td class="text-right">$${item.price.toFixed(2)}</td>
                  <td class="text-right">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <div style="text-align:right; margin-bottom:10px;">
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
            <p>Tax: $${(subtotal * invoice.taxRate / 100).toFixed(2)}</p>
            <p><strong>Total: $${total.toFixed(2)}</strong></p>
          </div>
          ${
            invoice.notes
              ? `<div><h4>Notes:</h4><p>${invoice.notes}</p></div>`
              : ""
          }
        </body>
      </html>
    `;
  };

  const handleOpenNewTab = () => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(generateInvoiceHTML());
      newWindow.document.close();
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(generateInvoiceHTML());
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleOpenNewTab}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Open Invoice in New Tab
      </button>

      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Print Invoice
      </button>
    </div>
  );
}
