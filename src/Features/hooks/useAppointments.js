import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllAppointments,
  getAppointmentById,
  getTodayAppointments,
  getDoctorAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
} from "../../Api/Services/appointments";

// Hook to get all appointments
export const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on 404
      if (error?.message?.includes("404")) return false;
      return failureCount < 2;
    },
    select: (data) => {
      // Ensure we always return an array
      return Array.isArray(data) ? data : [];
    },
  });
};

// Hook to get today's appointments
export const useTodayAppointments = () => {
  return useQuery({
    queryKey: ["appointments", "today"],
    queryFn: getTodayAppointments,
    staleTime: 1 * 60 * 1000, // 1 minute for today's appointments
    retry: (failureCount, error) => {
      if (error?.message?.includes("404")) return false;
      return failureCount < 2;
    },
    select: (data) => {
      // Ensure we always return an array
      return Array.isArray(data) ? data : [];
    },
  });
};

// Hook to get doctor's appointments
export const useDoctorAppointments = (doctorId) => {
  return useQuery({
    queryKey: ["appointments", "doctor", doctorId],
    queryFn: () => getDoctorAppointments(doctorId),
    enabled: !!doctorId, // Only run if doctorId exists
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: (failureCount, error) => {
      if (error?.message?.includes("404")) return false;
      return failureCount < 2;
    },
  });
};

// Hook to get doctor's appointments
// export const usePatientAppointments = (patientId) => {
//   return useQuery({
//     queryKey: ["appointments", "patient", patientId],
//     queryFn: () => getPatientAppointments(patientId),
//     enabled: !!patientId, // Only run if doctorId exists
//     staleTime: 2 * 60 * 1000, // 2 minutes
//     retry: (failureCount, error) => {
//       if (error?.message?.includes("404")) return false;
//       return failureCount < 2;
//     },
//   });
// };

// Hook to get single appointment by ID
export const useAppointment = (id) => {
  return useQuery({
    queryKey: ["appointments", id],
    queryFn: () => getAppointmentById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to create an appointment
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      // Invalidate all appointment queries to refetch
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Failed to create appointment:", error);
    },
  });
};

// Hook to update an appointment
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointment,
    onSuccess: (data, variables) => {
      // Invalidate all appointment queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      // Update the specific appointment in cache
      queryClient.setQueryData(["appointments", variables.id], data);
    },
    onError: (error) => {
      console.error("Failed to update appointment:", error);
    },
  });
};

// Hook to delete an appointment
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Failed to delete appointment:", error);
    },
  });
};

// Hook to update appointment status
export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.setQueryData(["appointments", variables.id], data);
    },
    onError: (error) => {
      console.error("Failed to update appointment status:", error);
    },
  });
};
