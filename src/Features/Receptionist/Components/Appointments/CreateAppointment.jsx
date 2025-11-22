import { useState } from "react";
import DashboardHeader from "../../../../Components/Header/DashboardHeader";
import Snackbar from "@mui/material/Snackbar";
import DoctorSearch from "../DoctorSearch";
import PatientSearch from "../PatientSearch";
import DoctorCalender from "../DoctorCalender";
import ConfirmBooking from "../ConfirmBooking";
import DoctorTime from "../DoctorTime";
import { green, red } from "@mui/material/colors";
import SnackbarContent from "@mui/material/SnackbarContent";
import { useAuth } from "../../../../Context/AuthContext";

export default function CreateAppointment() {
  const { user } = useAuth();
  const [activePatient, setActivePatient] = useState(null);
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [activeDate, setActiveDate] = useState(null);
  const [chosenTime, setChosenTime] = useState(null);
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setStatus(null);
  };

  const messages = {
    success: "Appointment Booked Successfully",
    error: "Couldn't Book Appointment",
  };

  if (!user) {
    return "Loading user...";
  }

  return (
    <div className="py-10">
      <DashboardHeader
        title="Book An Appointment"
        subtitle="Find the right care for your needs"
      />

      <PatientSearch
        setActivePatient={setActivePatient}
        activePatient={activePatient}
        user={user}
      />

      {activePatient && (
        <DoctorSearch
          activeDoctor={activeDoctor}
          setActiveDoctor={setActiveDoctor}
        />
      )}

      {activeDoctor && (
        <DoctorCalender
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          activeDoctor={activeDoctor}
        />
      )}

      {activeDate && activeDoctor && (
        <DoctorTime
          doctor={activeDoctor}
          date={activeDate}
          chosenTime={chosenTime}
          setChosenTime={setChosenTime}
        />
      )}

      <ConfirmBooking
        activePatient={activePatient}
        activeDate={activeDate}
        activeDoctor={activeDoctor}
        chosenTime={chosenTime}
        setStatus={setStatus}
      />
      <Snackbar open={!!status} autoHideDuration={3000} onClose={handleClose}>
        <SnackbarContent
          message={messages[status]}
          sx={{
            backgroundColor: status === "success" ? green[500] : red[500],
            color: "#fff",
            fontWeight: "600",
          }}
        />
      </Snackbar>
    </div>
  );
}
