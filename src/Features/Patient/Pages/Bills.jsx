import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../../../Api/Services/billingService";
import { format } from "date-fns";
import { useAuth } from "../../../Context/AuthContext";

export default function Bills() {
  const { superUser, loading } = useAuth();
  const patientId = superUser?._id;
  console.log(superUser);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-500 text-xl">
        Loading invoices...
      </div>
    );
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["invoices", patientId],
    queryFn: () =>
      getInvoices({
        patientId,
      }),
    enabled: !!patientId,
  });

  console.log(data);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-500 text-xl">
        Loading invoices...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Error loading invoices.
      </div>
    );

  const invoices = data?.invoices || [];

  // Filter groups
  const pending = invoices.filter(
    (invoice) => invoice.paymentStatus === "Pending"
  );
  const past = invoices.filter(
    (invoice) => invoice.paymentStatus !== "Pending"
  );

  // Helper function to extract names
  const getPatientName = (inv) =>
    inv.appointment?.patient?.userId
      ? `${inv.appointment.patient.userId.firstName} ${inv.appointment.patient.userId.lastName}`
      : "Unknown Patient";

  const getDoctorName = (inv) =>
    inv.appointment?.doctor?.userId
      ? `${inv.appointment.doctor.userId.firstName} ${inv.appointment.doctor.userId.lastName}`
      : "Unknown Doctor";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-800">My Bills</h1>

        {/* ======================= PENDING PAYMENTS ======================= */}
        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            Pending Payments
            <span className="badge badge-warning">{pending.length}</span>
          </h2>

          {pending.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No pending payments 🎉
            </p>
          ) : (
            <div className="space-y-4">
              {pending.map((inv) => (
                <InvoiceCard
                  key={inv._id}
                  invoice={inv}
                  patientName={getPatientName(inv)}
                  doctorName={getDoctorName(inv)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ======================= PAST PAYMENTS ======================= */}
        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            Payment History
            <span className="badge badge-neutral">{past.length}</span>
          </h2>

          {past.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No past payments found.
            </p>
          ) : (
            <div className="space-y-4">
              {past.map((inv) => (
                <InvoiceCard
                  key={inv._id}
                  invoice={inv}
                  patientName={getPatientName(inv)}
                  doctorName={getDoctorName(inv)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// ======================= CARD COMPONENT =======================

function InvoiceCard({ invoice, patientName, doctorName }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow transition">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-700">
          Invoice #{invoice._id.slice(-6)}
        </h3>

        <span
          className={`badge ${
            invoice.paymentStatus === "Paid"
              ? "badge-success"
              : invoice.paymentStatus === "Pending"
              ? "badge-warning"
              : "badge-neutral"
          }`}
        >
          {invoice.paymentStatus}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>
          <strong>Doctor:</strong> {doctorName}
        </p>
        <p>
          <strong>Appointment Date:</strong>{" "}
          {invoice.appointment?.startTime
            ? format(new Date(invoice.appointment.startTime), "dd/MM/yyyy")
            : "N/A"}
        </p>
        <p>
          <strong>Payment Method:</strong> {invoice.paymentMethod}
        </p>
        <p>
          <strong>Total Amount:</strong>{" "}
          <span className="font-semibold text-gray-800">
            {invoice.totalAmount} EGP
          </span>
        </p>
        {invoice.discount ? (
          <p>
            <strong>Discount:</strong> {invoice.discount}{" "}
            {invoice.discountType === "percentage" ? "%" : "EGP"}
          </p>
        ) : null}
      </div>

      {invoice.paymentStatus === "Pending" && (
        <button className="btn btn-primary btn-sm mt-4 w-full">Pay Now</button>
      )}
    </div>
  );
}
