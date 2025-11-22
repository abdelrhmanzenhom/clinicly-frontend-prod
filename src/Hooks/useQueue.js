import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addToQueue,
    getActiveQueueForDoctor,
    getQueueEntryById,
    startSession,
    finishSession,
    cancelQueueEntry,
    callNextPatient,
    getAllActiveQueues
} from "../Api/Services/queueService";

// All receptionists need this live-updating
export const useAllActiveQueues = () =>
    useQuery({
        queryKey: ["active-queues"],
        queryFn: getAllActiveQueues,
        refetchInterval: 10_000,
    });

export const useDoctorQueue = (doctorId) =>
    useQuery({
        queryKey: ["doctor-queue", doctorId],
        queryFn: () => getActiveQueueForDoctor(doctorId),
        enabled: !!doctorId,
        refetchInterval: 5_000,
    });

export const useAddToQueue = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: addToQueue,
        onSuccess: () => {
            client.invalidateQueries(["active-queues"]);
            client.invalidateQueries(["doctor-queue"]);
        },
    });
};

export const useQueueEntry = (id) =>
    useQuery({
        queryKey: ["queue-entry", id],
        queryFn: () => getQueueEntryById(id),
        enabled: !!id,
    });

export const useStartSession = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: startSession,
        onSuccess: () => client.invalidateQueries(["active-queues"]),
    });
};

export const useFinishSession = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: finishSession,
        onSuccess: () => client.invalidateQueries(["active-queues"]),
    });
};

export const useCancelQueueEntry = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: cancelQueueEntry,
        onSuccess: () => client.invalidateQueries(["active-queues"]),
    });
};

export const useCallNextPatient = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: callNextPatient,
        onSuccess: () => client.invalidateQueries(["active-queues"]),
    });
};
