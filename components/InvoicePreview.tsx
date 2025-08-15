"use client";

import { Invoice } from "@/types/invoice";

interface Props {
  invoice: Invoice;
}

export default function InvoicePreview({ invoice }: Props) {
  const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const total = subtotal + (subtotal * invoice.taxRate) / 100;

  return (
    <div
      id="invoice-preview-content"
      className="bg-blue-950 p-6 rounded-lg shadow-lg text-gray-800 dark:text-gray-200"
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      {invoice.logo && <img src={invoice.logo} alt="Logo" className="h-12 mb-4" />}
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{invoice.sender.name}</h3>
          <p>{invoice.sender.address}</p>
          <p>{invoice.sender.email}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">Invoice #{invoice.invoiceNumber}</p>
          <p>Date: {invoice.date}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-bold">Bill To:</h4>
        <p>{invoice.recipient.name}</p>
        <p>{invoice.recipient.address}</p>
        <p>{invoice.recipient.email}</p>
      </div>

      <table className="w-full table-auto border-collapse mb-4">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border px-2 py-1 text-left">Description</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((item, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{item.description}</td>
              <td className="border px-2 py-1 text-center">{item.quantity}</td>
              <td className="border px-2 py-1 text-right">${item.price.toFixed(2)}</td>
              <td className="border px-2 py-1 text-right">${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end space-y-1 flex-col mb-4">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${(subtotal * invoice.taxRate / 100).toFixed(2)}</p>
        <p className="font-bold">Total: ${total.toFixed(2)}</p>
      </div>

      {invoice.notes && (
        <div>
          <h4 className="font-bold">Notes:</h4>
          <p>{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}
