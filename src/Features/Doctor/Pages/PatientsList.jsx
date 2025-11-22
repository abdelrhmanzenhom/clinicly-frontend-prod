import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../../../Api/Services/patients.js";

const AddPatientModal = ({ onClose, onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    // User fields
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    // Patient fields
    dateOfBirth: "",
    gender: "male",
    bloodType: "A+",
    condition: "",
    // Address fields
    street: "",
    area: "",
    city: "",
    // Emergency contact fields
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "Family",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.street ||
      !formData.area ||
      !formData.city ||
      !formData.emergencyContactName ||
      !formData.emergencyContactPhone ||
      !formData.emergencyContactRelation
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate phone format (8-15 digits only)
    const phoneRegex = /^\d{8,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      alert("Phone number must be 8-15 digits");
      return;
    }

    // Validate emergency contact phone (8-15 digits only)
    if (!phoneRegex.test(formData.emergencyContactPhone.replace(/\D/g, ""))) {
      alert("Emergency contact phone must be 8-15 digits");
      return;
    }

    onSubmit({
      // User fields
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone.replace(/\D/g, ""), // Remove non-digits
      // Patient fields
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bloodType: formData.bloodType,
      condition: formData.condition,
      // Address
      address: {
        street: formData.street,
        area: formData.area,
        city: formData.city,
      },
      // Emergency contact
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone.replace(/\D/g, ""), // Remove non-digits
        relation: formData.emergencyContactRelation,
      },
    });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Patient</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Type
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical Condition
              </label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Hypertension, Diabetes"
              />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Address
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street *
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area *
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Emergency Contact
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name *
              </label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relation *
                </label>
                <select
                  name="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {isSubmitting ? "Adding..." : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Static patient data - this would typically come from an API
// const initialPatientsData = [
//   {
//     id: 1,
//     name: "Liam Harper",
//     age: 34,
//     gender: "Male",
//     phone: "+1 (555) 123-4567",
//     email: "liam.harper@email.com",
//     lastVisit: "2024-11-10",
//     condition: "Hypertension",
//     status: "Active",
//     bloodType: "A+",
//     points: 850,
//     avatar:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//     nextAppointment: {
//       date: "2024-11-20",
//       time: "10:30 AM",
//       type: "Follow-up",
//       doctor: "Dr. Emily Carter",
//     },
//     appointmentHistory: [
//       {
//         id: 1,
//         date: "2024-11-10",
//         time: "9:00 AM",
//         type: "Check-up",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Blood pressure stable, continue current medication",
//       },
//       {
//         id: 2,
//         date: "2024-10-15",
//         time: "2:30 PM",
//         type: "Consultation",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Initial consultation for hypertension management",
//       },
//       {
//         id: 3,
//         date: "2024-09-20",
//         time: "11:00 AM",
//         type: "Lab Work",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Blood work and cholesterol screening",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Olivia Bennett",
//     age: 28,
//     gender: "Female",
//     phone: "+1 (555) 234-5678",
//     email: "olivia.bennett@email.com",
//     lastVisit: "2024-11-12",
//     condition: "Diabetes Type 2",
//     status: "Active",
//     bloodType: "O-",
//     points: 1250,
//     avatar:
//       "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
//     nextAppointment: {
//       date: "2024-11-18",
//       time: "2:00 PM",
//       type: "Diabetes Management",
//       doctor: "Dr. Emily Carter",
//     },
//     appointmentHistory: [
//       {
//         id: 1,
//         date: "2024-11-12",
//         time: "1:30 PM",
//         type: "Follow-up",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Blood sugar levels improving, adjust medication dosage",
//       },
//       {
//         id: 2,
//         date: "2024-10-28",
//         time: "10:00 AM",
//         type: "Consultation",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Diabetes education and lifestyle counseling",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Noah Carter",
//     age: 45,
//     gender: "Male",
//     phone: "+1 (555) 345-6789",
//     email: "noah.carter@email.com",
//     lastVisit: "2024-11-08",
//     condition: "Asthma",
//     status: "Active",
//     bloodType: "B+",
//     points: 620,
//     avatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//     nextAppointment: {
//       date: "2024-11-25",
//       time: "3:15 PM",
//       type: "Pulmonary Function Test",
//       doctor: "Dr. Emily Carter",
//     },
//     appointmentHistory: [
//       {
//         id: 1,
//         date: "2024-11-08",
//         time: "3:00 PM",
//         type: "Check-up",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Asthma well controlled, continue current inhaler regimen",
//       },
//       {
//         id: 2,
//         date: "2024-09-15",
//         time: "11:30 AM",
//         type: "Emergency Visit",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Acute asthma exacerbation, treated with nebulizer",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Emma Wilson",
//     age: 32,
//     gender: "Female",
//     phone: "+1 (555) 456-7890",
//     email: "emma.wilson@email.com",
//     lastVisit: "2024-11-14",
//     condition: "Migraine",
//     status: "Active",
//     bloodType: "AB+",
//     points: 980,
//     avatar:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
//     nextAppointment: {
//       date: "2024-11-22",
//       time: "9:45 AM",
//       type: "Neurology Consultation",
//       doctor: "Dr. Emily Carter",
//     },
//     appointmentHistory: [
//       {
//         id: 1,
//         date: "2024-11-14",
//         time: "9:30 AM",
//         type: "Follow-up",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Migraine frequency reduced, continue preventive medication",
//       },
//     ],
//   },
//   {
//     id: 5,
//     name: "James Rodriguez",
//     age: 52,
//     gender: "Male",
//     phone: "+1 (555) 567-8901",
//     email: "james.rodriguez@email.com",
//     lastVisit: "2024-11-05",
//     condition: "Arthritis",
//     status: "Inactive",
//     bloodType: "O+",
//     points: 450,
//     avatar:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
//     nextAppointment: null,
//     appointmentHistory: [
//       {
//         id: 1,
//         date: "2024-11-05",
//         time: "4:00 PM",
//         type: "Check-up",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Joint pain assessment, prescribed anti-inflammatory medication",
//       },
//       {
//         id: 2,
//         date: "2024-08-15",
//         time: "2:15 PM",
//         type: "Physical Therapy Consultation",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Referred to physical therapy for joint mobility",
//       },
//     ],
//   },
//   {
//     id: 6,
//     name: "Sophia Martinez",
//     age: 29,
//     gender: "Female",
//     phone: "+1 (555) 678-9012",
//     email: "sophia.martinez@email.com",
//     lastVisit: "2024-11-13",
//     condition: "Anxiety",
//     status: "Active",
//     bloodType: "A-",
//     points: 1100,
//     avatar:
//       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
//     nextAppointment: {
//       date: "2024-11-19",
//       time: "1:00 PM",
//       type: "Therapy Session",
//       doctor: "Dr. Emily Carter",
//     },
//     appointmentHistory: [
//       {
//         id: 1,
//         date: "2024-11-13",
//         time: "1:00 PM",
//         type: "Mental Health Check-up",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Anxiety levels improving with medication and therapy",
//       },
//       {
//         id: 2,
//         date: "2024-10-30",
//         time: "10:30 AM",
//         type: "Initial Assessment",
//         doctor: "Dr. Emily Carter",
//         status: "Completed",
//         notes: "Anxiety disorder diagnosis, started on SSRI medication",
//       },
//     ],
//   },
// ];

// Custom hooks for TanStack Query
const usePatientsQuery = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    select: (data) => {
      console.log("Patients data from backend:", data);
      // Handle both array and object responses
      if (Array.isArray(data)) {
        return data;
      }
      if (
        data &&
        typeof data === "object" &&
        data.data &&
        Array.isArray(data.data)
      ) {
        return data.data;
      }
      return [];
    },
  });
};

const useAddPatientMutation = () => {
  return useMutation({
    mutationFn: createPatient,
    onSuccess: (newPatient) => {
      // Update the cache with the new patient
      queryClient.setQueryData(["patients"], (oldPatients) => {
        // Ensure oldPatients is an array
        if (!Array.isArray(oldPatients)) {
          return [newPatient];
        }
        return [...oldPatients, newPatient];
      });
      // Invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      console.error("Failed to add patient:", error);
    },
  });
};

const PatientsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);

  // Use TanStack Query hooks
  const { data: patients = [], isLoading, isError, error } = usePatientsQuery();
  const addPatientMutation = useAddPatientMutation();

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const name = patient.name?.toLowerCase() || "";
    const condition = patient.condition?.toLowerCase() || "";
    const email = patient.email?.toLowerCase() || "";
    const bloodType = patient.bloodType?.toLowerCase() || "";
    const appointmentType = patient.nextAppointment?.type?.toLowerCase() || "";
    const appointmentDate = patient.nextAppointment?.date?.toLowerCase() || "";

    return (
      name.includes(searchLower) ||
      condition.includes(searchLower) ||
      email.includes(searchLower) ||
      bloodType.includes(searchLower) ||
      appointmentType.includes(searchLower) ||
      appointmentDate.includes(searchLower)
    );
  });

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
  };

  const handleAddPatient = async (newPatientData) => {
    try {
      await addPatientMutation.mutateAsync(newPatientData);
      setShowAddPatientModal(false);
    } catch (error) {
      console.error("Failed to add patient:", error);
      // Handle error (show toast, etc.)
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading patients...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-6">
        <div className="text-red-600 text-xl mb-4">⚠️</div>
        <p className="text-red-600 font-semibold mb-2">
          Error Loading Patients
        </p>
        <p className="text-gray-600 text-sm mb-4">
          {error?.message || "Failed to load patients data"}
        </p>
        {error?.message?.includes("Failed to fetch") && (
          <p className="text-sm text-gray-500 mb-4">
            💡 Make sure the backend is running on http://localhost:5002
          </p>
        )}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (selectedPatient) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Patients
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Patient Details</h1>
        </div>

        {/* Patient Detail Card */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start gap-6">
              <img
                src={selectedPatient.avatar}
                alt={selectedPatient.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedPatient.name}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Age</p>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedPatient.age} years
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Gender</p>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedPatient.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedPatient.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedPatient.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Visit</p>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedPatient.lastVisit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Primary Condition
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedPatient.condition}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Blood Type</p>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedPatient.bloodType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Reward Points</p>
                    <p className="text-lg font-medium text-blue-600 flex items-center gap-1">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {selectedPatient.points} pts
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      selectedPatient.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedPatient.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule Appointment
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                View Medical History
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Next Appointment */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Next Appointment
            </h3>
            {selectedPatient.nextAppointment ? (
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedPatient.nextAppointment.type}
                    </p>
                    <p className="text-gray-600">
                      {selectedPatient.nextAppointment.doctor}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Scheduled
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {selectedPatient.nextAppointment.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {selectedPatient.nextAppointment.time}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    Reschedule
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p>No upcoming appointments</p>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule New Appointment
                </button>
              </div>
            )}
          </div>

          {/* Appointment History */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Appointment History
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {selectedPatient.appointmentHistory?.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border-l-4 border-green-500 pl-4 py-2"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {appointment.type}
                    </h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {appointment.doctor}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span>{appointment.date}</span>
                    <span>{appointment.time}</span>
                  </div>
                  {appointment.notes && (
                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                      {appointment.notes}
                    </p>
                  )}
                </div>
              ))}
              {(!selectedPatient.appointmentHistory ||
                selectedPatient.appointmentHistory.length === 0) && (
                <div className="text-center text-gray-500 py-8">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p>No appointment history available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
        <button
          onClick={() => setShowAddPatientModal(true)}
          disabled={addPatientMutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {addPatientMutation.isPending && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          Add New Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients by name, condition, email, blood type, or appointment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800">
              Total Patients
            </h3>
            <p className="text-2xl font-bold text-blue-900">
              {patients.length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">
              Active Patients
            </h3>
            <p className="text-2xl font-bold text-green-900">
              {patients.filter((p) => p.status === "Active").length}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-orange-800">
              Recent Visits
            </h3>
            <p className="text-2xl font-bold text-orange-900">
              {
                patients.filter(
                  (p) => new Date(p.lastVisit) > new Date("2024-11-10")
                ).length
              }
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800">
              Top Performer
            </h3>
            <p className="text-lg font-bold text-purple-900">
              {patients.length > 0
                ? patients.reduce(
                    (max, p) => (p.points > max.points ? p : max),
                    patients[0]
                  )?.name
                : "No patients"}
            </p>
            <p className="text-sm text-purple-700">
              {patients.length > 0
                ? patients.reduce(
                    (max, p) => (p.points > max.points ? p : max),
                    patients[0]
                  )?.points
                : 0}{" "}
              pts
            </p>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="flex-1 px-4 pb-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age/Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Appointment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reward Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient, index) => (
                <tr
                  key={patient._id || patient.id || `patient-${index}`}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handlePatientClick(patient)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {patient.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {patient.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.age} / {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.phone}</div>
                    <div className="text-sm text-gray-500">{patient.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.condition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      {patient.bloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.nextAppointment ? (
                      <div>
                        <div className="font-medium">
                          {patient.nextAppointment.date}
                        </div>
                        <div className="text-gray-500">
                          {patient.nextAppointment.time}
                        </div>
                        <div className="text-xs text-blue-600">
                          {patient.nextAppointment.type}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic">
                        No appointment
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {patient.points}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePatientClick(patient);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle edit action
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No patients found matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <AddPatientModal
          onClose={() => setShowAddPatientModal(false)}
          onSubmit={handleAddPatient}
          isSubmitting={addPatientMutation.isPending}
        />
      )}
    </div>
  );
};

export default PatientsList;
