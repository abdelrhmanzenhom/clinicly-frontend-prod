import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createDoctor } from "../../../Api/Services/DoctorService";
import Select from "react-select";

const universityOptions = [
  { value: "Cairo University", label: "Cairo University" },
  { value: "Ain Shams University", label: "Ain Shams University" },
  { value: "Alexandria University", label: "Alexandria University" },
  { value: "Mansoura University", label: "Mansoura University" },
  { value: "Assiut University", label: "Assiut University" },
  { value: "Zagazig University", label: "Zagazig University" },
  { value: "Helwan University", label: "Helwan University" },
  { value: "Benha University", label: "Benha University" },
  { value: "Tanta University", label: "Tanta University" },
  { value: "Suez Canal University", label: "Suez Canal University" },
  { value: "Beni-Suef University", label: "Beni-Suef University" },
  { value: "South Valley University", label: "South Valley University" },
  { value: "Fayoum University", label: "Fayoum University" },
  { value: "Minia University", label: "Minia University" },
  { value: "Kafr El-Sheikh University", label: "Kafr El-Sheikh University" },
  { value: "Menoufia University", label: "Menoufia University" },
  { value: "Port Said University", label: "Port Said University" },
  { value: "Sohag University", label: "Sohag University" },
  { value: "Damietta University", label: "Damietta University" },
  {
    value: "American University in Cairo (AUC)",
    label: "American University in Cairo (AUC)",
  },
];

export default function CreateDoctor() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState(""); // store uploaded image
  const [uploading, setUploading] = useState(false); // show uploading state
  const [uploadMessage, setUploadMessage] = useState("");
  // TanStack mutation
  const mutation = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      setMessage("Doctor created successfully!");
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Failed to create doctor.");
    },
  });

  const onSubmit = (data) => {
    setMessage("");

    mutation.mutate({ ...data, role: "doctor", profileImage: imageURL });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "zenhom_upload");
      formData.append("cloud_name", "dprhixbik");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dprhixbik/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      console.log(result);
      if (result.secure_url) {
        setImageURL(result.secure_url);
        setUploadMessage("Image uploaded successfully!");
      } else {
        setUploadMessage("Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      setUploadMessage("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create Doctor</h1>

      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            mutation.isError
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">Required</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              {...register("phone", { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.phone && <p className="text-red-500 text-sm">Required</p>}
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full border p-2 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Min 6 chars</p>
            )}
          </div>

          {/* Doctor info */}
          <div>
            <label className="block mb-1 font-medium">Specialization</label>
            <input
              type="text"
              {...register("specialization", { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.specialization && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Rank</label>
            <select
              {...register("rank", { required: true })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Rank</option>
              <option value="Attending Physician">Attending Physician</option>
              <option value="Specialist">Specialist</option>
              <option value="Consultant">Consultant</option>
            </select>
            {errors.rank && <p className="text-red-500 text-sm">Required</p>}
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">University</label>

            <Select
              options={universityOptions}
              placeholder="Select your university"
              isSearchable
              className="w-full"
              onChange={(selected) => setValue("university", selected.value)}
            />

            {errors.university && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Experience (Years)</label>
            <input
              type="number"
              {...register("experienceYears", { required: true, min: 0 })}
              className="w-full border p-2 rounded"
            />
            {errors.experienceYears && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Consultation Fee</label>
            <input
              type="number"
              {...register("consultationFee", { required: true, min: 0 })}
              className="w-full border p-2 rounded"
            />
            {errors.consultationFee && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Clinic</label>
            <input
              type="text"
              {...register("clinic")}
              placeholder="Clinic #1"
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Available Days</label>

            <div className="grid grid-cols-2 gap-2 p-3 border rounded-lg bg-gray-50">
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <label key={day} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={day}
                    {...register("availableDays", { required: true })}
                    className="w-4 h-4"
                  />
                  {day}
                </label>
              ))}
            </div>

            {errors.availableDays && (
              <p className="text-red-500 text-sm mt-1">Required</p>
            )}
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Start Time</label>
              <input
                type="time"
                {...register("workingHours.start", { required: true })}
                className="w-full border p-2 rounded"
              />
              {errors.workingHours?.start && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">End Time</label>
              <input
                type="time"
                {...register("workingHours.end", { required: true })}
                className="w-full border p-2 rounded"
              />
              {errors.workingHours?.end && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={handleFileUpload}
          />
          {uploading && (
            <p className="text-blue-500 text-sm mt-1">Uploading...</p>
          )}
          {uploadMessage && (
            <p
              className={`text-sm mt-1 ${
                imageURL ? "text-green-600" : "text-red-600"
              }`}
            >
              {uploadMessage}
            </p>
          )}
          {imageURL && (
            <img
              src={imageURL}
              alt="Uploaded"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading || uploading} // disable if uploading
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {mutation.isLoading ? "Creating..." : "Create Doctor"}
        </button>
      </form>
    </div>
  );
}
