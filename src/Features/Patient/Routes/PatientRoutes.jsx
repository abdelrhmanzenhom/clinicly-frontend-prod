import React from "react";
import { Route, Routes } from "react-router";
import Layout from "../Layout/Layout";
import PatientDash from "../Pages/PatientDash";
import MedicalRecords from "../Pages/MedicalRecords";
import MyAppointments from "../Pages/MyAppointments";
import PatientPrescriptions from "../Pages/PatientPrescriptions";
import DoctorSpecialtyAI from "../Pages/AiPage";
import CreateAppointment from "../../Receptionist/Components/Appointments/CreateAppointment";
import Profile from "../Pages/Profile";
import Bills from "../Pages/Bills";

export default function PatientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PatientDash />} />
        <Route path="profile" element={<Profile />} />
        <Route path="records" element={<MedicalRecords />} />
        <Route path="appointments" element={<MyAppointments />} />
        <Route path="book-appointment" element={<CreateAppointment />} />
        <Route path="prescriptions" element={<PatientPrescriptions />} />
        <Route path="bills" element={<Bills />} />
        <Route path="assistant" element={<DoctorSpecialtyAI />} />
      </Route>
    </Routes>
  );
}
