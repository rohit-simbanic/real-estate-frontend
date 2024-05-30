"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";

type Props = {
  params: { id: string };
};

const AgentProfile = ({ params }: Props) => {
  const [agent, setAgent] = useState<any>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [newPassword, setNewPassword] = useState<string>("");

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          `https://backend-real-estate-m1zm.onrender.com/agent/${params.id}`
        );
        setAgent(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching agent data:", err);
      }
    };

    fetchAgent();
  }, [params.id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: any = value;

    if (type === "file" && e.target instanceof HTMLInputElement) {
      newValue = e.target.files ? e.target.files[0] : null;
    } else if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.put(
        `https://backend-real-estate-m1zm.onrender.com/agent/${params.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditMode(false);
      setAgent({ ...agent, ...response.data });
    } catch (err) {
      console.error("Error updating agent data:", err);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await axios.put(
        `https://backend-real-estate-m1zm.onrender.com/agent/${params.id}/reset-password`,
        {
          password: newPassword,
        }
      );
      setNewPassword("");
      alert("Password reset successfully");
    } catch (err) {
      console.error("Error resetting password:", err);
    }
  };

  if (!agent) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-20 my-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {editMode ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">
              Edit Profile
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="font-semibold">Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {/* Email */}
              <div className="flex flex-col">
                <label className="font-semibold">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="font-semibold">Phone Number:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {/* License Number */}
              <div className="flex flex-col">
                <label className="font-semibold">License Number:</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {/* Profile Picture */}
              <div className="flex flex-col">
                <label className="font-semibold">Profile Picture:</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </form>
            <button
              onClick={() => setEditMode(false)}
              className="mt-4 w-full bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">
              Agent Profile
            </h2>
            <div className="flex flex-col items-center space-y-4">
              {agent.profilePicture && (
                <Image
                  src={`https://backend-real-estate-m1zm.onrender.com${agent.profilePicture}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                  width={128}
                  height={128}
                />
              )}
              <p className="text-lg font-semibold">{agent.fullName}</p>
              <p className="text-lg">{agent.email}</p>
              <p className="text-lg">{agent.phoneNumber}</p>
              <p className="text-lg">{agent.licenseNumber}</p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit Profile
            </button>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Reset Password</h3>
              <div className="flex flex-col space-y-4">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handlePasswordReset}
                  className="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AgentProfile;
