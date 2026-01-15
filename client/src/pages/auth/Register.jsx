import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthState } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading, success } = useSelector((state) => state.auth);

  /* 🔁 Handle Input */
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* 🟢 Handle Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  /* ✅ Register success / error handling */
  useEffect(() => {
    if (success) {
      toast.success("Account created successfully 🎉");
      dispatch(resetAuthState());
      navigate("/login"); // ✅ redirect to login
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [success, error, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account 🛍️
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Join us and start shopping
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
              placeholder="John Doe"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              placeholder="you@example.com"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              placeholder="••••••••"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
