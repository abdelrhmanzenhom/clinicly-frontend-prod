import { useState, useEffect } from "react";

export default function UpdateDoctorModal({ doctor, open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    phone: "",
  });

  // Preload doctor data
  useEffect(() => {
    if (doctor) {
      setForm({
        firstName: doctor.userId.firstName || "",
        lastName: doctor.userId.lastName || "",
        email: doctor.userId.email || "",
        specialization: doctor.specialization || "",
        phone: doctor.userId.phone || "",
      });
    }
  }, [doctor]);

  if (!open || !doctor) return null;

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center fixed inset-0 bg-black/50 backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-fadeIn scale-95 transition-all">
        <h2 className="text-xl font-bold mb-4">Update Doctor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* FIRST NAME */}
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* SPECIALIZATION */}
          <div>
            <label className="block mb-1 font-medium">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      {/* Animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
