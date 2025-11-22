import axios from "axios";

// Use environment variable
const API_URL = import.meta.env.VITE_BASE_URL;

export const signupPatient = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data;
};

export const loginPatient = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  console.log("login", res.data);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API_URL}/auth/me`, {
    params: { id },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  console.log("UserData", res.data);
  return res.data;
};
