import React from "react";
import FormTitle from "./FormTitle";
import DoctorCard from "./DoctorCard";

export default function DoctorList({
  setFilters,
  doctors = [],
  setActiveDoctor,
  activeDoctor,
}) {
  return (
    <>
      {doctors.length > 0 ? (
        <div className="mt-8 max-h-[400px] overflow-y-auto">
          <FormTitle text="Step 4: Select a doctor" />
          <ul>
            {doctors.map((doctor) => {
              return (
                <li
                  onClick={() => {
                    setActiveDoctor(doctor);
                    setFilters({
                      name: doctor.fullName,
                      specialization: doctor.specialization,
                      phone: doctor.userId.phone,
                    });
                  }}
                  key={doctor._id}
                >
                  <DoctorCard doctor={doctor} activeDoctor={activeDoctor} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No matching patients found</p>
      )}
    </>
  );
}
