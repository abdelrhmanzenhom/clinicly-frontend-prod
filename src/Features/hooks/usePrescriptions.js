import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPrescriptionsByDoctor,
  getPrescriptionsByPatient,
  deletePrescription,
  createPrescription,
  updatePrescription,
} from "../../Api/Services/prescriptions.js";

/**
 * Custom hook for managing prescriptions with TanStack Query
 * @param {Object} options - Configuration options
 * @param {string} options.doctorId - Doctor ID for fetching doctor's prescriptions
 * @param {string} options.patientId - Patient ID for fetching patient's prescriptions
 * @param {string} options.mode - 'doctor' or 'patient' to determine which API to call
 * @returns {Object} Hook state and methods
 */
export const usePrescriptions = ({ doctorId, patientId, mode = "doctor" }) => {
  const queryClient = useQueryClient();

  // Create query key based on mode and ID
  const queryKey =
    mode === "patient"
      ? ["prescriptions", "patient", patientId]
      : ["prescriptions", "doctor", doctorId];

  // Query function based on mode
  const queryFn = () => {
    if (mode === "patient" && patientId) {
      console.log("Fetching prescriptions for patient:", patientId);
      return getPrescriptionsByPatient(patientId);
    } else if (mode === "doctor" && doctorId) {
      console.log("Fetching prescriptions for doctor:", doctorId);
      return getPrescriptionsByDoctor(doctorId);
    }
    console.log("No ID provided for prescriptions query");
    return Promise.resolve([]);
  };

  // Main query for fetching prescriptions
  const {
    data: prescriptionsData = [],
    isLoading: loading,
    error,
    refetch: refreshPrescriptions,
  } = useQuery({
    queryKey,
    queryFn,
    enabled:
      (mode === "doctor" && !!doctorId) || (mode === "patient" && !!patientId),
    select: (data) => {
      console.log("Prescriptions data from backend:", data);
      // Handle both array and object responses
      if (Array.isArray(data)) {
        return data;
      }
      if (
        data &&
        typeof data === "object" &&
        data.data &&
        Array.isArray(data.data)
      ) {
        return data.data;
      }
      return [];
    },
    retry: (failureCount, error) => {
      // Don't retry on 404 (doctor/patient not found)
      if (error.message.includes("404")) return false;
      // Retry on network errors up to 2 times
      return failureCount < 2;
    },
  });

  const prescriptions = Array.isArray(prescriptionsData)
    ? prescriptionsData
    : [];

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createPrescription,
    onSuccess: (newPrescription) => {
      console.log("Prescription created successfully:", newPrescription);
      // Update cache optimistically
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!Array.isArray(oldData)) {
          return [newPrescription];
        }
        return [...oldData, newPrescription];
      });
      // Invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
    onError: (error) => {
      console.error("Failed to create prescription:", error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updatePrescription(id, data),
    onSuccess: (updatedPrescription, { id }) => {
      console.log("Prescription updated successfully:", updatedPrescription);
      // Update cache optimistically
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!Array.isArray(oldData)) return oldData;
        return oldData.map((p) => (p._id === id ? updatedPrescription : p));
      });
      // Invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
    onError: (error) => {
      console.error("Failed to update prescription:", error);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deletePrescription,
    onSuccess: (_, prescriptionId) => {
      // Remove the deleted prescription from cache optimistically
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return [];
        return oldData.filter((p) => p._id !== prescriptionId);
      });

      // Optionally invalidate to refetch from server
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
    onError: (error) => {
      console.error("Failed to delete prescription:", error);
    },
  });

  const createPrescriptionMutation = async (data) => {
    try {
      return await createMutation.mutateAsync(data);
    } catch (err) {
      throw err;
    }
  };

  const updatePrescriptionMutation = async (id, data) => {
    try {
      return await updateMutation.mutateAsync({ id, data });
    } catch (err) {
      throw err;
    }
  };

  const deletePrescriptionById = async (prescriptionId) => {
    try {
      await deleteMutation.mutateAsync(prescriptionId);
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    prescriptions,
    loading,
    error: error
      ? error.message.includes("Failed to fetch")
        ? "Cannot connect to server. Please check if the backend is running on http://localhost:5002"
        : `Failed to load prescriptions: ${error.message}`
      : "",
    refreshPrescriptions,
    deletePrescriptionById,
    createPrescriptionMutation,
    updatePrescriptionMutation,
    isDeleting: deleteMutation.isPending,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    deleteError: deleteMutation.error?.message || "",
    createError: createMutation.error?.message || "",
    updateError: updateMutation.error?.message || "",
    setError: () => {}, // Kept for compatibility but not needed with React Query
  };
};
