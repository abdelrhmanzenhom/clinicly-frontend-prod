import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { signupPatient } from "../api/auth";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    emergencyName: "",
    emergencyRelation: "",
    phone: "",
    emergencyPhone: "",
    country: "Egypt",
    city: "",
    area: "",
    street: "",
    allergies: "",
    chronicConditions: "",
    insuranceProvider: "",
    insuranceNumber: "",
    profileImage: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const firstName = params.get("firstName") || "";
    const lastName = params.get("lastName") || "";
    const email = params.get("email") || "";
    const profileImage = params.get("profileImage") || "";

    setFormData((prev) => ({
      ...prev,
      firstName,
      lastName,
      email,
      profileImage,
    }));
  }, []);

  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: signupPatient,
    onSuccess: (data) => {
      toast.success("Signup successful!");
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Signup failed.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (formData.firstName.trim().length < 3)
      newErrors.firstName = "First name must be at least 3 characters.";
    if (formData.lastName.trim().length < 3)
      newErrors.lastName = "Last name must be at least 3 characters.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required.";
    }
    if (!formData.phone.match(/^[0-9]{8,15}$/))
      newErrors.phone = "Phone must be 8–15 digits.";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.bloodType) newErrors.bloodType = "Blood type is required.";
    if (!formData.emergencyName)
      newErrors.emergencyName = "Emergency name is required.";
    if (!formData.emergencyRelation)
      newErrors.emergencyRelation = "Emergency relation is required.";
    if (!formData.emergencyPhone.match(/^[0-9]{8,15}$/))
      newErrors.emergencyPhone = "Emergency phone must be 8–15 digits.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.area) newErrors.area = "Area is required.";
    if (!formData.street) newErrors.street = "Street is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      phone: formData.phone,
      bloodType: formData.bloodType,
      allergies: formData.allergies ? formData.allergies.split(",") : [],
      chronicConditions: formData.chronicConditions
        ? formData.chronicConditions.split(",")
        : [],
      emergencyContact: {
        name: formData.emergencyName,
        relation: formData.emergencyRelation,
        phone: formData.emergencyPhone,
      },
      address: {
        country: formData.country || "Egypt",
        city: formData.city,
        area: formData.area,
        street: formData.street,
      },
      insuranceProvider: formData.insuranceProvider || null,
      insuranceNumber: formData.insuranceNumber || null,
      profileImage: formData.profileImage || "",
    };

    mutation.mutate(payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Patient Signup</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <label>Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input w-full"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input w-full"
            />

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label>Phone*</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label>Password*</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* The rest is unchanged */}

          {/* Date of Birth */}
          <div>
            <label>Date of Birth*</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="input w-full"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label>Gender*</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>

          {/* Blood Type */}
          <div>
            <label>Blood Type*</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodType && (
              <p className="text-red-500 text-sm">{errors.bloodType}</p>
            )}
          </div>

          {/* Emergency Contact */}
          <div className="space-y-2">
            <label>Emergency Contact*</label>
            <input
              type="text"
              name="emergencyName"
              placeholder="Name"
              value={formData.emergencyName}
              onChange={handleChange}
              className="input w-full"
            />
            {errors.emergencyName && (
              <p className="text-red-500 text-sm">{errors.emergencyName}</p>
            )}
            <input
              type="text"
              name="emergencyRelation"
              placeholder="Relation"
              value={formData.emergencyRelation}
              onChange={handleChange}
              className="input w-full"
            />
            {errors.emergencyRelation && (
              <p className="text-red-500 text-sm">{errors.emergencyRelation}</p>
            )}
            <input
              type="text"
              name="emergencyPhone"
              placeholder="Phone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              className="input w-full"
            />
            {errors.emergencyPhone && (
              <p className="text-red-500 text-sm">{errors.emergencyPhone}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label>Address*</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="input w-full"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={formData.area}
              onChange={handleChange}
              className="input w-full"
            />
            {errors.area && (
              <p className="text-red-500 text-sm">{errors.area}</p>
            )}
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="input w-full"
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street}</p>
            )}
          </div>

          {/* Optional Fields */}
          <div>
            <label>Allergies (comma-separated)</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="input w-full"
            />
          </div>
          <div>
            <label>Chronic Conditions (comma-separated)</label>
            <input
              type="text"
              name="chronicConditions"
              value={formData.chronicConditions}
              onChange={handleChange}
              className="input w-full"
            />
          </div>
          <div>
            <label>Insurance Provider</label>
            <input
              type="text"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleChange}
              className="input w-full"
            />
          </div>
          <div>
            <label>Insurance Number</label>
            <input
              type="text"
              name="insuranceNumber"
              value={formData.insuranceNumber}
              onChange={handleChange}
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {mutation.isLoading ? "Signing up..." : "Signup"}
          </button>

          {/* Google Signup/Login */}
          <div className="flex justify-center my-4">
            <Link
              href="http://localhost:5000/api/oauth/google-login"
              className="flex items-center justify-center w-full max-w-md border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link to="/auth/login" className="text-center link ">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
