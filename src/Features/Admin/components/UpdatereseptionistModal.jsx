import { useState, useEffect } from "react";
export default function UpdateReceptionistModal({ receptionist, open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: receptionist?.firstName || "",
    lastName: receptionist?.lastName || "",
    email: receptionist?.email || "",
    phone: receptionist?.phone || "",
    isActive: receptionist?.isActive || true,
  });

  useEffect(() => {
    setFormData({
      firstName: receptionist?.firstName || "",
      lastName: receptionist?.lastName || "",
      email: receptionist?.email || "",
      phone: receptionist?.phone || "",
      isActive: receptionist?.isActive || true,
    });
  }, [receptionist]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center fixed inset-0 bg-black/50 backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Update Receptionist</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border rounded p-2"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            Active
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => onSubmit(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
