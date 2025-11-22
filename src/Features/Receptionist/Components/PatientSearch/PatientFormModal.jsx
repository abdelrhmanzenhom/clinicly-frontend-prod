import React, { useState } from "react";

export default function PatientFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "password123",
    role: "patient",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={isOpen}
        readOnly
      />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Create New Patient</h3>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Email (optional)"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              className="input input-bordered w-full"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                -- Select Gender --{" "}
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <div className="modal-action">
              <button type="button" className="btn" onClick={onClose}>
                Cancel
              </button>

              <button
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
