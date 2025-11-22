import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import PatientPrescriptions from "./PatientPrescriptions";
import calender from "../../../assets/calender.svg";
import record from "../../../assets/record.svg";
import mail from "../../../assets/mail.svg";
import homelogo from "../../../assets/homelogo.svg";
import msg from "../../../assets/msg.svg";
import profile from "../../../assets/profile.svg";
import { useAuth } from "../../../Context/AuthContext";

export default function PatientDash() {
  const { data, isLoading, isError, error } = usePatients();
  const { user } = useAuth();
  console.log(user);

  // Loading or error states for patients
  if (isLoading || !user)
    return (
      <div className="flex justify-center items-center h-screen text-text-dark">
        Loading patients...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-bg-light-primary text-text-dark overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* SIDEBAR */}

          {/* MAIN CONTENT */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-text-dark text-[32px] font-bold leading-tight min-w-72">
                Welcome back, {user.firstName} ✨
              </p>
            </div>

            {/* Book Button */}
            <div className="flex px-4 py-3 justify-start">
              <Link
                to="book-appointment"
                className="bg-accent-primary-main hover:bg-accent-primary-dark text-text-light rounded-lg px-6 py-2 font-bold transition-colors duration-200"
              >
                Book New Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
