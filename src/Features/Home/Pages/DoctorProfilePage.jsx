import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getDoctorById } from "../../../Api/Services/doctorService";
import {
  Star,
  Calendar,
  Award,
  GraduationCap,
  MapPin,
  DollarSign,
  Clock,
  User,
  ArrowLeft,
  Stethoscope,
} from "lucide-react";

export default function DoctorProfilePage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-blue-600">Loading doctor profile...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading doctor profile</div>
      </div>
    );
  }

  const doctor = data;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Doctors
        </Link>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            {doctor.profileImage && doctor.profileImage.trim() !== "" ? (
              <img
                src={doctor.profileImage}
                alt={doctor.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
            ) : doctor.userId?.profileImage &&
              doctor.userId.profileImage.trim() !== "" ? (
              <img
                src={doctor.userId.profileImage}
                alt={doctor.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-500">
                <User className="w-16 h-16 text-blue-600" />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Dr. {doctor.fullName}
              </h1>
              <p className="text-xl text-gray-600 mb-3">
                {doctor.specialization || doctor.specialty || "General"}
              </p>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {doctor.rating
                    ? Number(doctor.rating).toFixed(1)
                    : "No rating"}
                </span>
              </div>
            </div>
          </div>

          {/* Doctor Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Specialization */}
            {(doctor.specialization || doctor.specialty) && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Stethoscope className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-semibold text-gray-900">
                    {doctor.specialization || doctor.specialty}
                  </p>
                </div>
              </div>
            )}

            {/* Rank */}
            {doctor.rank && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Rank</p>
                  <p className="font-semibold text-gray-900">{doctor.rank}</p>
                </div>
              </div>
            )}

            {/* University */}
            {doctor.university && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">University</p>
                  <p className="font-semibold text-gray-900">
                    {doctor.university}
                  </p>
                </div>
              </div>
            )}

            {/* Experience */}
            {doctor.experienceYears && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-semibold text-gray-900">
                    {doctor.experienceYears} years
                  </p>
                </div>
              </div>
            )}

            {/* Clinic */}
            {doctor.clinic && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Clinic</p>
                  <p className="font-semibold text-gray-900">{doctor.clinic}</p>
                </div>
              </div>
            )}

            {/* Consultation Fee */}
            {(doctor.consultationFee || doctor.fees) && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                  <p className="font-semibold text-gray-900">
                    {doctor.consultationFee || doctor.fees} EGP
                  </p>
                </div>
              </div>
            )}

            {/* Working Hours */}
            {doctor.workingHours && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Working Hours</p>
                  <p className="font-semibold text-gray-900">
                    {doctor.workingHours.start} - {doctor.workingHours.end}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Available Days */}
          {doctor.availableDays && doctor.availableDays.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Available Days
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.availableDays.map((day) => (
                  <span
                    key={day}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Book Appointment Button */}
          <Link to="/auth/login">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
              Book Appointment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
