import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signupPatient = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const loginPatient = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  console.log("login", res.data);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API_URL}/me`, {
    params: {
      id
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  console.log("UserData", res.data);
  return res.data;
};


