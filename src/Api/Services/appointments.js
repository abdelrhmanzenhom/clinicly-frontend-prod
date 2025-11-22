const API_URL = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Get all appointments
export const getAllAppointments = async () => {
  const response = await fetch(`${API_URL}/appointments`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || data || "Failed to fetch appointments");
  }
  return data?.data || data || [];
};

// Get appointment by ID
export const getAppointmentById = async (id) => {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || data || "Failed to fetch appointment");
  }
  return data?.data || data;
};

// Get today's appointments
export const getTodayAppointments = async () => {
  const today = new Date().toISOString().split("T")[0];
  const response = await fetch(`${API_URL}/appointments?date=${today}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data?.message || data || "Failed to fetch today's appointments"
    );
  }
  return data?.data || data || [];
};

// Get doctor's appointments
export const getDoctorAppointments = async (doctorId) => {
  const response = await fetch(`${API_URL}/appointments/doctor/${doctorId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data?.message || data || "Failed to fetch doctor appointments"
    );
  }
  return data?.data || data || [];
};

// Get doctor's appointments
// export const getPatientAppointments = async (patientId) => {
//   const response = await fetch(`${API_URL}/appointments/patient/${patientId}`, {
//     method: "GET",
//     headers: getAuthHeaders(),
//   });

//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(
//       data?.message || data || "Failed to fetch doctor appointments"
//     );
//   }
//   return data?.data || data || [];
// };

// Create new appointment
export const createAppointment = async (appointmentData) => {
  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(appointmentData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || data || "Failed to create appointment");
  }
  return data?.data || data;
};

// Update appointment
export const updateAppointment = async ({ id, ...appointmentData }) => {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(appointmentData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || data || "Failed to update appointment");
  }
  return data?.data || data;
};

// Delete appointment
export const deleteAppointment = async (id) => {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || data || "Failed to delete appointment");
  }
  return data?.data || data;
};

// Update appointment status
export const updateAppointmentStatus = async ({ id, status }) => {
  const response = await fetch(`${API_URL}/appointments/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data?.message || data || "Failed to update appointment status"
    );
  }
  return data?.data || data;
};
