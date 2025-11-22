import { useState } from "react";
import { ErrorState, LoadingState } from "../../Components/Appointments/States";
import Filters from "../../Components/Appointments/Filters";
import AppointmentsTable from "../../Components/Appointments/AppointmentsTable";
import { useAppointments } from "../../../../Hooks/useAppointment";
import Snackbar from "@mui/material/Snackbar";
import { green, red } from "@mui/material/colors";
import SnackbarContent from "@mui/material/SnackbarContent";

export default function AppointmentDisplay() {
  const [filters, setFilters] = useState({
    date: "",
    doctor: "",
    patient: "",
    status: "Scheduled",
  });

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const { data, isLoading, isError } = useAppointments(filters);

  if (data) console.log("appointments", data.appointments);

  const handleInputChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="space-y-8">
      {/* Filters */}
      <Filters filters={filters} onChange={handleInputChange} />

      {/* Table */}
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState />
      ) : (
        <AppointmentsTable
          setSnackMsg={setSnackMsg}
          setSnackOpen={setSnackOpen}
          appointments={data.appointments}
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackOpen}
        onClose={() => {
          setSnackOpen(false);
        }}
        message={snackMsg}
        autoHideDuration={2000}
      >
        <SnackbarContent
          message={snackMsg}
          sx={{
            backgroundColor: snackMsg.includes("success")
              ? green[500]
              : red[500],
            color: "#fff",
            fontWeight: "600",
          }}
        />
      </Snackbar>
    </div>
  );
}
