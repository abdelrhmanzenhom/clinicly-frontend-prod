import { useState } from "react";
import AppointmentActions from "./AppointmentActions";
import StatusBadge from "./StatusBadge";
import CancelModal from "./CancelModal";
import { format } from "date-fns";

export default function AppointmentsTable({
  appointments,
  setSnackMsg,
  setSnackOpen,
}) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const openCancelModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  console.log(appointments);
  return (
    <>
      <div className="mt-10 flex max-w-full overflow-x-auto shadow-md rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((a) => (
                <tr className="hover:bg-bg-light-secondary" key={a._id}>
                  <td className="font-medium break-all">
                    {a.patient.fullName}
                  </td>
                  <td className="break-all">Dr. {a.doctor.fullName}</td>

                  <td className="break-all">
                    {format(new Date(a.startTime), "yyyy-MM-dd")}
                  </td>

                  <td>{format(new Date(a.startTime), "hh:mm a")}</td>

                  <td>
                    <StatusBadge status={a.status} />
                  </td>

                  <td className="text-right">
                    <AppointmentActions
                      appointment={a}
                      onCancel={() => openCancelModal(a)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Single global cancel modal */}
      <CancelModal
        appointment={selectedAppointment}
        showCancelModal={showCancelModal}
        setSnackOpen={setSnackOpen}
        setShowCancelModal={setShowCancelModal}
        setSnackMsg={setSnackMsg}
      />
    </>
  );
}
