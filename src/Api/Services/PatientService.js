// src/Api/Services/PatientService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export const getAllPatients = async (userId = null) => {
    console.log(userId);
    const res = await axios.get(`${API_URL}/patients`, {
        params: {
            userId: userId
        }
    });
    return res.data; // make sure backend returns {patients: [...]}
};


export const createPatient = async (newPatient) => {
    const res = await axios.post(`${API_URL}/patients`, newPatient);
    return res.data; // make sure backend returns {patients: [...]}
};

export const getPatientById = async (id) => {
    console.log("getPatientById", id);
    const res = await axios.get(`${API_URL}/patients/${id}`);
    return res.data;
}

