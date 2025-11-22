import React from "react";
import { useUpdateAppointment } from "../../hooks/useAppointments";

export default function QueueTable({
  queue,
  onCancel,
  onCheckout,
  onCheckIn,
  onStartSession,
}) {
  const updateAppointmentMutation = useUpdateAppointment();
  return (
    <table className="w-full border mt-4 text-left bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="p-3">#</th>
          <th className="p-3">Patient</th>
          <th className="p-3">Status</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {queue.map((entry, index) => (
          <tr key={entry._id} className="border-b hover:bg-gray-50 transition">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{entry.patient?.fullName}</td>
            <td className="p-3 capitalize">{entry.status}</td>
            <td className="p-3">
              {entry.status !== "in-session" ? (
                <div className="flex gap-4 ">
                  <button
                    onClick={() => onStartSession(entry._id)}
                    className=" btn btn-success"
                  >
                    Start Session
                  </button>
                  {console.log(entry)}
                  <button
                    onClick={() => {
                      updateAppointmentMutation.mutate({
                        id: entry.appointment,
                        status: "Canceled",
                      });
                      onCancel(entry._id);
                    }}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onCheckout(entry._id)}
                  className="btn btn-warning"
                >
                  Checkout
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
