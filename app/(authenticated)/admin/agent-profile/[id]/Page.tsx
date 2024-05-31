"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import ButtonLogin from "@/components/button/button-login";

type Props = {
  params: { id: string };
};

const AgentProfile = ({ params }: Props) => {
  const [agent, setAgent] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [newPassword, setNewPassword] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("profile");

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/agent/${params.id}`
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
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/agent/${params.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAgent({ ...agent, ...response.data });
      setActiveTab("profile");
    } catch (err) {
      console.error("Error updating agent data:", err);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await axios.put(
        `http://localhost:5000/agent/${params.id}/reset-password`,
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

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  if (!agent)
    return (
      <div className="text-center max-w-xs mx-auto py-10">
        <h2>Please login now to get access to your new account</h2>
        <ButtonLogin href={"/admin/login"} />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-20 my-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4">
            <button
              className={`py-2 px-4 ${
                activeTab === "profile"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Details
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "edit"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("edit")}
            >
              Edit Profile
            </button>
          </nav>
        </div>

        {activeTab === "profile" && (
          <div className="flex flex-col items-center space-y-4 mt-6">
            {agent.profilePicture ? (
              <Image
                src={`http://localhost:5000${agent.profilePicture}`}
                alt="Profile"
                className="w-32 h-32 rounded-full"
                width={128}
                height={128}
              />
            ) : (
              <div className="initial-circle flex items-center justify-center w-32 h-32 bg-purple-700 text-white rounded-full text-2xl font-bold">
                {getInitial(agent.fullName)}
              </div>
            )}
            <p className="text-lg font-semibold">Name: {agent.fullName}</p>
            <p className="text-lg">
              <span className="font-bold">Email: </span>
              {agent.email}
            </p>
            <p className="text-lg">
              <span className="font-bold">Phone: </span>
              {agent.phoneNumber}
            </p>
            <p className="text-lg">
              <span className="font-bold">License no:</span>
              {agent.licenseNumber}
            </p>
            <p className="text-lg">
              <span className="font-bold">Agency Name:</span>
              {agent.agencyName}
            </p>
            <p className="text-lg">
              <span className="font-bold">Agency Address:</span>
              {agent.agencyAddress}
            </p>
            <p className="text-lg">
              <span className="font-bold">Year of Experience:</span>{" "}
              {agent.yearsOfExperience}
            </p>
            <p className="text-lg">
              <span className="font-bold">Specializations:</span>
              {agent.specializations}
            </p>
            <p className="text-lg">
              <span className="font-bold">Govt ID:</span>
              {agent.governmentID}
            </p>
            <p className="text-lg">
              <span className="font-bold">Linkedin Profile:</span>
              {agent.linkedInProfile}
            </p>
            <p className="text-lg">
              <span className="font-bold">Website:</span> {agent.website}
            </p>
            <p className="text-lg">
              <span className="font-bold">Marteting preferences?:</span>
              {agent.marketingPreferences}
            </p>
            <p className="text-lg">
              <span className="font-bold">Communication Channel:</span>
              {agent.preferredCommunicationChannels}
            </p>
            <p className="text-lg">
              <span className="font-bold">Language spoken:</span>
              {agent.languagesSpoken}
            </p>
            <p className="text-lg">
              <span className="font-bold">Service Areas:</span>
              {agent.serviceAreas}
            </p>
            <p className="text-lg">
              <span className="font-bold">Bio:</span>
              {agent.professionalBio}
            </p>
            <p className="text-lg">
              <span className="font-bold">Certifications:</span>
              {agent.certificationsAwards}
            </p>
            <p className="text-lg">
              <span className="font-bold">References:</span>
              {agent.references}
            </p>
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
          </div>
        )}

        {activeTab === "edit" && (
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-center mb-6">
              Edit Profile
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
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
              <div className="flex flex-col">
                <label className="font-semibold">Agency Name:</label>
                <input
                  type="text"
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Agency Address:</label>
                <input
                  type="text"
                  name="agencyAddress"
                  value={formData.agencyAddress}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Years of Experience:</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  Specializations (comma-separated):
                </label>
                <input
                  type="text"
                  name="specializations"
                  value={formData.specializations}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Government ID:</label>
                <input
                  type="text"
                  name="governmentID"
                  value={formData.governmentID}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">LinkedIn Profile:</label>
                <input
                  type="text"
                  name="linkedInProfile"
                  value={formData.linkedInProfile}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Website:</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Profile Picture:</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Marketing Preferences:</label>
                <input
                  type="checkbox"
                  name="marketingPreferences"
                  checked={formData.marketingPreferences}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  Preferred Communication Channels (comma-separated):
                </label>
                <input
                  type="text"
                  name="preferredCommunicationChannels"
                  value={formData.preferredCommunicationChannels}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  Languages Spoken (comma-separated):
                </label>
                <input
                  type="text"
                  name="languagesSpoken"
                  value={formData.languagesSpoken}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  Service Areas (comma-separated):
                </label>
                <input
                  type="text"
                  name="serviceAreas"
                  value={formData.serviceAreas}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Professional Bio:</label>
                <textarea
                  name="professionalBio"
                  value={formData.professionalBio}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  Certifications and Awards (comma-separated):
                </label>
                <input
                  type="text"
                  name="certificationsAwards"
                  value={formData.certificationsAwards}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">References:</label>
                <input
                  type="text"
                  name="references"
                  value={formData.references}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className="mt-4 w-full bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentProfile;
