import React, { useMemo, useState } from "react";
import { useInvoices, useUpdateInvoice } from "../../../../Hooks/useInvoice";
import toast from "react-hot-toast";

export default function InvoiceList() {
  const [filters, setFilters] = useState({
    paymentStatus: "",
    paymentMethod: "",
    appointment: "",
    patient: "",
  });

  const { data, isLoading, error } = useInvoices(filters);
  const updateMutation = useUpdateInvoice();

  const invoices = useMemo(() => {
    // billingService returns `data`; backend may return wrapper
    // Normalize to array
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.invoices)) return data.invoices;
    return [];
  }, [data]);

  const filteredInvoices = useMemo(() => {
    let list = invoices;
    // Payment Status
    if (filters.paymentStatus) {
      const status = filters.paymentStatus.toLowerCase();
      list = list.filter((inv) => (inv.paymentStatus || "").toLowerCase() === status);
    }
    // Payment Method
    if (filters.paymentMethod) {
      const method = filters.paymentMethod.toLowerCase();
      list = list.filter((inv) => (inv.paymentMethod || "").toLowerCase() === method);
    }
    // Appointment ID (partial match allowed)
    if (filters.appointment) {
      const term = filters.appointment.trim();
      list = list.filter((inv) => (inv.appointment?._id || "").includes(term));
    }
    // Patient ID (partial match allowed)
    if (filters.patient) {
      const term = filters.patient.trim();
      list = list.filter((inv) => (inv.appointment?.patient?._id || "").includes(term));
    }
    return list;
  }, [invoices, filters]);

  const onFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const markPaid = async (invoice) => {
    try {
      await updateMutation.mutateAsync({
        id: invoice._id,
        payload: { paymentStatus: "Paid", paymentDate: new Date().toISOString() },
      });
      toast.success("Invoice updated to Paid.");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || err?.message || "Failed to update invoice.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Payment Status</span></label>
          <select name="paymentStatus" value={filters.paymentStatus} onChange={onFilterChange} className="select select-bordered">
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Refunded">Refunded</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Payment Method</span></label>
          <select name="paymentMethod" value={filters.paymentMethod} onChange={onFilterChange} className="select select-bordered">
            <option value="">All</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
            <option value="insurance">Insurance</option>
          </select>
        </div>
      {/*   <div className="form-control">
          <label className="label"><span className="label-text">Appointment ID</span></label>
          <input name="appointment" value={filters.appointment} onChange={onFilterChange} className="input input-bordered" placeholder="Filter by Appointment ID" />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Patient ID</span></label>
          <input name="patient" value={filters.patient} onChange={onFilterChange} className="input input-bordered" placeholder="Filter by Patient ID" />
        </div> */}
      </div>

      <div className="mt-4 overflow-x-auto shadow rounded-xl">
        {isLoading ? (
          <div className="p-6">Loading invoices...</div>
        ) : error ? (
          <div className="p-6 text-error">{error.message || "Failed to load invoices."}</div>
        ) : filteredInvoices.length === 0 ? (
          <div className="p-6">No invoices found.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Appointment</th>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Base</th>
                <th>Discount</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
               <tr key={inv._id} className="hover:bg-bg-light-secondary">
  <td className="font-mono text-sm">{inv._id}</td>
  <td className="font-mono text-sm">{inv.appointment._id}</td>
  <td className="font-mono text-sm">{inv.appointment?.doctor?.userId?.firstName} {inv.appointment?.doctor?.userId?.lastName}</td>
  <td className="font-mono text-sm">{inv.appointment?.patient?.userId?.firstName} {inv.appointment?.patient?.userId?.lastName}</td>
  <td>EGP {inv.baseAmount}</td>
  <td>{inv.discount} {inv.discountType === "percentage" ? "%" : "EGP"}</td>
  <td><span className="font-semibold">EGP {inv.totalAmount}</span></td>
  <td className="capitalize">{inv.paymentMethod}</td>
  <td>
    <span className={`badge ${inv.paymentStatus === "Paid" ? "badge-success" : inv.paymentStatus === "Pending" ? "badge-warning" : "badge-ghost"}`}>
      {inv.paymentStatus}
    </span>
  </td>
  <td className="text-right">
    <button
      className="btn btn-sm btn-primary"
      disabled={updateMutation.isPending || inv.paymentStatus === "Paid"}
      onClick={() => markPaid(inv)}
    >
      Mark Paid
    </button>
  </td>
</tr>

              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}