import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDoctors,
  getAllPatients,
  deleteDoctor,
  deletePatient,
  updateDoctor,
  updatePatient,
  getAllReseptionists,
  updateReceptionist,
  deleteReceptionist,
} from "../../../Api/Services/UserMangementService";
import UpdateDoctorModal from "../components/UpdateDoctorModal";
import UpdatePatientModal from "../components/UpdatePatientModal";
import UpdateReceptionistModal from "../components/UpdatereseptionistModal";

export default function UsersManagement() {
  //const queryClient=new QueryClient();
  const queryClient = useQueryClient();
  const [showDoctors, setShowDoctors] = useState(false);
  const [showPatients, setShowPatients] = useState(false);
  const [status, setStatus] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openPatientModal, setOpenPatientModal] = useState(false);
  const [selectedReceptionist, setSelectedReceptionist] = useState(null);
  const [openReceptionistModal, setOpenReceptionistModal] = useState(false);
  const [showReceptionists, setShowReceptionists] = useState(false);

  // Fetch doctors
  const { data: doctorsData, isLoading: doctorsLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });
  const { data: receptionistsData, isLoading: receptionistsLoading } = useQuery(
    {
      queryKey: ["receptionists"],
      queryFn: getAllReseptionists, // make sure this returns {data: [...]}
    }
  );

  /* const handleDelete = (userId, role) => {
    if (window.confirm("Are you sure you want to delete this " + role + "?")) {
      if(role==="patient"){
        deletePatient(userId);
      } else {
        deleteDoctor(userId);
      }
    }
  }; */
  // Fetch patients
  const { data: patientsData, isLoading: patientsLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  });

  const patientMutation = useMutation({
    // mutationKey: ["patientDelete"],
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
      setStatus("success");
    },
    onError: (err) => {
      console.error(err.message);
      setStatus("error");
    },
  });

  const doctorMutation = useMutation({
    // mutationKey: ["patientDelete"],
    mutationFn: deleteDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors"]);
      setStatus("success");
    },
    onError: (err) => {
      console.error(err.message);
      setStatus("error");
    },
  });
  // Delete user + doctor/patient

  const updateDoctorMutation = useMutation({
    mutationFn: ({ doctorId, updateData }) =>
      updateDoctor(doctorId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors"]);
      setStatus("success");
    },
    onError: () => setStatus("error"),
  });

  const updatePatientMutation = useMutation({
    mutationFn: ({ patientId, updateData }) =>
      updatePatient(patientId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
      setStatus("success");
    },
    onError: () => setStatus("error"),
  });

  const deleteReceptionistMutation = useMutation({
    mutationFn: deleteReceptionist, // you should add this in your service
    onSuccess: () => queryClient.invalidateQueries(["receptionists"]),
  });

  const updateReceptionistMutation = useMutation({
    mutationFn: ({ receptionistId, updateData }) =>
      updateReceptionist(receptionistId, updateData),
    onSuccess: () => queryClient.invalidateQueries(["receptionists"]),
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Users Management</h1>

      {/* Doctors Section */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <button
          onClick={() => setShowDoctors(!showDoctors)}
          className="flex justify-between items-center w-full text-left text-xl font-semibold text-gray-800 hover:text-gray-900 transition-colors"
        >
          <span>Doctors</span>
          <span className="text-gray-500">{showDoctors ? "▲" : "▼"}</span>
        </button>

        {showDoctors && (
          <div className="mt-4 space-y-4">
            {doctorsLoading ? (
              <p className="text-gray-500 text-center py-4">
                Loading doctors...
              </p>
            ) : doctorsData?.doctors?.length ? (
              doctorsData.doctors.map(
                (doc) =>
                  doc.userId.isActive && (
                    <div
                      key={doc._id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      {/* Doctor Info */}
                      {/* Doctor Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-2 border-b hover:bg-gray-50 rounded-lg transition w-full">
                        {/* Profile Image */}
                        <div className="w-14 h-14 flex-shrink-0">
                          <img
                            src={
                              doc.userId.profileImage || "/default-avatar.png"
                            } // fallback image
                            alt={`${doc.userId.firstName} ${doc.userId.lastName}`}
                            className="w-full h-full object-cover rounded-full border border-gray-200 shadow-sm"
                          />
                        </div>

                        {/* Name, Specialization, Email, Phone */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-1 min-w-0">
                          <div className="font-medium text-gray-800 text-lg truncate">
                            {doc.userId.firstName} {doc.userId.lastName}
                          </div>
                          <div className="text-gray-600 truncate">
                            {doc.specialization}
                          </div>
                          <div className="text-gray-500 text-sm truncate">
                            {doc.userId.email}
                          </div>
                          <div className="text-gray-500 text-sm truncate">
                            {doc.userId.phone || "N/A"}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-2 sm:mt-0">
                          <button
                            onClick={() => {
                              setSelectedDoctor(doc);
                              setOpenModal(true);
                            }}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => doctorMutation.mutate(doc._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )
              )
            ) : (
              <p className="text-gray-500 text-center py-4">
                No doctors found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Patients Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <button
          onClick={() => setShowPatients(!showPatients)}
          className="font-medium text-lg mb-2 w-full text-left"
        >
          Patients {showPatients ? "▲" : "▼"}
        </button>

        {showPatients && (
          <div className="space-y-2 mt-2">
            {patientsLoading ? (
              <p>Loading patients...</p>
            ) : patientsData?.data?.length ? (
              patientsData.data.map(
                (patient) =>
                  patient.userId.isActive && (
                    <div
                      key={patient._id}
                      className="flex justify-between items-center border-b p-2"
                    >
                      <div>
                        {patient.userId.firstName} {patient.userId.lastName} —{" "}
                        {patient.userId.email}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedPatient(patient);
                            setOpenPatientModal(true);
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => patientMutation.mutate(patient._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
              )
            ) : (
              <p>No patients found.</p>
            )}
          </div>
        )}
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <button
          onClick={() => setShowReceptionists(!showReceptionists)}
          className="font-medium text-lg mb-2 w-full text-left"
        >
          Receptionists {showReceptionists ? "▲" : "▼"}
        </button>

        {showReceptionists && (
          <div className="space-y-2 mt-2">
            {receptionistsLoading ? (
              <p>Loading receptionists...</p>
            ) : receptionistsData?.data?.length ? (
              receptionistsData.data.map(
                (rec) =>
                  rec.isActive && (
                    <div
                      key={rec._id}
                      className="flex justify-between items-center border-b p-2"
                    >
                      <div>
                        {rec.firstName} {rec.lastName} — {rec.email} —{" "}
                        {rec.phone}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedReceptionist(rec);
                            setOpenReceptionistModal(true);
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() =>
                            deleteReceptionistMutation.mutate(rec._id)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
              )
            ) : (
              <p>No receptionists found.</p>
            )}
          </div>
        )}
      </div>

      <UpdateDoctorModal
        doctor={selectedDoctor}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(data) =>
          updateDoctorMutation.mutate({
            doctorId: selectedDoctor._id,
            updateData: data,
          })
        }
      />
      <UpdatePatientModal
        patient={selectedPatient}
        open={openPatientModal}
        onClose={() => setOpenPatientModal(false)}
        onSubmit={(data) =>
          updatePatientMutation.mutate({
            patientId: selectedPatient._id,
            updateData: data,
          })
        }
      />
      <UpdateReceptionistModal
        receptionist={selectedReceptionist}
        open={openReceptionistModal}
        onClose={() => setOpenReceptionistModal(false)}
        onSubmit={(data) => {
          updateReceptionistMutation.mutate({
            receptionistId: selectedReceptionist._id,
            updateData: data,
          });
          setOpenReceptionistModal(false);
        }}
      />
    </div>
  );
}
