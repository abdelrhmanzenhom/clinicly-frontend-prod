import api from "../axiosInstance";

export const addToQueue = async (payload) => {
    const { data } = await api.post("/queues", payload);
    return data;
};

export const getActiveQueueForDoctor = async (doctorId) => {
    const { data } = await api.get(`/queues/doctor/${doctorId}`);
    return data;
};

export const getQueueEntryById = async (id) => {
    const { data } = await api.get(`/queues/${id}`);
    return data;
};

export const startSession = async (id) => {
    const { data } = await api.patch(`/queues/${id}/start`);
    return data;
};

export const finishSession = async (id) => {
    const { data } = await api.patch(`/queues/${id}/finish`);
    return data;
};

export const cancelQueueEntry = async (id) => {
    const { data } = await api.patch(`/queues/${id}/cancel`);
    return data;
};

export const callNextPatient = async (doctorId) => {
    const { data } = await api.patch(`/queues/doctor/${doctorId}/next`);
    return data;
};

export const getAllActiveQueues = async () => {
    const { data } = await api.get("/queues");
    return data;
};
