import { BrowserRouter, Route, Router, Routes } from "react-router";
import DoctorRoutes from "../Features/Doctor/Routes/DoctorRoutes";
import ReceptionistRoutes from "../Features/Receptionist/Routes/ReceptionistRoutes";
import AdminRoutes from "../Features/Admin/Routes/AdminRoutes";
import HomeRoutes from "../Features/Home/Routes/HomeRoutes";
import AuthRoutes from "../Features/Auth/Routes/AuthRoutes";
import PatientRoutes from "../Features/Patient/Routes/PatientRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/patient/*" element={<PatientRoutes />} />
        <Route path="/receptionist/*" element={<ReceptionistRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
      </Routes>
    </>
  );
}

export default App;
