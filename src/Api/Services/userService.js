import axios from "axios";
import api from "../axiosInstance";

export const getSuperUser = async (userId) => {
    const { data } = await axios.get(`http://localhost:5000/api/auth/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    return data;
};
