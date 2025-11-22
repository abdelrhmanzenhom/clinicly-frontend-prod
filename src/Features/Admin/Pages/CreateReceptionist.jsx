import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createReceptionist } from "../../../Api/Services/receptionistService";

export default function CreateReceptionist() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const mutation = useMutation({
    mutationFn: createReceptionist,
    onSuccess: () => {
      setMessage("Receptionist created successfully!");
    },
    onError: (error) => {
      setMessage(
        error.response?.data?.message || "Failed to create receptionist."
      );
    },
  });

  const onSubmit = (data) => {
    setMessage("");

    mutation.mutate({
      ...data,
      profileImage: imageURL,
      role: "receptionist",
    });
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

      if (result.secure_url) {
        setImageURL(result.secure_url);
        setUploadMessage("Image uploaded successfully!");
      } else {
        setUploadMessage("Failed to upload image.");
      }
    } catch (err) {
      setUploadMessage("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create Receptionist</h1>

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
        {/* GRID FIELDS */}
        <div className="grid grid-cols-2 gap-4">
          {/* FIRST NAME */}
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

          {/* LAST NAME */}
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

          {/* EMAIL */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* PHONE */}
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              {...register("phone", { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.phone && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* PASSWORD */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full border p-2 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Min 6 characters</p>
            )}
          </div>

          {/* SHIFT */}
          <div>
            <label className="block mb-1 font-medium">Shift</label>
            <select
              {...register("shift", { required: true })}
              className="w-full border p-2 rounded"
            >
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>

          {/* DEPARTMENT */}
          <div>
            <label className="block mb-1 font-medium">Department</label>
            <input
              type="text"
              {...register("department")}
              defaultValue="Front Desk"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* PHONE EXTENSION */}
          <div>
            <label className="block mb-1 font-medium">Phone Extension</label>
            <input
              type="text"
              {...register("phoneExtension")}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* ACTIVE STATUS */}
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              {...register("isActive")}
              defaultChecked
              className="w-4 h-4"
            />
            <label className="font-medium">Active</label>
          </div>
        </div>

        {/* IMAGE UPLOAD */}
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
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={mutation.isLoading || uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {mutation.isLoading ? "Creating..." : "Create Receptionist"}
        </button>
      </form>
    </div>
  );
}
