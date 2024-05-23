"use client";

import React, { useState } from "react";
import axios from "axios";

const AgentSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    licenseNumber: "",
    agencyName: "",
    agencyAddress: "",
    yearsOfExperience: 0,
    specializations: "",
    profilePicture: "",
    governmentID: "",
    linkedInProfile: "",
    website: "",
    marketingPreferences: false,
    preferredCommunicationChannels: "",
    languagesSpoken: "",
    serviceAreas: "",
    professionalBio: "",
    certificationsAwards: "",
    references: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: any = value;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-real-estate-m1zm.onrender.com/register-agent",
        {
          ...formData,
          specializations: formData.specializations.split(","),
          preferredCommunicationChannels:
            formData.preferredCommunicationChannels.split(","),
          languagesSpoken: formData.languagesSpoken.split(","),
          serviceAreas: formData.serviceAreas.split(","),
          certificationsAwards: formData.certificationsAwards.split(","),
          references: formData.references
            .split(",")
            .map((reference) => reference.trim()),
        }
      );
      if (response.status === 201) {
        setSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="container mx-auto my-4 px-4 lg:px-20">
      <div className="w-full mx-auto lg:w-[60%]">
        <h2 className="text-2xl font-bold mb-6">Agent Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">Registration successful!</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
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
            <label className="font-semibold">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
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
          <div className="flex flex-col">
            <label className="font-semibold">License Number:</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Agency Name:</label>
            <input
              type="text"
              name="agencyName"
              value={formData.agencyName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Agency Address:</label>
            <input
              type="text"
              name="agencyAddress"
              value={formData.agencyAddress}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Years of Experience:</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
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
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Profile Picture URL:</label>
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Government ID URL:</label>
            <input
              type="text"
              name="governmentID"
              value={formData.governmentID}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">LinkedIn Profile URL:</label>
            <input
              type="text"
              name="linkedInProfile"
              value={formData.linkedInProfile}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Website URL:</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Marketing Preferences:</label>
            <input
              type="checkbox"
              name="marketingPreferences"
              checked={formData.marketingPreferences}
              onChange={handleChange}
              className="mr-2"
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
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
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
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
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
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Professional Bio:</label>
            <textarea
              name="professionalBio"
              value={formData.professionalBio}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
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
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              References (comma-separated):
            </label>
            <input
              type="text"
              name="references"
              value={formData.references}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentSignup;
