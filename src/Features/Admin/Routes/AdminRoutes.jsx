import React from "react";
import { Routes, Route } from "react-router";
import CreateDoctor from "../Pages/CreateDoctor";
import AdminLayout from "../Layout/Layout";
import Dashboard from "../Pages/Dashboard";
import UsersManagement from "../Pages/UsersManagement";
import Patients from "../Pages/Patients";
import CreateReceptionist from "../Pages/CreateReceptionist";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="create-doctor" element={<CreateDoctor />} />
        <Route path="create-receptionist" element={<CreateReceptionist />} />
        <Route path="crud-users" element={<UsersManagement />} />
        <Route path="patients" element={<Patients />} />
      </Route>
    </Routes>
  );
}
