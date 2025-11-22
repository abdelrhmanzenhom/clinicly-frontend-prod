// src/Features/Receptionist/Components/TodayAppointments.jsx

import { format } from "date-fns";
import React from "react";
import { useUpdateAppointment } from "../../hooks/useAppointments";

export default function TodayAppointments({ appointments, onCheckIn }) {
  // Update appointment Status
  const updateAppointmentMutation = useUpdateAppointment();

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Today's Appointments</h3>

      <table className="w-full border bg-white shadow-md rounded-lg text-left">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">Time</th>
            <th className="p-3">Patient</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a._id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {format(new Date(a.startTime), "hh:mm aaa")}
              </td>
              <td className="p-3">
                {a.patient?.userId?.firstName} {a.patient?.userId?.lastName}
              </td>

              <td className="p-3 capitalize">{a.status}</td>

              <td className="p-3">
                {!a.isCheckedIn && (
                  <button
                    onClick={() => {
                      onCheckIn({
                        doctorId: a.doctor,
                        patientId: a.patient,
                        appointmentId: a._id,
                      });
                      updateAppointmentMutation.mutate({
                        id: a._id,
                        status: "Checked-In",
                      });
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Check In
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
