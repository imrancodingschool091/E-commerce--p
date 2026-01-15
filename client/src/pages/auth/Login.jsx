import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthState } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading, success, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  /* 🔁 Handle Input */
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* 🟢 Handle Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  /* ✅ Login success / error handling */
  useEffect(() => {
    if (success || isAuthenticated) {
      toast.success("Login successful 🛒");
      dispatch(resetAuthState());
      navigate("/"); // ✅ redirect to HOME (not dashboard)
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [success, isAuthenticated, error, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to continue shopping
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
