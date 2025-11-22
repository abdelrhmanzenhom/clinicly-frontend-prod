import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";

import homeIcon from "../../../assets/homelogo.svg";
import calender from "../../../assets/calender.svg";
import patients from "../../../assets/patients.svg";
import Brain from "../../../assets/Brain.svg";
import record from "../../../assets/record.svg";
import PatientsList from "./PatientsList";
import AppointmentsList from "./AppointmentsList";
import PrescriptionsList from "./PrescriptionsList";
import PrescriptionForm from "./PrescriptionForm";
import { useTodayAppointments } from "../../hooks/useAppointments";
import { useRecentMessages } from "../../hooks/useMessages";

export default function DoctorDash() {
  const [activeView, setActiveView] = useState("dashboard");
  const [doctorId, setDoctorId] = useState(null);

  // Get doctor ID from JWT token
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Decode JWT manually (without external library)
        const parts = token.split(".");
        if (parts.length === 3) {
          const decoded = JSON.parse(atob(parts[1]));
          if (decoded.id) {
            setDoctorId(decoded.id);
          }
        }
      }
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }, []);

  // Fetch real data using TanStack Query
  const {
    data: todayAppointmentsData,
    isLoading: appointmentsLoading,
    error: appointmentsError,
  } = useTodayAppointments();

  const {
    data: recentMessagesData,
    isLoading: messagesLoading,
    error: messagesError,
  } = useRecentMessages(3);

  // Ensure data is always an array
  const todayAppointments = Array.isArray(todayAppointmentsData)
    ? todayAppointmentsData
    : [];
  const recentMessages = Array.isArray(recentMessagesData)
    ? recentMessagesData
    : [];

  const sidebarItems = [
    { label: "Dashboard", icon: homeIcon, view: "dashboard" },
    { label: "Appointments", icon: calender, view: "appointments" },
    { label: "Patients", icon: patients, view: "patients" },
    { label: "Prescriptions", icon: record, view: "prescriptions" },
    { label: "AI Diagnosis Tool", icon: Brain, view: "ai-tool" },
  ];

  const renderDashboardContent = () => (
    <>
      {/* Appointments */}
      <h2 className="text-text-dark text-[22px] font-bold px-4 pb-3 pt-5">
        Today's Appointments
      </h2>
      <div className="px-4 py-3">
        {appointmentsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary-main"></div>
          </div>
        ) : appointmentsError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">
              Failed to load appointments
            </p>
            <p className="text-red-600 text-sm mt-1">
              {appointmentsError.message?.includes("Failed to fetch")
                ? "Cannot connect to backend. Please ensure the server is running."
                : appointmentsError.message}
            </p>
          </div>
        ) : todayAppointments.length === 0 ? (
          <div className="flex overflow-hidden rounded-lg border border-[#dbdfe6] bg-bg-light-primary p-8">
            <p className="text-[#616f89] text-center w-full">
              No appointments scheduled for today
            </p>
          </div>
        ) : (
          <div className="flex overflow-hidden rounded-lg border border-[#dbdfe6] bg-bg-light-primary">
            <table className="flex-1 w-full">
              <thead>
                <tr className="bg-bg-light-secondary">
                  <th className="px-4 py-3 text-left text-text-dark text-sm font-medium">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-text-dark text-sm font-medium">
                    Patient
                  </th>
                  <th className="px-4 py-3 text-left text-text-dark text-sm font-medium">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-text-dark text-sm font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((appt) => (
                  <tr
                    key={appt._id || appt.id}
                    onClick={() => setActiveView("appointments")}
                    className="border-t border-[#dbdfe6] hover:bg-bg-light-secondary transition-colors duration-200 cursor-pointer"
                  >
                    <td className="px-4 py-2 text-[#616f89] text-sm">
                      {appt.time}
                    </td>
                    <td className="px-4 py-2 text-text-dark text-sm">
                      {appt.patientName || appt.patient?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-2 text-[#616f89] text-sm">
                      {appt.type || "Consultation"}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium">
                      <button className="rounded-lg bg-bg-light-secondary text-text-dark px-4 py-1 text-sm font-medium">
                        {appt.status || "Scheduled"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Messages */}
      <h2 className="text-text-dark text-[22px] font-bold px-4 pb-3 pt-5">
        Recent Patient Messages
      </h2>
      {messagesLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary-main"></div>
        </div>
      ) : messagesError ? (
        <div className="mx-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">Failed to load messages</p>
          <p className="text-red-600 text-sm mt-1">
            {messagesError.message?.includes("Failed to fetch")
              ? "Cannot connect to backend. Please ensure the server is running."
              : messagesError.message}
          </p>
        </div>
      ) : recentMessages.length === 0 ? (
        <div className="mx-4 rounded-lg border border-[#dbdfe6] bg-bg-light-primary p-8">
          <p className="text-[#616f89] text-center">No recent messages</p>
        </div>
      ) : (
        recentMessages.map((msg) => (
          <div
            key={msg._id || msg.id}
            className="flex items-center gap-4 bg-bg-light-primary px-4 min-h-[72px] py-2 justify-between hover:bg-bg-light-secondary transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14"
                style={{
                  backgroundImage:
                    msg.patientAvatar || msg.patient?.avatar
                      ? `url(${msg.patientAvatar || msg.patient?.avatar})`
                      : "url(https://via.placeholder.com/150)",
                }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-text-dark text-base font-medium">
                  {msg.patientName || msg.patient?.name || "Unknown Patient"}
                </p>
                <p className="text-[#616f89] text-sm font-normal line-clamp-1">
                  {msg.message || msg.content || "No message content"}
                </p>
              </div>
            </div>
            {!msg.read && (
              <div className="w-2 h-2 bg-accent-primary-main rounded-full"></div>
            )}
          </div>
        ))
      )}

      {/* Quick Access */}
      <h2 className="text-text-dark text-[22px] font-bold px-4 pb-3 pt-5">
        Quick Access
      </h2>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-lg">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-text-dark text-base font-bold">
                AI Diagnosis Tool
              </p>
              <p className="text-[#616f89] text-sm font-normal">
                Quickly analyze patient symptoms and get preliminary insights.
              </p>
            </div>
            <button
              className="flex items-center justify-center gap-2 bg-bg-light-secondary hover:bg-bg-light-primary text-text-dark 
                        rounded-lg text-sm font-medium transition-colors duration-200"
              style={{ width: "125px", height: "32px" }}
            >
              <Link to="assistant">Launch Tool</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </button>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCp1ztmCNjaQ4Ysr6JJ9C5Uk2P1o14xYEcqmZm4A9nVo3FzSIId0CpiED0cZ435FYxcpkkZxkjPDb1Yl8lN_H3p3QnQK3m4Gx3cT_6ZslTe2CzL1d0bPKE30WjbqpRe8MS0rKZMbDg8YRYRxU4Y3807ozuMhWdmlegE_xuVUoXV7UmSDfqZ0ypExFjkCcj6aNL-RO1lDZ9K8ZNY-FXjp2ZYPKc9-5ZVvSeAFhxuMskkKfjoqfUsa59vw-pmT-Ez4uHoyPuFI__ZQB8")',
            }}
          ></div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-bg-light-primary text-text-dark overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1  flex flex-1 justify-center">
          {/* SIDEBAR */}

          {/* MAIN CONTENT */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {activeView === "patients" ? (
              <PatientsList />
            ) : activeView === "appointments" ? (
              <AppointmentsList />
            ) : activeView === "prescriptions" ? (
              <PrescriptionsList doctorId={doctorId} viewMode="doctor" />
            ) : activeView === "ai-tool" ? (
              <div className="p-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  AI Diagnosis Tool
                </h1>
                <p className="text-gray-600">
                  AI diagnosis functionality coming soon...
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <p className="text-text-dark text-[32px] font-bold leading-tight min-w-72">
                    Dashboard
                  </p>
                </div>
                {renderDashboardContent()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
