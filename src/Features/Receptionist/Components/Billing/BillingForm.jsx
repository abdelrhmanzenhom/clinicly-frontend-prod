import React, { useEffect, useMemo, useState } from "react";
import { useCreateInvoice } from "../../../../Hooks/useInvoice";
import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "../../../../Api/Services/appointments";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

export default function BillingForm() {
  const createMutation = useCreateInvoice();
  const [searchParams, setSearchParams] = useSearchParams();
  const queueEntry = searchParams.get("queueEntry");
  const [entryObj, setEntryObj] = useState(() =>
    JSON.parse(queueEntry || "{}")
  );
  console.log(entryObj);

  // useEffect(() => {
  //   const getEntryObj = async () => await JSON.parse(queueEntry);
  //   getEntryObj();
  // }, []);

  // const entryObj = getEntryObj();
  console.log(entryObj);
  const [form, setForm] = useState({
    appointmentId: entryObj?.appointment || "",
    patientId: entryObj?.patient || "",
    baseAmount: "",
    paidAmount: 0,
    discount: 0,
    discountType: "flat",
    taxRate: 0,
    paymentMethod: "cash",
    notes: "",
    pointsUsed: 0,
  });

  const [appointmentFilter, setAppointmentFilter] = useState("");

  /* ===================== FETCH DATA ===================== */

  const { data: apptData, isLoading: apptsLoading } = useQuery({
    queryKey: ["billing-appointments"],
    queryFn: getAllAppointments,
  });

  // ✅ Normalize backend response shape
  const appointmentsRaw = useMemo(
    () =>
      Array.isArray(apptData)
        ? apptData
        : apptData?.data || apptData?.appointments || [],
    [apptData]
  );

  /* ===================== FILTER LOGIC ===================== */

  const appointments = useMemo(() => {
    const list = appointmentsRaw || [];
    if (!appointmentFilter) return list;
    const term = appointmentFilter.toLowerCase();

    return list.filter((a) => {
      // Support multiple shapes: patient.userId, patientInfo.fullName, doctor.userId, doctorInfo.fullName
      const patientName = a?.patient?.userId?.firstName
        ? `${a.patient.userId.firstName} ${a.patient.userId.lastName}`
        : a?.patientInfo?.fullName || "";
      const doctorName = a?.doctor?.userId?.firstName
        ? `${a.doctor.userId.firstName} ${a.doctor.userId.lastName}`
        : a?.doctorInfo?.fullName || "";
      const dateStr = a?.startTime
        ? new Date(a.startTime).toLocaleDateString()
        : "";
      return (
        patientName.toLowerCase().includes(term) ||
        doctorName.toLowerCase().includes(term) ||
        dateStr.toLowerCase().includes(term)
      );
    });
  }, [appointmentsRaw, appointmentFilter]);

  // No patient selector; patient is inferred from appointment

  /* ===================== HANDLERS ===================== */

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: [
        "baseAmount",
        "discount",
        "taxRate",
        "pointsUsed",
        "paidAmount",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const estimatedTotal = useMemo(() => {
    const base = Number(form.baseAmount) || 0;
    let total = base;

    if (form.discountType === "flat") total -= form.discount;
    if (form.discountType === "percentage")
      total -= (form.discount / 100) * base;
    if (form.taxRate > 0) total += (form.taxRate / 100) * total;

    return Math.max(0, total.toFixed(2));
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.appointmentId) {
      toast.error("Please select an appointment");
      return;
    }

    // Derive patientId from selected appointment if not set
    const selectedAppt = appointments.find((a) => a._id === form.appointmentId);
    const derivedPatientId =
      selectedAppt?.patient?._id ||
      selectedAppt?.patientId ||
      selectedAppt?.patient?.userId?._id ||
      selectedAppt?.patientInfo?._id ||
      form.patientId;
    if (!derivedPatientId) {
      toast.error("Could not determine patient from the selected appointment");
      return;
    }

    try {
      const payload = {
        appointmentId: form.appointmentId,
        patientId: derivedPatientId,
        baseAmount: form.baseAmount,
        discount: form.discount,
        discountType: form.discountType,
        taxRate: form.taxRate,
        paymentMethod: form.paymentMethod,
        notes: form.notes,
        pointsUsed: form.pointsUsed,
        paidAmount: form.paidAmount,
      };
      await createMutation.mutateAsync(payload);
      toast.success("Invoice created successfully");

      setForm({
        appointmentId: "",
        patientId: "",
        baseAmount: "",
        paidAmount: 0,
        discount: 0,
        discountType: "flat",
        taxRate: 0,
        paymentMethod: "cash",
        notes: "",
        pointsUsed: 0,
      });
    } catch (error) {
      //alert(err?.response?.data?.message || "Something went wrong");
      console.log("FULL ERROR:", error);

      toast.error(error.message);
    }
  };

  /* ===================== UI ===================== */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-2xl shadow"
    >
      <h2 className="text-xl font-bold">Create Invoice</h2>

      {/* APPOINTMENT */}
      <div>
        <label className="block mb-1">Appointment</label>
        <input
          className="input input-bordered w-full mb-2"
          placeholder="Search appointment..."
          value={appointmentFilter}
          onChange={(e) => setAppointmentFilter(e.target.value)}
          disabled={!!queueEntry}
        />
        <select
          className="select select-bordered w-full"
          value={form.appointmentId}
          disabled={!!queueEntry}
          onChange={(e) => {
            const id = e.target.value;
            const selectedAppt = appointments.find((a) => a._id === id);
            const inferredPatientId =
              selectedAppt?.patient?._id ||
              selectedAppt?.patientId ||
              selectedAppt?.patient?.userId?._id ||
              selectedAppt?.patientInfo?._id ||
              "";
            setForm((prev) => ({
              ...prev,
              appointmentId: id,
              patientId: inferredPatientId,
            }));
          }}
        >
          <option value="">Select Appointment</option>
          {apptsLoading && <option>Loading...</option>}
          {appointments.map((a) => (
            <option key={a._id} value={a._id}>
              {a?.patient?.userId?.firstName} {a?.patient?.userId?.lastName} -
              Dr. {a?.doctor?.userId?.firstName}
            </option>
          ))}
        </select>
      </div>

      {/* FINANCIAL */}
      {/* FINANCIAL SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Base Amount */}
        <div>
          <label className="block mb-1 font-medium">Base Amount (EGP)</label>
          <input
            className="input input-bordered w-full"
            type="number"
            name="baseAmount"
            min="0"
            placeholder="Enter base amount"
            value={form.baseAmount}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Paid Amount (EGP)</label>
          <input
            className="input input-bordered w-full"
            type="number"
            name="paidAmount"
            min="0"
            placeholder="Amount paid by patient"
            value={form.paidAmount}
            onChange={onChange}
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block mb-1 font-medium">Discount</label>
          <div className="flex gap-2">
            <input
              className="input input-bordered w-full"
              type="number"
              name="discount"
              min="0"
              placeholder="Discount value"
              value={form.discount}
              onChange={onChange}
            />

            <select
              className="select select-bordered"
              name="discountType"
              value={form.discountType}
              onChange={onChange}
            >
              <option value="flat">EGP</option>
              <option value="percentage">%</option>
            </select>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            className="select select-bordered w-full"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={onChange}
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
            <option value="insurance">Insurance</option>
          </select>
        </div>

        {/* Loyalty Points */}
        <div>
          <label className="block mb-1 font-medium">Points Used</label>
          <input
            className="input input-bordered w-full"
            type="number"
            name="pointsUsed"
            min="0"
            value={form.pointsUsed}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1 font-medium">Notes</label>
        <textarea
          className="textarea textarea-bordered w-full"
          rows="3"
          name="notes"
          placeholder="Optional notes..."
          value={form.notes}
          onChange={onChange}
        />
      </div>

      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl">
        <span className="font-semibold">Total: EGP {estimatedTotal}</span>
        <button className="btn btn-primary" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create Invoice"}
        </button>
      </div>
    </form>
  );
}
