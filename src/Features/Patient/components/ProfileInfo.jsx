import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React from "react";
import { getPatientHistory } from "../../../Api/Services/patients";

export default function ProfileInfo({ patient }) {
  const {
    data: history = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["history", patient._id],
    queryFn: () => getPatientHistory(patient._id),
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{patient.fullName}</h2>
        <button
          className="btn btn-outline btn-primary btn-sm"
          onClick={() =>
            document.getElementById("editProfileModal").showModal()
          }
        >
          Edit Profile
        </button>
      </div>

      {/* Info Card */}
      <div className="card bg-base-100 shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span> {patient.userId.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {patient.userId.phone}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {format(new Date(patient.dateOfBirth), "dd/MM/yyyy")}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {patient.gender}
          </p>
          <p className="md:col-span-2">
            <span className="font-semibold">Address:</span>{" "}
            {patient.address.street}, {patient.address.area} –{" "}
            {patient.address.city}, {patient.address.country}
          </p>
        </div>
      </div>

      {/* Patient History */}
      <div className="card bg-base-100 shadow-md p-6 ">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Visit History
        </h3>
        <div className="max-h-[500px] overflow-y-auto">
          {history.count > 0 ? (
            <div className="space-y-4">
              {history.data.map((visit) => (
                <div
                  key={visit._id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition"
                >
                  {/* Timeline Dot */}
                  <div className="pt-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>

                  {/* Visit Info */}
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {format(new Date(visit.startTime), "dd/MM/yyyy")}
                    </p>
                    <p className="text-gray-600">
                      Doctor:{" "}
                      <span className="font-medium">
                        {visit.doctor.fullName}
                      </span>{" "}
                      — {visit.doctor.specialization}
                    </p>
                    <p className="text-gray-600">{visit.type}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8 text-lg">
              No previous visits.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
