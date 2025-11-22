import React, { useState } from "react";
import PrescriptionForm from "./PrescriptionForm.jsx";
import { usePrescriptions } from "../../hooks/usePrescriptions.js";

const PrescriptionsList = ({ doctorId, viewMode = "doctor" }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Use the updated hook with TanStack Query
  const {
    prescriptions,
    loading,
    error,
    deletePrescriptionById,
    isDeleting,
    deleteError,
  } = usePrescriptions({
    doctorId: viewMode === "doctor" ? doctorId : undefined,
    patientId: viewMode === "patient" ? selectedPatientId : undefined,
    mode: viewMode,
  });

  const handleDelete = async (prescriptionId) => {
    if (!window.confirm("Are you sure you want to delete this prescription?")) {
      return;
    }

    await deletePrescriptionById(prescriptionId);
  };

  const handleEdit = (prescription) => {
    setEditingPrescription(prescription);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPrescription(null);
    // No need to manually refresh - TanStack Query handles this automatically
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPrescription(null);
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const patientName = prescription.patient?.name?.toLowerCase() || "";
    const doctorName = prescription.doctor?.name?.toLowerCase() || "";
    const medications =
      prescription.medications?.some((med) =>
        med.name.toLowerCase().includes(searchLower)
      ) || false;

    return (
      patientName.includes(searchLower) ||
      doctorName.includes(searchLower) ||
      medications
    );
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (showForm) {
    return (
      <PrescriptionForm
        prescriptionId={editingPrescription?._id}
        appointmentId={editingPrescription?.appointment?._id}
        patientId={editingPrescription?.patient?._id || selectedPatientId}
        doctorId={doctorId}
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          {viewMode === "patient"
            ? "Patient Prescriptions"
            : "My Prescriptions"}
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none min-w-[200px]"
          />

          {viewMode === "doctor" && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              New Prescription
            </button>
          )}
        </div>
      </div>

      {(error || deleteError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold mb-1">Error Loading Prescriptions</p>
          <p className="text-sm">{error || deleteError}</p>
          {error && error.includes("Cannot connect") && (
            <p className="text-sm mt-2">
              💡 <strong>Tip:</strong> Make sure your backend server is running.
              Try: <code className="bg-red-100 px-1 rounded">npm run dev</code>{" "}
              in your backend directory.
            </p>
          )}
          {doctorId === "69197f018658fc0c1900da1e" && (
            <p className="text-sm mt-2">
              💡 <strong>Note:</strong> Using test doctor ID. Please log in with
              a real doctor account to see prescriptions.
            </p>
          )}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary-main"></div>
          <p className="mt-4 text-gray-600">Loading prescriptions...</p>
        </div>
      ) : filteredPrescriptions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-500 text-lg">
            {searchTerm
              ? "No prescriptions match your search."
              : "No prescriptions found."}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Patient: {prescription.patient?.name || "Unknown Patient"}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Created: {formatDate(prescription.createdAt)}
                    </p>
                    {prescription.updatedAt !== prescription.createdAt && (
                      <p className="text-sm text-gray-500">
                        Updated: {formatDate(prescription.updatedAt)}
                      </p>
                    )}
                  </div>

                  {viewMode === "doctor" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(prescription)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                        title="Edit prescription"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prescription._id)}
                        disabled={isDeleting}
                        className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                        title="Delete prescription"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Medications:
                  </h4>
                  <div className="space-y-3">
                    {prescription.medications?.map((medication, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                      >
                        <div className="font-medium text-accent-primary-main mb-2">
                          {medication.name}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                          <span>Dosage: {medication.dosage}</span>
                          <span>Frequency: {medication.frequency}</span>
                          <span>Duration: {medication.duration}</span>
                        </div>
                        {medication.notes && (
                          <div className="text-sm text-gray-500 italic mt-2">
                            Notes: {medication.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {prescription.additionalNotes && (
                  <div className="mb-4 p-3 bg-amber-50 border-l-4 border-accent-warning-main rounded-r-lg">
                    <h4 className="font-medium text-gray-700 mb-1">
                      Additional Notes:
                    </h4>
                    <p className="text-sm text-gray-600">
                      {prescription.additionalNotes}
                    </p>
                  </div>
                )}

                <div className="border-t pt-4 text-right">
                  <small className="text-gray-500">
                    Doctor: {prescription.doctor?.name || "Unknown Doctor"}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionsList;
