import axios from "axios";
import api from "../axiosInstance";

export const getSuperUser = async (userId) => {
    const { data } = await api.get(`/auth/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    return data;
};
