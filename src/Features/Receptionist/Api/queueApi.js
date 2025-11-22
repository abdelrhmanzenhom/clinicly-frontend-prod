// src/Features/Receptionist/Api/queueApi.js

import axios from "../../../Api/axiosInstance";

export const getDoctors = () => axios.get("/doctors");

export const getTodaysAppointments = (doctorId) =>
    axios.get(`/appointments/doctor/${doctorId}/today`);

export const getActiveQueue = (doctorId) =>
    axios.get(`/queues/doctor/${doctorId}`);

export const addToQueue = (data) => axios.post("/queues", data);

export const callNext = (doctorId) =>
    axios.patch(`/queues/doctor/${doctorId}/next`);


export const cancelQueue = (id) =>
    axios.patch(`/queues/${id}/cancel`);

export const startSession = (id) =>
    axios.patch(`queues/${id}/start`)

export const finishSession = (id) =>
    axios.patch(`queues/${id}/finish`)
