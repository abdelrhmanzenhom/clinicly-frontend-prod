
const BASE_URL = import.meta.env.VITE_BASE_URL;

async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new Error(data?.message || data || "Request failed");
  }

  return data;
}


function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? { "Authorization": `Bearer ${token}` }
    : {};
}


export async function getAllPatients(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/patients?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}


export async function getPatientById(id) {
  const res = await fetch(`${BASE_URL}/patients/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}


export async function getPatientHistory(id) {
  const res = await fetch(`${BASE_URL}/patients/${id}/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}


export async function createPatient(patientData) {
  const res = await fetch(`${BASE_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(patientData),
  });
  return handleResponse(res);
}


export async function updatePatient(id, updates) {
  const res = await fetch(`${BASE_URL}/patients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(updates),
  });
  return handleResponse(res);
}


export async function deletePatient(id) {
  const res = await fetch(`${BASE_URL}/patients/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}
