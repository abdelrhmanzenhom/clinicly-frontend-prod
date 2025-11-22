import TextField from "@mui/material/TextField";
import React, { useState, useMemo } from "react";
import FormTitle from "./FormTitle";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getAllPatients } from "../../../Api/Services/UserMangementService";
import PatientList from "./PatientList";
import PatientFormModal from "./PatientSearch/PatientFormModal";
import { createPatient } from "../Api/Services/patientService";

export default function PatientSearch({
  setActivePatient,
  activePatient,
  user,
}) {
  const { role } = user;
  const [phone, setPhone] = useState(() =>
    role === "patient" ? user.phone : ""
  );
  const [email, setEmail] = useState(() =>
    role === "patient" ? user.email : ""
  );
  const [name, setName] = useState(() =>
    role === "patient" ? user.firstName + " " + user.lastName : ""
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = new QueryClient();
  const {
    data: patients,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
    staleTime: 1000 * 60,
  });

  const createMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: (data) => {
      const { data: patient } = data;
      setIsModalOpen(false);
      setActivePatient(patient); // auto-select after creation
      setName(patient.fullName);
      setEmail(patient.userId.email);
      setPhone(patient.userId.phone);
      queryClient.invalidateQueries(["patients"]);
    },
  });

  // Filter patients based on any filled field
  const filteredPatients = useMemo(() => {
    if (!patients?.data) return [];
    return patients.data.filter((p) => {
      const matchesPhone = phone ? p.userId?.phone?.includes(phone) : true;
      const matchesEmail = email
        ? p.userId?.email?.toLowerCase().includes(email.toLowerCase())
        : true;
      const matchesName = name
        ? p.fullName?.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchActive = p.userId.isActive == true;
      return matchesPhone && matchesEmail && matchesName && matchActive;
    });
  }, [patients, phone, email, name]);
  console.log(filteredPatients);

  if (isLoading) return "Loading...";
  if (isError) return "Error loading patients";

  return (
    <div className="flex w-full justify-center md:justify-start">
      <div className="mt-8 px-8">
        <FormTitle text="Step 1: Search for a patient" />

        <div className="mt-4 flex flex-col md:flex-row gap-4 items-center md:justify-start">
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="Patient's Number"
            placeholder="Enter patient's phone number"
            disabled={user.role === "patient"}
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Patient's Email"
            placeholder="e.g. abcd@example.com"
            type="email"
            disabled={user.role === "patient"}
          />
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Patient's Name"
            placeholder="e.g. Ahmed Mohammed"
            disabled={user.role === "patient"}
          />
        </div>
        <div className="mt-4 text-center md:text-start">
          <button
            className="btn border-2 border-accent-primary-main text-accent-primary-main disabled:bg-bg-light-primary  disabled:border-gray-500 disabled:text-gray-500 "
            onClick={() => {
              setName("");
              setPhone("");
              setEmail("");
              setActivePatient(null);
            }}
            disabled={!activePatient || user.role === "patient"}
          >
            Reset
          </button>
        </div>
        {filteredPatients.length > 0 ? (
          <PatientList
            filteredPatients={filteredPatients}
            activePatient={activePatient}
            setActivePatient={setActivePatient}
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
          />
        ) : (
          <div className="mt-6 flex flex-col items-center gap-3 border-t pt-4">
            <p className="opacity-70">No matching patients found.</p>

            {/* DaisyUI Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary text-white"
            >
              + Create New Patient
            </button>
          </div>
        )}
        {/* Modal */}
        <PatientFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => createMutation.mutate(data)}
          isLoading={createMutation.isPending}
        />
      </div>
    </div>
  );
}
