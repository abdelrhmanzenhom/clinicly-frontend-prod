const BASE_URL = "http://localhost:5002/api";

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
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Create a new prescription (Doctor only)
 */
export async function createPrescription(prescriptionData) {
  const res = await fetch(`${BASE_URL}/prescriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(prescriptionData),
  });
  return handleResponse(res);
}

/**
 * Get all prescriptions for a patient
 */
export async function getPrescriptionsByPatient(patientId) {
  const res = await fetch(`${BASE_URL}/prescriptions/patient/${patientId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}

/**
 * Get prescriptions by doctor
 */
export async function getPrescriptionsByDoctor(doctorId) {
  const res = await fetch(`${BASE_URL}/prescriptions/doctor/${doctorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}

/**
 * Get a single prescription by ID
 */
export async function getPrescriptionById(id) {
  const res = await fetch(`${BASE_URL}/prescriptions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}

/**
 * Delete a prescription (Doctor/Admin only)
 */
export async function deletePrescription(id) {
  const res = await fetch(`${BASE_URL}/prescriptions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}

/**
 * Update a prescription (assuming this endpoint exists)
 */
export async function updatePrescription(id, prescriptionData) {
  const res = await fetch(`${BASE_URL}/prescriptions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(prescriptionData),
  });
  return handleResponse(res);
}
