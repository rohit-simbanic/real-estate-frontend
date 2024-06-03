"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";

const LoginAgent: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        login(response.data.token, response.data.agentId);
        router.push("/admin");
      }
    } catch (err) {
      setError("Enter Valid Username or Password");
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className=" bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Agent Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Login successful!</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-1 text-gray-700"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19.5c-4.243 0-7.905-2.304-10-5.5a12.982 12.982 0 012.527-3.285M9.879 9.879l-4.242-4.242m5.364 5.364l4.243 4.243M12 5.5a7.968 7.968 0 013.727.91M12 5.5a7.968 7.968 0 00-3.727.91m3.727-.91v0m0 0c1.196.67 2.35 1.698 3.364 3.035m0 0L16.95 7.05M21 12.75a10.05 10.05 0 00-.875-4.95M4.22 4.22a1.003 1.003 0 00-1.416 1.415m1.415-1.415a1.003 1.003 0 011.416 1.416M4.22 4.22l16.56 16.56M4.22 4.22L1.414 1.414M22.384 9.616l-16.56-16.56"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.5C7.305 4.5 3.248 7.117 1.319 11.25 3.248 15.383 7.305 18 12 18s8.752-2.617 10.681-6.75C20.752 7.117 16.695 4.5 12 4.5zM12 16.5c-2.8 0-5.127-1.455-6.56-3.75C6.873 10.955 9.2 9.5 12 9.5s5.127 1.455 6.56 3.75C17.127 15.045 14.8 16.5 12 16.5zM12 7.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5S14.5 7.5 12 7.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAgent;
