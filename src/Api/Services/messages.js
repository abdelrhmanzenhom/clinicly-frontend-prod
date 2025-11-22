const API_URL = import.meta.env.VITE_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Get all messages for the current user
export const getAllMessages = async () => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Messages endpoint not found (404)");
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || data || "Failed to fetch messages");
    }
    return data?.data || data || [];
  } catch (error) {
    // If it's a JSON parse error, the endpoint doesn't exist
    if (error.message.includes("JSON")) {
      throw new Error("Messages endpoint not found (404)");
    }
    throw error;
  }
};

// Get recent messages (limit to most recent)
export const getRecentMessages = async (limit = 5) => {
  try {
    const response = await fetch(
      `${API_URL}/messages?limit=${limit}&sort=-createdAt`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Messages endpoint not found (404)");
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data?.message || data || "Failed to fetch recent messages"
      );
    }
    return data?.data || data || [];
  } catch (error) {
    // If it's a JSON parse error, the endpoint doesn't exist
    if (error.message.includes("JSON")) {
      throw new Error("Messages endpoint not found (404)");
    }
    throw error;
  }
};

// Get message by ID
export const getMessageById = async (id) => {
  const response = await fetch(`${API_URL}/messages/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || data || "Failed to fetch message");
  }
  return data?.data || data;
};

// Get messages for a specific patient
export const getPatientMessages = async (patientId) => {
  const response = await fetch(`${API_URL}/messages/patient/${patientId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data?.message || data || "Failed to fetch patient messages"
    );
  }
  return data?.data || data || [];
};

// Send a new message
export const sendMessage = async (messageData) => {
  const response = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(messageData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || data || "Failed to send message");
  }
  return data?.data || data;
};

// Mark message as read
export const markMessageAsRead = async (id) => {
  const response = await fetch(`${API_URL}/messages/${id}/read`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || data || "Failed to mark message as read");
  }
  return data?.data || data;
};

// Delete a message
export const deleteMessage = async (id) => {
  const response = await fetch(`${API_URL}/messages/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || data || "Failed to delete message");
  }
  return data?.data || data;
};
