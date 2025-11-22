import axios from "axios";


const ENDPOINT_URL = `${import.meta.env.VITE_BASE_URL}/patients`



export const getPatientProfile = async (id) => {
    const res = await axios.get(`${ENDPOINT_URL}/${id}`);
    return res.data;
};

export const updatePatientProfile = async (id, data) => {
    const res = await axios.put(`${ENDPOINT_URL}/${id}`, data);
    return res.data;
};


export const getAllPatients = async () => {
    const pew = await axios.get(ENDPOINT_URL);
    const pewData = pew.data;
    console.log(pewData);
    return pewData;

}

export const createPatient = async (newPatient) => {
    const res = await axios.post(`${ENDPOINT_URL}`, newPatient);
    return res.data; // make sure backend returns {patients: [...]}
};
