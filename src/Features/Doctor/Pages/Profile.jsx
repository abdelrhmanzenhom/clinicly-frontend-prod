import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProfileInfo from "../Layout/ProfileInfo";
import { getAllDoctors } from "../../../Api/Services/doctorService";
import { useAuth } from "../../../Context/AuthContext";

export default function Profile() {
  const { user, loading } = useAuth();

  const userId = user?._id || user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctorProfile", userId],
    queryFn: () => getAllDoctors(),
    enabled: !!userId && !loading,
  });


  // Show loading state - wait for both auth and query
  if (loading || isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-500 text-xl">
        Loading profile...
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Error loading profile
      </div>
    );
  }

  // Extract doctor data from response: { count: 13, doctors: [...] }
  let doctorData = null;

  if (data?.doctors && Array.isArray(data.doctors)) {
    console.log("Looking for userId:", userId);
    console.log(
      "Available doctor userIds:",
      data.doctors.map((d) => ({
        doctorId: d._id,
        userId: d.userId?._id,
        fullName: d.fullName,
      }))
    );

    // Find the doctor where userId._id matches the logged-in user's id or _id
    doctorData = data.doctors.find((doc) => doc.userId?._id === userId);
    console.log("Found doctor:", doctorData);
  }

  // Check if data exists
  if (!doctorData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        No doctor profile found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <ProfileInfo doctor={doctorData} />
      </div>
    </div>
  );
}
