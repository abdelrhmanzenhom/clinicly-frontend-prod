import { useEffect } from "react";
import { useCancelAppointment } from "../../../../Hooks/useAppointment";
import { format } from "date-fns";

export default function CancelModal({
  appointment,
  showCancelModal,
  setSnackOpen,
  setShowCancelModal,
  setSnackMsg,
}) {
  const { mutate, data, error, isLoading } = useCancelAppointment();

  useEffect(() => {
    if (data) {
      setSnackMsg(data.message);
      setSnackOpen(true);
      setShowCancelModal(false);
    }
    if (error) {
      const { message } = error.response.data;
      setSnackMsg(`Error: ${message}`);
      setSnackOpen(true);
      setShowCancelModal(false);
    }
  }, [data, error]);

  if (!showCancelModal || !appointment) return null;

  return (
    <div className={`modal ${showCancelModal ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Cancel Appointment</h3>

        <p className="py-4 text-center">
          Are you sure you want to cancel this appointment?
        </p>

        <div className="text-start space-y-2">
          <div>
            <span className="font-semibold">Patient: </span>
            <span>{appointment.patientInfo.fullName}</span>
          </div>

          <div>
            <span className="font-semibold">Doctor: </span>
            <span>{appointment.doctorInfo.fullName}</span>
          </div>

          <div>
            <span className="font-semibold">Slot: </span>
            <span>
              {format(new Date(appointment.startTime), "yyyy-MM-dd @ HH:mm")}
            </span>
          </div>
        </div>

        <div className="modal-action">
          <button
            className="btn btn-error text-white"
            disabled={isLoading}
            onClick={() => mutate(appointment._id)}
          >
            {isLoading ? "Canceling..." : "Confirm"}
          </button>

          <button
            className="btn btn-ghost ml-4"
            onClick={() => setShowCancelModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
