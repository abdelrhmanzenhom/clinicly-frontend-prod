import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export const createReceptionist = async (data) => {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
        `${API_URL}/create-user`,
        { ...data, role: "receptionist" }, // Fixed role
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


import api from "../axiosInstance";

export const getReceptionistDashboard = async () => {
    const { data } = await api.get("/dashboard/receptionist");
    return data
}