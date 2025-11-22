import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProfileInfo from "../components/ProfileInfo";
import { getAllPatients } from "../../../Api/Services/PatientService";
import { useAuth } from "../../../Context/AuthContext";
import EditProfile from "../components/EditProfile";
// import { getAllPatients } from "../../../Api/Services/patients";

export default function Profile() {
  const { user, loading } = useAuth();
  console.log("profile", user);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-500 text-xl">
        Loading profile...
      </div>
    );

  const patientId = user._id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patientProfile", patientId],
    queryFn: () => getAllPatients(patientId),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-500 text-xl">
        Loading profile...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Error loading profile
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
          {/* <ProfileAvatar imageUrl={data.imageUrl} /> */}
          <div className="flex-1">
            <ProfileInfo patient={data.data[0]} />

            {/* MODAL (Hidden, controlled via dialog) */}
            <dialog id="editProfileModal" className="modal">
              <div className="modal-box max-w-3xl">
                <h3 className="font-bold text-xl mb-4">Edit Profile</h3>
                <EditProfile patient={data.data[0]} />
                <div className="modal-action">
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("editProfileModal").close()
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
