import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    getAvailableSlots
} from "../Api/Services/appointmentService";

export const useAppointments = (filters) =>
    useQuery({
        queryKey: ["appointments", filters],
        queryFn: () => getAppointments(filters),
        refetchOnMount: true
    });

export const useAppointment = (id) =>
    useQuery({
        queryKey: ["appointment", id],
        queryFn: () => getAppointmentById(id),
        enabled: !!id,
    });

export const useCreateAppointment = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: createAppointment,
        onSuccess: () => client.invalidateQueries(["appointments"]),
    });
};

export const useUpdateAppointment = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => updateAppointment(id, payload),
        onSuccess: () => client.invalidateQueries(["appointments"]),
    });
};

export const useCancelAppointment = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: cancelAppointment,
        onSuccess: () => client.invalidateQueries(["appointments"]),
    });
};

export const useAvailableSlots = (params) =>
    useQuery({
        queryKey: ["available-slots", params],
        queryFn: () => getAvailableSlots(params),
        enabled: !!params?.doctorId,
    });
