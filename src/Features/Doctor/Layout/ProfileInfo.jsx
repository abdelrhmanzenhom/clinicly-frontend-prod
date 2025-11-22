import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  Award,
  Clock,
} from "lucide-react";
import { getDoctorHistory } from "../../../Api/Services/doctorService";

export default function ProfileInfo({ doctor }) {
  const {
    data: history = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["doctorHistory", doctor],
    queryFn: () => getDoctorHistory(doctor._id),
  });


  const formatAvailableDays = (days) => {
    if (!days || days.length === 0) return "Not specified";
    return days.join(", ");
  };

  const formatRating = (rating) => {
    if (!rating) return "No rating yet";
    return `${rating.toFixed(1)} / 5.0`;
  };

  const formatTime = (time) => {
    if (!time) return "Not specified";
    return time;
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        {doctor.profileImage && doctor.profileImage.trim() !== "" ? (
          <img
            src={doctor.profileImage}
            alt={doctor.fullName}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        ) : doctor.userId?.profileImage &&
          doctor.userId.profileImage.trim() !== "" ? (
          <img
            src={doctor.userId.profileImage}
            alt={doctor.fullName}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-500">
            <User className="w-12 h-12 text-blue-600" />
          </div>
        )}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Dr. {doctor.fullName}
          </h2>
          <p className="text-gray-600">
            {doctor.specialization || doctor.specialty}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">First Name:</span>{" "}
          {doctor.fullName?.split(" ")[0] || "Not specified"}
        </p>
        <p className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">Last Name:</span>{" "}
          {doctor.fullName?.split(" ").slice(1).join(" ") || "Not specified"}
        </p>
        <p className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">Email:</span> {doctor.userId?.email}
        </p>
        <p className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">Phone:</span> {doctor.userId?.phone}
        </p>
        <p className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">Specialization:</span>{" "}
          {doctor.specialization || doctor.specialty || "Not specified"}
        </p>
        <p className="flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">Rank:</span>{" "}
          {doctor.rank || "Not specified"}
        </p>
        <p className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">University:</span>{" "}
          {doctor.university || "Not specified"}
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">Experience (Years):</span>{" "}
          {doctor.experienceYears || "Not specified"}
        </p>
        <p className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">Consultation Fee:</span>{" "}
          {doctor.consultationFee || doctor.fees
            ? `${doctor.consultationFee || doctor.fees} EGP`
            : "Not specified"}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">Clinic:</span>{" "}
          {doctor.clinic || "Not specified"}
        </p>
        <p className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold">Rating:</span>{" "}
          {formatRating(doctor.rating)}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Available Days
        </h3>
        <div className="flex flex-wrap gap-2">
          {doctor.availableDays && doctor.availableDays.length > 0 ? (
            doctor.availableDays.map((day) => (
              <span
                key={day}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {day}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No available days specified</span>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Start Time
          </h3>
          <p className="text-gray-700 bg-gray-50 px-4 py-2 rounded">
            {formatTime(doctor.workingHours?.start || doctor.startTime)}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            End Time
          </h3>
          <p className="text-gray-700 bg-gray-50 px-4 py-2 rounded">
            {formatTime(doctor.workingHours?.end || doctor.endTime)}
          </p>
        </div>
      </div>

      {doctor.bio && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Bio</h3>
          <p className="text-gray-700">{doctor.bio}</p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Appointment History
        </h3>
        {history.length > 0 ? (
          history.map((appointment) => (
            <div
              key={appointment._id}
              className="flex p-4 border border-gray-400 mb-2 rounded"
            >
              <div>
                <h3>
                  Date: {format(new Date(appointment.startTime), "dd/MM/yyyy")}
                </h3>
                <h3>Patient: {appointment.patientInfo.fullName}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 p-4 mt-8">
            No appointment history.
          </p>
        )}
      </div>
    </div>
  );
}
