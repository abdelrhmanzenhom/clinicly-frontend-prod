import clsx from "clsx";
import React from "react";
import { isActiveDoctor } from "../Utils/doctorListHelpers";
import { Link } from "react-router";

export default function DoctorCard({ doctor, activeDoctor }) {
  // console.log(doctor);
  return (
    <div
      className={clsx(
        `flex flex-col-reverse items-center text-center justify-between border  p-4 rounded-lg my-6 cursor-pointer`,
        `hover:-translate-y-1.5 transition-transform duration-300`,
        `md:flex-row md:text-start`,
        isActiveDoctor(doctor, activeDoctor) && "bg-accent-success-main/20",
        !isActiveDoctor(doctor, activeDoctor) && "border-gray-300"
      )}
    >
      <div className="details">
        <h4 className="font-bold text-xl">{doctor.fullName}</h4>
        <p className="text-gray-500">{doctor.qualification}</p>
        <button
          href="/profile"
          className="mt-4 text-text-dark bg-bg-light-secondary px-6 py-2 rounded font-semibold"
          type="Submit"
        >
          Profile
        </button>
      </div>
      <div className="avatar">
        <img
          src={doctor.userId.profileImage ? doctor.userId.profileImage : null}
          className="h-48 aspect-square rounded-lg"
          alt="Doctor's profile picture"
        />
      </div>
    </div>
  );
}
