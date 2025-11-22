import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatient } from "../../../Api/Services/UserMangementService";
import toast from "react-hot-toast";

export default function EditProfile({ patient }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    firstName: patient.userId.firstName || "",
    lastName: patient.userId.lastName || "",
    email: patient.userId.email || "",
    phone: patient.userId.phone || "",
    dateOfBirth: patient.dateOfBirth?.slice(0, 10) || "",
    gender: patient.gender || "",
    bloodType: patient.bloodType || "",
    emergencyContact: patient.emergencyContact || {
      name: "",
      relation: "",
      phone: "",
    },
    address: patient.address || { city: "", area: "", street: "" },
    insuranceProvider: patient.insuranceProvider || "",
    insuranceNumber: patient.insuranceNumber || "",
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updatePatient(id, data),
    onSuccess: () => {
      document.getElementById("editProfileModal").close();
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["patientProfile", patient._id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNestedChange = (e, section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [e.target.name]: e.target.value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id: patient._id, data: formData });
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Profile</h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 p-6 rounded-xl shadow"
      >
        {/* FIRST NAME */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">First Name</span>
          </label>
          <input
            type="text"
            name="firstName"
            className="input input-bordered"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* LAST NAME */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Last Name</span>
          </label>
          <input
            type="text"
            name="lastName"
            className="input input-bordered"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* EMAIL */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* PHONE */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">Phone</span>
          </label>
          <input
            type="text"
            name="phone"
            className="input input-bordered"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* DOB */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Date of Birth</span>
          </label>
          <input
            type="date"
            name="dateOfBirth"
            className="input input-bordered"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        {/* GENDER */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Gender</span>
          </label>
          <select
            name="gender"
            className="select select-bordered"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Choose gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* BLOOD TYPE */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">Blood Type</span>
          </label>
          <select
            name="bloodType"
            className="select select-bordered"
            value={formData.bloodType}
            onChange={handleChange}
          >
            <option value="">Choose</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* ADDRESS */}
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border">
          <h4 className="font-semibold mb-2">Address</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="input input-bordered"
              value={formData.address.city}
              onChange={(e) => handleNestedChange(e, "address")}
            />
            <input
              type="text"
              name="area"
              placeholder="Area"
              className="input input-bordered"
              value={formData.address.area}
              onChange={(e) => handleNestedChange(e, "address")}
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              className="input input-bordered"
              value={formData.address.street}
              onChange={(e) => handleNestedChange(e, "address")}
            />
          </div>
        </div>

        {/* EMERGENCY CONTACT */}
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border">
          <h4 className="font-semibold mb-2">Emergency Contact</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              value={formData.emergencyContact.name}
              onChange={(e) => handleNestedChange(e, "emergencyContact")}
            />
            <input
              type="text"
              name="relation"
              placeholder="Relation"
              className="input input-bordered"
              value={formData.emergencyContact.relation}
              onChange={(e) => handleNestedChange(e, "emergencyContact")}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="input input-bordered"
              value={formData.emergencyContact.phone}
              onChange={(e) => handleNestedChange(e, "emergencyContact")}
            />
          </div>
        </div>

        {/* INSURANCE */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Insurance Provider</span>
          </label>
          <input
            type="text"
            name="insuranceProvider"
            className="input input-bordered"
            value={formData.insuranceProvider}
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Insurance Number</span>
          </label>
          <input
            type="text"
            name="insuranceNumber"
            className="input input-bordered"
            value={formData.insuranceNumber}
            onChange={handleChange}
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="btn btn-primary md:col-span-2"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
