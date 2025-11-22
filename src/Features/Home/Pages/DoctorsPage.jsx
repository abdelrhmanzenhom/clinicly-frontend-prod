import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "../../../Api/Services/doctorService";
import {
  Star,
  Calendar,
  Award,
  GraduationCap,
  MapPin,
  Search,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getAllDoctors(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-blue-600">Loading doctors...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading doctors</div>
      </div>
    );
  }

  const doctors = data?.doctors || [];

  // Filter doctors by name or specialization
  const filteredDoctors = doctors.filter((doctor) => {
    const searchLower = searchTerm.toLowerCase();
    const name = doctor.fullName?.toLowerCase() || "";
    const specialization = (
      doctor.specialization ||
      doctor.specialty ||
      ""
    ).toLowerCase();

    return name.includes(searchLower) || specialization.includes(searchLower);
  });

  return (
    <div className="max-w-7xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 my-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Home
      </Link>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Doctors</h1>
        <p className="text-lg text-gray-600">
          Meet our experienced medical professionals
        </p>
      </div>
      {/* Back Button */}

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mt-2 text-sm text-gray-500 text-center">
          {filteredDoctors.length} doctor
          {filteredDoctors.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor, index) => (
          <Link key={doctor._id} to={`/doctors/${doctor._id}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer"
            >
              {/* Profile Image */}
              <div className="flex items-start gap-4 mb-4">
                {doctor.profileImage && doctor.profileImage.trim() !== "" ? (
                  <img
                    src={doctor.profileImage}
                    alt={doctor.fullName}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                  />
                ) : doctor.userId?.profileImage &&
                  doctor.userId.profileImage.trim() !== "" ? (
                  <img
                    src={doctor.userId.profileImage}
                    alt={doctor.fullName}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-500">
                    <span className="text-2xl font-bold text-blue-600">
                      {doctor.fullName?.charAt(0) || "D"}
                    </span>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    Dr. {doctor.fullName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {doctor.specialization || doctor.specialty || "General"}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">
                      {doctor.rating
                        ? Number(doctor.rating).toFixed(1)
                        : "No rating"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">
                {/* Rank */}
                {doctor.rank && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>{doctor.rank}</span>
                  </div>
                )}

                {/* University */}
                {doctor.university && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>{doctor.university}</span>
                  </div>
                )}

                {/* Clinic */}
                {doctor.clinic && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{doctor.clinic}</span>
                  </div>
                )}

                {/* Experience */}
                {doctor.experienceYears && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{doctor.experienceYears} years experience</span>
                  </div>
                )}

                {/* Consultation Fee */}
                {(doctor.consultationFee || doctor.fees) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Consultation Fee:</span>
                      <span className="text-lg font-bold text-blue-600">
                        {doctor.consultationFee || doctor.fees} EGP
                      </span>
                    </div>
                  </div>
                )}

                {/* Available Days */}
                {doctor.availableDays && doctor.availableDays.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2">Available:</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.availableDays.map((day) => (
                        <span
                          key={day}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Working Hours */}
                {doctor.workingHours && (
                  <div className="mt-2 text-xs text-gray-600">
                    {doctor.workingHours.start} - {doctor.workingHours.end}
                  </div>
                )}
              </div>

              {/* Book Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/auth/login";
                }}
                className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Book Appointment
              </button>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm
              ? `No doctors found matching "${searchTerm}"`
              : "No doctors available"}
          </p>
        </div>
      )}
    </div>
  );
}
