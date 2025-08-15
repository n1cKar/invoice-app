"use client";

import { Invoice } from "@/types/invoice";

interface Props {
  invoice: Invoice;
  onChange: (invoice: Invoice) => void;
}

export default function InvoiceForm({ invoice, onChange }: Props) {
  const handleSenderChange = (field: keyof typeof invoice.sender, value: string) => {
    onChange({ ...invoice, sender: { ...invoice.sender, [field]: value } });
  };

  const handleRecipientChange = (field: keyof typeof invoice.recipient, value: string) => {
    onChange({ ...invoice, recipient: { ...invoice.recipient, [field]: value } });
  };

  const handleLineItemChange = (index: number, field: keyof typeof invoice.lineItems[0], value: string | number) => {
    const newItems = [...invoice.lineItems];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...invoice, lineItems: newItems });
  };

  const addLineItem = () => {
    onChange({ ...invoice, lineItems: [...invoice.lineItems, { description: "", quantity: 1, price: 0 }] });
  };

  const removeLineItem = (index: number) => {
    const newItems = invoice.lineItems.filter((_, i) => i !== index);
    onChange({ ...invoice, lineItems: newItems });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Sender Information</h2>
      <input
        type="text"
        placeholder="Name"
        value={invoice.sender.name}
        onChange={(e) => handleSenderChange("name", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Address"
        value={invoice.sender.address}
        onChange={(e) => handleSenderChange("address", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={invoice.sender.email}
        onChange={(e) => handleSenderChange("email", e.target.value)}
        className="w-full border p-2 rounded"
      />

      <h2 className="text-xl font-bold mt-4">Recipient Information</h2>
      <input
        type="text"
        placeholder="Name"
        value={invoice.recipient.name}
        onChange={(e) => handleRecipientChange("name", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Address"
        value={invoice.recipient.address}
        onChange={(e) => handleRecipientChange("address", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={invoice.recipient.email}
        onChange={(e) => handleRecipientChange("email", e.target.value)}
        className="w-full border p-2 rounded"
      />

      <h2 className="text-xl font-bold mt-4">Invoice Details</h2>
      <input
        type="text"
        placeholder="Invoice Number"
        value={invoice.invoiceNumber}
        onChange={(e) => onChange({ ...invoice, invoiceNumber: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="date"
        placeholder="Date"
        value={invoice.date}
        onChange={(e) => onChange({ ...invoice, date: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Tax Rate (%)"
        value={invoice.taxRate}
        onChange={(e) => onChange({ ...invoice, taxRate: Number(e.target.value) })}
        className="w-full border p-2 rounded"
      />

      <h2 className="text-xl font-bold mt-4">Line Items</h2>
      {invoice.lineItems.map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleLineItemChange(index, "description", e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleLineItemChange(index, "quantity", Number(e.target.value))}
            className="w-20 border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleLineItemChange(index, "price", Number(e.target.value))}
            className="w-24 border p-2 rounded"
          />
          <button onClick={() => removeLineItem(index)} className="px-2 bg-red-500 text-white rounded">
            X
          </button>
        </div>
      ))}
      <button onClick={addLineItem} className="px-4 py-2 bg-blue-600 text-white rounded">
        + Add Item
      </button>

      <h2 className="text-xl font-bold mt-4">Notes</h2>
      <textarea
        value={invoice.notes || ""}
        onChange={(e) => onChange({ ...invoice, notes: e.target.value })}
        className="w-full border p-2 rounded"
        rows={3}
        placeholder="Additional notes"
      />
    </div>
  );
}
