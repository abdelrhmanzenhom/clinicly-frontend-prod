import { QueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { createAppointment } from "../../../Api/Services/appointmentService";
import { queryClient } from "../../../App/main";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";
import { useCreateAppointment } from "../../../Hooks/useAppointment";

export default function ConfirmBooking({
  activePatient,
  activeDoctor,
  activeDate,
  chosenTime,
  setStatus,
}) {
  const { data, mutateAsync } = useCreateAppointment();
  // const [modalOpen, setModalOpen] = useState(false);

  // const appointmentMutation = useMutation({
  //   // mutationKey: ["patientAppointments"],
  //   mutationFn: createAppointment,
  //   onSuccess: () => {
  //     // queryClient.invalidateQueries({ queryKey: ["patientAppointments"] });
  //     setStatus("success");
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //     setStatus("error");
  //   },
  // });

  const handleBooking = async () => {
    const appointment = {
      patient: activePatient._id,
      doctor: activeDoctor._id,
      startTime: new Date(
        activeDate.setHours(chosenTime.hour, chosenTime.minute)
      ),
    };
    console.log(activeDate);
    console.log(chosenTime);
    console.log(appointment);
    try {
      const res = await mutateAsync(appointment);
      setStatus("success");
      console.log(res);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="text-center md:text-end mt-8 px-8">
      <button
        className="btn bg-accent-primary-main hover:accent-accent-primary-dark text-text-light disabled:bg-gray-500"
        onClick={() => document.getElementById("booking_modal").showModal()}
        disabled={!activeDoctor || !activeDate || !chosenTime}
      >
        Book Appointment
      </button>
      <dialog id="booking_modal" className="modal">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="modal-box max-w-lg p-0 overflow-hidden rounded-2xl shadow-xl bg-white"
          >
            {/* Title */}
            <h3 className="text-2xl font-semibold text-center py-4 text-gray-800">
              Confirm Appointment
            </h3>

            {/* Content */}
            <div className="px-6 pb-6 space-y-4 text-gray-700">
              {/* Patient */}
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-accent-primary-main" />
                  <span className="font-medium">Patient</span>
                </div>
                <span className="text-right font-semibold">
                  {activePatient?.fullName}
                </span>
              </div>

              {/* Doctor */}
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Stethoscope size={20} className="text-accent-primary-main" />
                  <span className="font-medium">Doctor</span>
                </div>

                <div className="text-right">
                  <span className="font-semibold">
                    {activeDoctor?.fullName}
                  </span>
                  <div className="text-sm text-gray-500">
                    {activeDoctor?.specialization} · {activeDoctor?.rank}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-accent-primary-main" />
                  <span className="font-medium">Date</span>
                </div>
                <span className="text-right font-semibold">
                  {activeDate?.toDateString()}
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center justify-between pb-1 modal-action">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-accent-primary-main" />
                  <span className="font-medium">Time</span>
                </div>
                <span className="text-right font-semibold">
                  {chosenTime?.time}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="modal-action bg-gray-100 px-6 py-4 flex justify-end gap-3">
              <form method="dialog" className="flex gap-4">
                <button className="btn bg-gray-300 hover:bg-gray-400 text-gray-700">
                  Cancel
                </button>
                <motion.button
                  onClick={handleBooking}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  className="btn bg-accent-primary-main hover:bg-accent-primary-dark text-white shadow-md"
                >
                  Confirm
                </motion.button>
              </form>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
