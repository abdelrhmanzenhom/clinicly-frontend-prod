// import axios from "axios";



// const getAppointmentsHistory = async (patientId) => {
//   const token = localStorage.getItem("token");

//   const res = await axios.get(`${API_URL}/${patientId}/history`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return res.data;
// };

// export default {
//   getAppointmentsHistory,
// };

// import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/patients`;

export const getAppointmentsHistory = async (patientId) => {
  const response = await api.get(`${API_URL}/${patientId}/history`);
  return response.data;
};

export default {
  getAppointmentsHistory,
};


import axios from "axios"

const ENDPOINT_URL = `${import.meta.env.VITE_BASE_URL}/appointments`


// ex: appointmentData {
// "doctor": "6912e39b9fc8a02b3ad18a78",
//     "patient": "6912e39b9fc8a02b3ad18a7b",
//         "startTime": "2025-11-11T10:30:00.000Z",
//             "endTime": "2025-11-11T11:30:00.000Z",
//                 "type": "Clinic Visit",
//                     "notes": null
// }
export const createAppointment = async (appointmentData) => {
  const pew = (await api.post(ENDPOINT_URL, appointmentData)).data // Add headers later
  console.log(pew);
  return pew;
}

export const getAvailableSlots = async (doctorId, date) => {
  console.log(doctorId, date);
  const pew = (await api.get(`${ENDPOINT_URL}/available-slots`, {
    params: {
      doctorId,
      date
    },
  })).data
  console.log(pew);
  return pew;
}

////////////////////////////

import api from "../axiosInstance";

export const getAppointments = async (filters = {}) => {
  const { data } = await api.get("/appointments", { params: filters });
  return data;
};

export const getAppointmentById = async (id) => {
  const { data } = await api.get(`/appointments/${id}`);
  return data;
};

// export const createAppointment = async (payload) => {
//     const { data } = await api.post("/appointments", payload);
//     return data;
// };

export const updateAppointment = async (id, payload) => {
  const { data } = await api.put(`/appointments/${id}`, payload);
  return data;
};

export const cancelAppointment = async (id) => {
  const { data } = await api.patch(`/appointments/${id}/cancel`);
  return data;
};

// export const getAvailableSlots = async (params) => {
//     const { data } = await api.get("/appointments/available-slots", { params });
//     return data;
// };

