import React from "react";
import { Route, Routes } from "react-router";
import Layout from "../Layout/Layout";
import ClinicLandingPage from "../Pages/ClinicLandingPage";
import DoctorsPage from "../Pages/DoctorsPage";
import DoctorProfilePage from "../Pages/DoctorProfilePage";

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ClinicLandingPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="doctors/:id" element={<DoctorProfilePage />} />
      </Route>
    </Routes>
  );
}
