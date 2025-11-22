import React from "react";
import { Route, Routes } from "react-router";
import ReceptionistLayout from "../Layout/ReceptionistLayout";
import Dashboard from "../Pages/Dashboard";
import Appointments from "../Pages/Appointments";
import Billing from "../Pages/Billing";
import QueueManager from "../Pages/QueueManager";

export default function ReceptionistRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReceptionistLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="queue" element={<QueueManager />} />
        <Route path="billing" element={<Billing />} />
      </Route>
    </Routes>
  );
}
