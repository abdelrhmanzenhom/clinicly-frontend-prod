import React, { useMemo, useState } from "react";
import Formtitle from "./FormTitle";
import TextField from "@mui/material/TextField";
import DoctorList from "./DoctorList";
import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "../Api/Services/DoctorService";

export default function DoctorSearch({ activeDoctor, setActiveDoctor }) {
  const {
    data: doctors,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["Doctors"],
    queryFn: getAllDoctors,
  });

  const [filters, setFilters] = useState({
    specialization: "",
    name: "",
    phone: "",
  });
  const filtered = useMemo(() => {
    if (!doctors?.doctors) return [];

    return doctors.doctors.filter((d) => {
      const s = filters.specialization.toLowerCase();
      const n = filters.name.toLowerCase();
      const p = filters.phone;

      return (
        (!s || d.specialization?.toLowerCase().includes(s)) &&
        (!n || d.fullName?.toLowerCase().includes(n)) &&
        (!p || d.userId?.phone.includes(p))
      );
    });
  }, [doctors, filters]);

  if (isLoading) {
    return "Loading Doctors...";
  }

  if (isError) {
    return "Error Loading Doctors...";
  }

  return (
    <div className="mt-8 px-8">
      <Formtitle text="Step 3: Search for a doctor" />
      <form className="mt-4">
        <div className="flex flex-col md:flex-row gap-4 items-center md:justify-start">
          <div>
            <TextField
              value={filters.specialization}
              onChange={(e) => {
                setFilters({ ...filters, specialization: e.target.value });
              }}
              label="specialization"
              placeholder="e.g. Cardiology"
            />
          </div>
          <div className="flex justify-center md:justify-start">
            <TextField
              value={filters.name}
              onChange={(e) => {
                setFilters({ ...filters, name: e.target.value });
              }}
              label="Doctor's Name"
              placeholder="e.g. Ahmed Mohammed"
            />
          </div>
          <div className="flex justify-center md:justify-start">
            <TextField
              value={filters.phone}
              onChange={(e) => {
                setFilters({ ...filters, phone: e.target.value });
              }}
              label="Doctor's phone"
              placeholder="Enter doctor's phone"
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-start mt-4 gap-4">
          <button
            className=" text-text-light bg-accent-primary-main px-6 py-2 rounded font-semibold"
            type="Submit"
          >
            Search
          </button>
          <button
            className="btn border-2 border-accent-primary-main text-accent-primary-main disabled:bg-bg-light-primary  disabled:border-gray-500 disabled:text-gray-500"
            onClick={() => {
              setFilters({
                specialization: "",
                name: "",
                phone: "",
              });
              setActiveDoctor(null);
            }}
            disabled={!activeDoctor}
          >
            Reset
          </button>
        </div>
      </form>
      <DoctorList
        doctors={filtered}
        setActiveDoctor={setActiveDoctor}
        activeDoctor={activeDoctor}
        setFilters={setFilters}
      />
    </div>
  );
}
