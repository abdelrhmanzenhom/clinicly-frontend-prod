// src/Features/Receptionist/Pages/QueueManager.jsx

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getDoctors,
  getTodaysAppointments,
  getActiveQueue,
  addToQueue,
  callNext,
  cancelQueue,
  finishSession,
  startSession,
} from "../Api/queueApi";

import QueueTable from "../Components/QueueTable";
import TodayAppointments from "../Components/TodayAppointments";
import { useUpdateAppointment } from "../../../Hooks/useAppointment";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router";

export default function QueueManager() {
  const queryClient = useQueryClient();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const navigate = useNavigate();
  // Fetch all doctors
  const { data: doctorsData } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const doctors = doctorsData?.data?.doctors || [];

  // Today's appointments
  const { data: appointmentsData } = useQuery({
    queryKey: ["todayAppointments", selectedDoctor],
    queryFn: () => getTodaysAppointments(selectedDoctor),
    enabled: !!selectedDoctor,
  });

  const appointments = appointmentsData?.data?.appointments || [];
  console.log(appointmentsData?.data);
  // Active queue
  const { data: queueData } = useQuery({
    queryKey: ["doctorQueue", selectedDoctor],
    queryFn: () => getActiveQueue(selectedDoctor),
    enabled: !!selectedDoctor,
  });

  const queue = queueData?.data?.queue || [];

  // Check-in → add to queue mutation
  const checkInMutation = useMutation({
    mutationFn: addToQueue,
    onSuccess: () => {
      queryClient.invalidateQueries(["todayAppointments", selectedDoctor]);
      queryClient.invalidateQueries(["doctorQueue", selectedDoctor]);
      // updateAppointmentMutation.mutate();
    },
  });

  // Call next patient
  const nextMutation = useMutation({
    mutationFn: () => callNext(selectedDoctor),
    onSuccess: () => {
      queryClient.invalidateQueries(["doctorQueue", selectedDoctor]);
    },
  });

  // Cancel queue
  const cancelMutation = useMutation({
    mutationFn: cancelQueue,
    onSuccess: () => {
      queryClient.invalidateQueries(["doctorQueue", selectedDoctor]);
    },
  });

  // Finish session
  const finishMutation = useMutation({
    mutationFn: finishSession,
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries(["doctorQueue", selectedDoctor]);
      queryClient.invalidateQueries(["appointments"]);
      // console.log(data);
      navigate(
        `/receptionist/billing?queueEntry=${await JSON.stringify(
          data?.data?.queueEntry
        )}`
      );
    },
  });

  // Finish session
  const startMutation = useMutation({
    mutationFn: startSession,
    onSuccess: () => {
      queryClient.invalidateQueries(["doctorQueue", selectedDoctor]);
      queryClient.invalidateQueries(["appointments"]);
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Queue Management</h1>

      {/* Doctor selection */}
      <div>
        <label className="block font-medium mb-1">Select Doctor:</label>
        <select
          className="border p-2 rounded w-64"
          value={selectedDoctor || ""}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          <option value="">-- choose a doctor --</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.userId?.firstName} {doc.userId?.lastName}
            </option>
          ))}
        </select>
      </div>

      {selectedDoctor && (
        <>
          {/* Today's Appointments */}
          <TodayAppointments
            appointments={appointments}
            onCheckIn={(payload) => checkInMutation.mutate(payload)}
          />

          {/* Call next */}
          <div className="mt-6">
            <button
              // onClick={() => nextMutation.mutate()}
              onClick={() => setSnackOpen(true)}
              className="btn btn-info"
            >
              Call Next Patient
            </button>
            <Snackbar
              open={snackOpen}
              onClose={() => setSnackOpen(false)}
              message="Calling next patient!"
              autoHideDuration={3000}
            />
          </div>

          {/* Active Queue */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">
              Active Queue ({queue.length})
            </h3>
            <QueueTable
              queue={queue}
              onCancel={(id) => cancelMutation.mutate(id)}
              onCheckout={(id) => finishMutation.mutate(id)}
              onStartSession={(id) => startMutation.mutate(id)}
            />
          </div>
        </>
      )}
    </div>
  );
}
