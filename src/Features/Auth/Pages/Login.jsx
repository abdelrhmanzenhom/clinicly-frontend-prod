import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginPatient } from "../Api/auth"; // Your API function
import toast from "react-hot-toast";
import { Link, redirect, useNavigate } from "react-router";
import { useAuth } from "../../../Context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [googlePrefill, setGooglePrefill] = useState(false); // flag to disable prefilled fields
  const navigate = useNavigate();
  const { login } = useAuth();

  // Check for Google redirect params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email") || "";
    const firstName = params.get("firstName") || "";
    const lastName = params.get("lastName") || "";
    const profileImage = params.get("profileImage") || "";

    if (email) {
      setFormData((prev) => ({ ...prev, email }));
      setGooglePrefill(true); // disable email input
    }

    if (token) {
      // User already exists → auto login
      localStorage.setItem("accessToken", token);
      toast.success(`Welcome back ${firstName}`);
      window.location.href = "/"; // redirect to dashboard or home
    }
  }, []);

  const mutation = useMutation({
    mutationFn: loginPatient,
    onSuccess: (data) => {
      // localStorage.setItem("accessToken", data.accessToken);
      console.log(data);
      login(data);
      toast.success("Login successful!");
      if (data.user.role === "patient") navigate("/patient");
      if (data.user.role === "doctor") navigate("/doctor");
      if (data.user.role === "receptionist") navigate("/receptionist");
      // window.location.href = "/"; // redirect to dashboard
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed.");
    },
  });

  console.log(mutation.data);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-[var(--color-bg-light-primary)] p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-accent-primary-main)] text-center">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input w-full"
              required
              disabled={googlePrefill} // disable if prefilled from Google
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input w-full"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[var(--color-accent-primary-main)] text-white py-2 rounded hover:bg-[var(--color-accent-primary-dark)] transition"
          >
            {mutation.isLoading ? "Logging in..." : "Login"}
          </button>
          {/* Google login */}
          <div className="flex justify-center my-4">
            <a
              href={`${import.meta.env.VITE_BASE_URL}/oauth/google-login`}
              className="flex items-center justify-center w-full max-w-md border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </a>
          </div>
          <div className="mt-4 text-center">
            <Link to="/auth/signup" className="text-center link ">
              Not registered yet? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
