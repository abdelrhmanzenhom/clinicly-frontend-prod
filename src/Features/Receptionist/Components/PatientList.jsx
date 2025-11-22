import clsx from "clsx";
import React from "react";
import FormTitle from "./FormTitle";

export default function PatientList({
  filteredPatients,
  activePatient,
  setActivePatient,
  setName,
  setEmail,
  setPhone,
}) {
  return (
    <>
      <div className="mt-6">
        <FormTitle text="Step 2: Select a patient" />
        {filteredPatients.length > 0 ? (
          <div className="flex flex-col gap-2  pt-4  max-h-[300px] overflow-y-auto">
            {filteredPatients.map((patient) => (
              <div
                key={patient._id}
                onClick={() => {
                  setActivePatient(patient);
                  setName(patient.fullName);
                  setPhone(patient.userId.phone);
                  setEmail(patient.userId.email);
                }}
                className={clsx(
                  `cursor-pointer border rounded p-2 hover:bg-accent-primary-main/10 `,

                  patient._id == activePatient?._id &&
                    "bg-accent-success-main/20 hover:bg-accent-success-dark/20"
                )}
              >
                <p className="font-semibold">{patient.fullName}</p>
                <p className="text-sm text-gray-600">{patient.userId.phone}</p>
                <p className="text-sm text-gray-600">{patient.userId.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No matching patients found</p>
        )}
      </div>
    </>
  );
}
