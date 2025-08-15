"use client";

import { useState, useEffect } from "react";
import InvoiceForm from "@/components/InvoiceForm";
import LogoUploader from "@/components/LogoUploader";
import TemplateSelector from "@/components/TemplateSelector";
import InvoicePreview from "@/components/InvoicePreview";
import DownloadPDFButton from "@/components/DownloadPDFButton";
import { Invoice } from "@/types/invoice";
import Link from "next/link";

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

  function scrollingEffect () {
    const target = document.getElementById("main-content");
    if (!target) return;

    const headerOffset = 200; // adjust if your header has fixed height
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }

  // Update subtotal and total whenever lineItems or taxRate change
  useEffect(() => {
    const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + (subtotal * invoice.taxRate) / 100;
    setInvoice(prev => ({ ...prev, subtotal, total }));
  }, [invoice.lineItems, invoice.taxRate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header Section */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
            <h1 className="text-2xl font-['Pacifico'] text-blue-600 dark:text-blue-400">
              InvoiceApp
            </h1>
            </Link>
            <Link href="#main-content">
              <button
                onClick={scrollingEffect}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8 py-12 text-center bg-gray-800 rounded-lg text-gray-100">
        <h2 className="text-3xl font-bold mb-4">About InvoiceApp</h2>
        <p className="max-w-2xl mx-auto">
          InvoiceApp is a simple, intuitive web application that allows you to create, customize, and manage professional invoices online. Add your logo, select a template, fill in sender and recipient details, and instantly generate a preview.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2 text-lg text-gray-900 dark:text-gray-100">Customizable Templates</h3>
            <p className="text-gray-700 dark:text-gray-300">Choose from multiple invoice templates to match your brand and style.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2 text-lg text-gray-900 dark:text-gray-100">Instant Preview</h3>
            <p className="text-gray-700 dark:text-gray-300">See a live preview of your invoice as you fill in the details.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2 text-lg text-gray-900 dark:text-gray-100">Download & Print</h3>
            <p className="text-gray-700 dark:text-gray-300">Open your invoice in a new tab, print it, or save it as a PDF instantly.</p>
          </div>
        </div>

        {/* Line Separation */}
        <hr className="mt-12 border-gray-300 dark:border-gray-700" />
      </section>

      {/* Main Invoice Form Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6" id="main-content">
        <div className="space-y-4">
          <h1 className="text-4xl text-center font-bold">Form</h1>
          <InvoiceForm invoice={invoice} onChange={setInvoice} />
          <LogoUploader logo={invoice.logo} onUpload={(logo) => setInvoice({ ...invoice, logo })} />
          <TemplateSelector template={invoice.template} onChange={(t) => setInvoice({ ...invoice, template: t })} />
          <DownloadPDFButton invoice={invoice} />
        </div>
        <InvoicePreview invoice={invoice} />
      </main>

      {/* Footer Section */}
      <footer className="bg-white dark:bg-gray-900 shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} InvoiceApp. Made by Nimash Mendis.
        </div>
      </footer>
    </div>
  );
}
