import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useAppointments,
  useUpdateAppointment,
  useUpdateAppointmentStatus,
} from "../../hooks/useAppointments";

const AppointmentsList = () => {
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Use TanStack Query hooks
  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useAppointments();
  const updateAppointmentMutation = useUpdateAppointmentStatus();

  // Filter appointments based on selected criteria
  const filteredAppointments = appointments.filter((appointment) => {
    const today = new Date().toISOString().split("T")[0];
    const appointmentDate = appointment.date?.split("T")[0] || appointment.date;

    const dateMatch =
      selectedDate === "all" ||
      (selectedDate === "today" && appointmentDate === today) ||
      (selectedDate === "upcoming" &&
        new Date(appointmentDate) > new Date(today));

    const statusMatch =
      selectedStatus === "all" ||
      appointment.status?.toLowerCase() === selectedStatus;

    return dateMatch && statusMatch;
  });

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await updateAppointmentMutation.mutateAsync({
        id: appointmentId,
        status: newStatus,
      });
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTodaysStats = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayAppointments = appointments.filter((apt) => {
      const aptDate = apt.date?.split("T")[0] || apt.date;
      return aptDate === today;
    });

    return {
      total: todayAppointments.length,
      completed: todayAppointments.filter(
        (apt) => apt.status?.toLowerCase() === "completed"
      ).length,
      inProgress: todayAppointments.filter(
        (apt) => apt.status?.toLowerCase() === "in progress"
      ).length,
      scheduled: todayAppointments.filter(
        (apt) => apt.status?.toLowerCase() === "scheduled"
      ).length,
    };
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary-main"></div>
        <p className="mt-4 text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="text-red-600 text-xl mb-4 text-center">⚠️</div>
          <p className="text-red-800 font-medium text-center mb-2">
            Failed to load appointments
          </p>
          <p className="text-red-600 text-sm text-center mb-4">
            {error?.message?.includes("Failed to fetch")
              ? "Cannot connect to backend. Please ensure the server is running on http://localhost:5002"
              : error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-accent-primary-main text-white rounded-lg hover:bg-accent-primary-dark transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = getTodaysStats();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Schedule New Appointment
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Today's Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">
              Total Appointments
            </h3>
            <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">Completed</h3>
            <p className="text-2xl font-bold text-green-900">
              {stats.completed}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800">In Progress</h3>
            <p className="text-2xl font-bold text-yellow-900">
              {stats.inProgress}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800">Scheduled</h3>
            <p className="text-2xl font-bold text-purple-900">
              {stats.scheduled}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Appointments</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment._id || appointment.id}
              className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedAppointment(appointment)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      appointment.patientAvatar ||
                      appointment.patient?.avatar ||
                      "https://via.placeholder.com/150"
                    }
                    alt={
                      appointment.patientName ||
                      appointment.patient?.name ||
                      "Patient"
                    }
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {appointment.patientName ||
                        appointment.patient?.name ||
                        "Unknown Patient"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appointment.type || "Consultation"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {appointment.condition ||
                        appointment.patient?.condition ||
                        ""}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-semibold text-gray-900">
                    {appointment.date}
                  </p>
                  <p className="text-sm text-gray-600">{appointment.time}</p>
                  <p className="text-xs text-gray-500">
                    {appointment.duration}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>

                  {appointment.status === "Scheduled" && (
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(
                            appointment._id || appointment.id,
                            "In Progress"
                          );
                        }}
                        className="px-2 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition-colors"
                        disabled={updateAppointmentMutation.isPending}
                      >
                        Start
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(
                            appointment._id || appointment.id,
                            "Cancelled"
                          );
                        }}
                        className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                        disabled={updateAppointmentMutation.isPending}
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {appointment.status === "In Progress" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(
                          appointment._id || appointment.id,
                          "Completed"
                        );
                      }}
                      className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                      disabled={updateAppointmentMutation.isPending}
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>

              {appointment.notes && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notes:</span>{" "}
                    {appointment.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 text-lg">No appointments found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your filters or schedule a new appointment
            </p>
          </div>
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Appointment Details
              </h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedAppointment.patientAvatar}
                  alt={selectedAppointment.patientName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedAppointment.patientName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedAppointment.condition}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{selectedAppointment.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{selectedAppointment.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium">{selectedAppointment.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{selectedAppointment.duration}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    selectedAppointment.status
                  )}`}
                >
                  {selectedAppointment.status}
                </span>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Notes</p>
                  <p className="text-sm bg-gray-50 p-3 rounded">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Reschedule
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  View Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
