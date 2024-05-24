"use client";

import React, { useState } from "react";
import axios from "axios";

const LoginAgent: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

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
        // You can store the token in localStorage or context for further use
        localStorage.setItem("token", response.data.token);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mx-auto min-[900px]:w-[50%]">
        <h2 className="text-2xl font-bold mb-6">Agent Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Login successful!</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAgent;
