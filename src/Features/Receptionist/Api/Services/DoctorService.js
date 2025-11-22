import axios from "axios";

const API_URL = "http://localhost:5000/api/doctors";
const ENDPOINT_URL = `${import.meta.env.VITE_BASE_URL}/doctors`



export const getAllDoctors = async () => {
  const response = await axios.get(API_URL)
  return response.data
}