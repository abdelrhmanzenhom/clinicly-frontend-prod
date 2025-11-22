import React from "react";
import BillingForm from "../Components/Billing/BillingForm";
import InvoiceList from "../Components/Billing/InvoiceList";

export default function Billing() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between gap-3 p-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600">Create and manage invoices</p>
      </div>

      <section className="p-4 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>
        <BillingForm />
      </section>

      <section className="p-4 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Invoices</h2>
        <InvoiceList />
      </section>
    </div>
  );
}
