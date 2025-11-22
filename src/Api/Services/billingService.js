import api from "../axiosInstance";

// CREATE
export const createInvoice = async (payload) => {
  try {
    const { data } = await api.post("/invoices", payload);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// GET ALL
export const getInvoices = async (filters = {}) => {
  try {
    const { data } = await api.get("/invoices", {
      params: filters,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// GET ONE
export const getInvoiceById = async (id) => {
  try {
    const { data } = await api.get(`/invoices/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// UPDATE
export const updateInvoice = async (id, payload) => {
  try {
    const { data } = await api.patch(`/invoices/${id}`, payload);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
