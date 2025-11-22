import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPrescription,
  updatePrescription,
  getPrescriptionById,
} from "../../../Api/Services/prescriptions.js";
import { useAuth } from "../../../Context/AuthContext.jsx";

const PrescriptionForm = ({
  prescriptionId = null,
  appointmentId,
  patientId,
  doctorId,
  onSuccess,
  onCancel,
}) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    appointment: appointmentId || "",
    patient: patientId || "",
    doctor: doctorId || "",
    medications: [
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        notes: "",
      },
    ],
    additionalNotes: "",
  });

  const { superUser } = useAuth();
  console.log(superUser);

  const [isEditMode, setIsEditMode] = useState(false);

  // Query for loading existing prescription
  const {
    data: existingPrescription,
    isLoading: loadingPrescription,
    error: loadError,
  } = useQuery({
    queryKey: ["prescription", prescriptionId],
    queryFn: () => getPrescriptionById(prescriptionId),
    enabled: !!prescriptionId,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createPrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
      onSuccess && onSuccess();
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updatePrescription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
      queryClient.invalidateQueries({
        queryKey: ["prescription", prescriptionId],
      });
      onSuccess && onSuccess();
    },
  });

  useEffect(() => {
    if (prescriptionId) {
      setIsEditMode(true);
    }
  }, [prescriptionId]);

  useEffect(() => {
    if (existingPrescription) {
      setFormData({
        appointment:
          existingPrescription.appointment?._id ||
          existingPrescription.appointment,
        patient:
          existingPrescription.patient?._id || existingPrescription.patient,
        doctor: existingPrescription.doctor?._id || existingPrescription.doctor,
        medications: existingPrescription.medications || [
          {
            name: "",
            dosage: "",
            frequency: "",
            duration: "",
            notes: "",
          },
        ],
        additionalNotes: existingPrescription.additionalNotes || "",
      });
    }
  }, [existingPrescription]);

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index][field] = value;
    setFormData({ ...formData, medications: updatedMedications });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        {
          name: "",
          dosage: "",
          frequency: "",
          duration: "",
          notes: "",
        },
      ],
    });
  };

  const removeMedication = (index) => {
    if (formData.medications.length > 1) {
      const updatedMedications = formData.medications.filter(
        (_, i) => i !== index
      );
      setFormData({ ...formData, medications: updatedMedications });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted with data:", formData);

    try {
      // Validate required fields
      if (!formData.patient || !formData.doctor) {
        alert("Please fill in patient and doctor information");
        throw new Error("Patient and doctor are required");
      }

      // Validate medications
      const validMedications = formData.medications.filter(
        (med) => med.name && med.dosage && med.frequency && med.duration
      );

      if (validMedications.length === 0) {
        alert(
          "Please add at least one complete medication (name, dosage, frequency, and duration are required)"
        );
        throw new Error("At least one complete medication is required");
      }

      // Build prescription data matching backend schema
      const prescriptionData = {
        patient: formData.patient,
        doctor: formData.doctor,
        medications: validMedications,
        additionalNotes: formData.additionalNotes,
      };

      // Only include appointment if it exists
      if (formData.appointment && formData.appointment.trim()) {
        prescriptionData.appointment = formData.appointment;
      }

      console.log("Sending prescription data:", prescriptionData);

      if (isEditMode) {
        await updateMutation.mutateAsync({
          id: prescriptionId,
          data: prescriptionData,
        });
        alert("Prescription updated successfully!");
      } else {
        await createMutation.mutateAsync(prescriptionData);
        alert("Prescription created successfully!");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      alert(`Error: ${err.message}`);
    }
  };

  const loading = createMutation.isPending || updateMutation.isPending;
  const error =
    createMutation.error?.message ||
    updateMutation.error?.message ||
    loadError?.message;

  if (loadingPrescription && isEditMode) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary-main"></div>
        <span className="ml-3 text-gray-600">Loading prescription...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {isEditMode ? "Edit Prescription" : "Create New Prescription"}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Prescription Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Patient ID *
              </label>
              <input
                type="text"
                name="patient"
                value={formData.patient}
                onChange={(e) =>
                  setFormData({ ...formData, patient: e.target.value })
                }
                placeholder="Enter patient ID"
                required
                readOnly={isEditMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none read-only:bg-gray-100"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Doctor ID *
              </label>
              <input
                type="text"
                name="doctor"
                value={superUser?._id}
                // onChange={(e) =>
                //   setFormData({ ...formData, doctor: e.target.value })
                // }
                disabled
                placeholder="Enter doctor ID"
                required
                readOnly={isEditMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none read-only:bg-gray-100"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Appointment ID
              </label>
              <input
                type="text"
                name="appointment"
                value={formData.appointment}
                onChange={(e) =>
                  setFormData({ ...formData, appointment: e.target.value })
                }
                placeholder="Enter appointment ID (optional)"
                readOnly={isEditMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none read-only:bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) =>
                setFormData({ ...formData, additionalNotes: e.target.value })
              }
              placeholder="Any additional notes for the prescription"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Medications Section */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Medications
          </h3>
          {formData.medications.map((medication, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 mb-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-700">
                  Medication {index + 1}
                </h4>
                {formData.medications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMedication(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Medication Name *
                  </label>
                  <input
                    type="text"
                    value={medication.name}
                    onChange={(e) =>
                      handleMedicationChange(index, "name", e.target.value)
                    }
                    placeholder="e.g., Amoxicillin"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    value={medication.dosage}
                    onChange={(e) =>
                      handleMedicationChange(index, "dosage", e.target.value)
                    }
                    placeholder="e.g., 500mg"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Frequency *
                  </label>
                  <select
                    value={medication.frequency}
                    onChange={(e) =>
                      handleMedicationChange(index, "frequency", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none"
                  >
                    <option value="">Select frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="Every 6 hours">Every 6 hours</option>
                    <option value="Every 8 hours">Every 8 hours</option>
                    <option value="Every 12 hours">Every 12 hours</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={medication.duration}
                    onChange={(e) =>
                      handleMedicationChange(index, "duration", e.target.value)
                    }
                    placeholder="e.g., 7 days, 2 weeks"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    value={medication.notes}
                    onChange={(e) =>
                      handleMedicationChange(index, "notes", e.target.value)
                    }
                    placeholder="Special instructions for this medication"
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none resize-y"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addMedication}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 mt-4"
          >
            Add Another Medication
          </button>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) =>
              setFormData({ ...formData, additionalNotes: e.target.value })
            }
            placeholder="General instructions or additional notes"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none resize-y"
          />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent-primary-main hover:bg-accent-primary-dark text-white rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Prescription"
              : "Create Prescription"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionForm;
