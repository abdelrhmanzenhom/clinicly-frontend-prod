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
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getAllDoctors(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/doctors?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}

export async function getDoctorById(id) {
  const res = await fetch(`${BASE_URL}/doctors/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}

export async function getDoctorHistory(id) {
  const res = await fetch(`${BASE_URL}/doctors/${id}/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}

export async function createDoctor(doctorData) {
  const res = await fetch(`${BASE_URL}/admin/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(doctorData),
  });
  return handleResponse(res);
}

export async function updateDoctor(id, updates) {
  const res = await fetch(`${BASE_URL}/doctors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(updates),
  });
  return handleResponse(res);
}

export async function deleteDoctor(id) {
  const res = await fetch(`${BASE_URL}/doctors/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}
