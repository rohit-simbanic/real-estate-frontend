"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { getCloudinaryUrl } from "@/helpers/cloudinary-image-fetch";

type Props = {
  params: { id: string };
};

const AgentProfile = ({ params }: Props) => {
  const [agent, setAgent] = useState<any>(null);
  console.log("agents", agent);
  const [formData, setFormData] = useState<any>({});
  const [newPassword, setNewPassword] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("profile");

  const validatePassword = (password: string) => {
    if (!/^(?=.*[!@#$%^&*])(?=.*[A-Za-z\d]).{7,}$/.test(password)) {
      return "Password must be at least 7 characters long and include at least one special character";
    }
    return null;
  };

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/agent/agents/${params.id}`
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/agent/agents/${params.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response) {
        throw new Error("Network response was not ok");
      }
      setAgent({ ...agent, ...response.data });
      setActiveTab("profile");
    } catch (err) {
      console.error("Error updating agent data:", err);
    }
  };

  const handlePasswordReset = async () => {
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      alert(passwordError);
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/agent/agent/${params.id}/reset-password`,
        {
          password: newPassword,
        }
      );
      alert(response.data.message);
      setNewPassword("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Check if the error is an AxiosError and if it has a response with data and message
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred while resetting the password.");
        }
      } else {
        alert("An unexpected error occurred.");
      }
      console.error("Error resetting password:", err);
    }
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-20 my-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex flex-col sm:flex-row space-x-4">
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
                activeTab === "details"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Additional Details
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
          <div className="flex flex-col items-center space-y-4 mt-6 max-h-[600px] overflow-y-auto scrollable-container px-2">
            {agent?.profilePicture ? (
              <Image
                src={getCloudinaryUrl(agent.profilePicture)}
                alt="Profile"
                className="w-32 h-32 rounded-full"
                width={128}
                height={128}
              />
            ) : (
              <div className="initial-circle flex items-center justify-center w-32 h-32 bg-purple-700 text-white rounded-full text-2xl font-bold">
                {getInitial(agent?.fullName)}
              </div>
            )}
            <p className="text-lg font-semibold ">
              <span className="underline">Name:</span> {agent?.fullName}
            </p>
            <div className="overflow-x-auto  w-full">
              <table className="border-collapse border bg-white border-gray-200 w-full">
                <tbody>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Email
                    </th>
                    <td className="px-4 py-2 text-gray-800">{agent?.email}</td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Phone
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.phoneNumber}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      License no
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.licenseNumber}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Agency Name
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.agencyName}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Agency Address
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.agencyAddress}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "details" && (
          <div className="flex flex-col items-center space-y-4 mt-6 max-h-[600px] overflow-y-auto scrollable-container px-2">
            <div className="overflow-x-auto  w-full">
              <table className="border-collapse border bg-white border-gray-200 w-full">
                <tbody>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Year of Experience
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.yearsOfExperience}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Specializations
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.specializations}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Govt ID
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.governmentID}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      LinkedIn Profile
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      <a
                        href={agent?.linkedInProfile}
                        className="text-blue-600 hover:underline"
                      >
                        {agent?.linkedInProfile}
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Website
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      <a
                        href={agent?.website}
                        className="text-blue-600 hover:underline"
                      >
                        {agent?.website}
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Marketing Preferences
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.marketingPreferences}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Communication Channel
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.preferredCommunicationChannels}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Language Spoken
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.languagesSpoken}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Service Areas
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.serviceAreas}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Bio
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.professionalBio}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Certifications
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.certificationsAwards}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      References
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.references}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4 text-center underline">
                Reset Password
              </h3>
              <div className="w-[80%] mx-auto">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 w-full my-2"
                />
                <button
                  onClick={handlePasswordReset}
                  className="bg-teal-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full mb-5"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "edit" && (
          <div className="mt-6 max-h-[600px] overflow-y-auto scrollable-container px-2">
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
