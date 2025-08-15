"use client";

import { useState, useEffect } from "react";
import InvoiceForm from "@/components/InvoiceForm";
import LogoUploader from "@/components/LogoUploader";
import TemplateSelector from "@/components/TemplateSelector";
import InvoicePreview from "@/components/InvoicePreview";
import DownloadPDFButton from "@/components/DownloadPDFButton";
import { Invoice } from "@/types/invoice";

export default function Home() {
  const [invoice, setInvoice] = useState<Invoice>({
    sender: { name: "", address: "", email: "" },
    recipient: { name: "", address: "", email: "" },
    invoiceNumber: "",
    date: "",
    taxRate: 0,
    lineItems: [],
    template: "minimal",
    subtotal: 0,
    total: 0
  });

  // Update subtotal and total whenever lineItems or taxRate change
  useEffect(() => {
    const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + (subtotal * invoice.taxRate) / 100;
    setInvoice(prev => ({ ...prev, subtotal, total }));
  }, [invoice.lineItems, invoice.taxRate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <h1 className="text-2xl font-['Pacifico'] text-blue-600 dark:text-blue-400">InvoiceApp</h1>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InvoiceForm invoice={invoice} onChange={setInvoice} />
          <LogoUploader logo={invoice.logo} onUpload={(logo) => setInvoice({ ...invoice, logo })} />
          <TemplateSelector template={invoice.template} onChange={(t) => setInvoice({ ...invoice, template: t })} />
          <DownloadPDFButton invoice={invoice} />
        </div>
        <InvoicePreview invoice={invoice} />
      </main>

      <footer className="bg-white dark:bg-gray-900 shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} InvoiceApp. Made by Nimash Mendis.
        </div>
      </footer>
    </div>
  );
}
