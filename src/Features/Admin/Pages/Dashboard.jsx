import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAdminDashboard = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/dashboard/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export default function Dashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: fetchAdminDashboard,
  });

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">Total Patients</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {data.totalPatients}
          </p>
        </div>
         <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">Total Doctors</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {data.totalDoctors}
          </p>
        </div>
         <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">Total Receptionists</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {data.totalReceptionists}
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">Appointments Today</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {data.todayAppointments}
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">
            ${data.totalRevenue}
          </p>
        </div>
      </div>

      {/* Recently Added Patients */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recently Added Patients</h2>
        <ul className="space-y-3">
          {data.recentPatients?.length > 0 ? (
            data.recentPatients.map((patient) => (
              <li key={patient._id} className="border-b pb-2">
                {patient.firstName} {patient.lastName} — {patient.gender}
              </li>
            ))
          ) : (
            <li>No recent patients</li>
          )}
        </ul>
      </div>
    </div>
  );
}
