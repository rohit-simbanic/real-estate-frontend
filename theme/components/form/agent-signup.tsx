"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  licenseNumber: string;
  agencyName: string;
  agencyAddress: string;
  yearsOfExperience: number;
  specializations: string;
  profilePicture: File | null;
  governmentID: string;
  linkedInProfile: string;
  website: string;
  marketingPreferences: boolean;
  preferredCommunicationChannels: string;
  languagesSpoken: string;
  serviceAreas: string;
  professionalBio: string;
  certificationsAwards: string;
  references: string;
};

const AgentSignup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    licenseNumber: "",
    agencyName: "",
    agencyAddress: "",
    yearsOfExperience: 0,
    specializations: "",
    profilePicture: null,
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
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const router = useRouter();

  const validateForm = async () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[!@#$%^&*])(?=.*[A-Za-z\d]).{7,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 7 characters long and include at least one special character";
    }
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.licenseNumber)
      newErrors.licenseNumber = "License Number is required";
    if (!formData.governmentID)
      newErrors.governmentID = "Government ID is required";

    // Check if email is already registered
    try {
      const response = await axios.get(
        "https://backend-real-estate-m1zm.onrender.com/agents"
      );
      const agents = response.data;
      const emailExists = agents.some(
        (agent: any) => agent.email === formData.email
      );
      if (emailExists) {
        newErrors.email = "Email is already taken";
      }
    } catch (err) {
      newErrors.email = "Error checking email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(await validateForm())) {
      setError("Please fill in all required fields.");
      return;
    }

    // Ensure hidden fields with default values are included
    const data = new FormData();
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key] as any);
      }
    });

    try {
      const response = await axios.post(
        "https://backend-real-estate-m1zm.onrender.com/register-agent",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        router.push("/admin/login");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-20 my-10">
      <div className="w-full mx-auto lg:w-[40%] bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Agent Signup</h2>
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
              className={`mt-1 p-2 border ${
                errors.fullName ? "border-red-500 font-bold" : "border-gray-300"
              } rounded focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.fullName && (
              <span className="text-red-500">{errors.fullName}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.email ? "border-red-500 font-bold" : "border-gray-300"
              } rounded focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.password ? "border-red-500 font-bold" : "border-gray-300"
              } rounded focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.phoneNumber
                  ? "border-red-500 font-bold"
                  : "border-gray-300"
              } rounded focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">License Number:</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.licenseNumber
                  ? "border-red-500 font-bold"
                  : "border-gray-300"
              } rounded focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.licenseNumber && (
              <span className="text-red-500">{errors.licenseNumber}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Government ID:</label>
            <input
              type="text"
              name="governmentID"
              value={formData.governmentID}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.governmentID
                  ? "border-red-500 font-bold"
                  : "border-gray-300"
              } rounded focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.governmentID && (
              <span className="text-red-500">{errors.governmentID}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Website URL:</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.website ? "border-red-500 font-bold" : "border-gray-300"
              } rounded focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.website && (
              <span className="text-red-500">{errors.website}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Profile Picture URL:</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">Agency Name:</label>
            <input
              type="text"
              name="agencyName"
              value={formData.agencyName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">Agency Address:</label>
            <input
              type="text"
              name="agencyAddress"
              value={formData.agencyAddress}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">Years of Experience:</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">
              Specializations (comma-separated):
            </label>
            <input
              type="text"
              name="specializations"
              value={formData.specializations}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="hidden">
            <label className="font-semibold">LinkedIn Profile URL:</label>
            <input
              type="text"
              name="linkedInProfile"
              value={formData.linkedInProfile}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="hidden">
            <label className="font-semibold">Marketing Preferences:</label>
            <div className="mt-1">
              <input
                type="checkbox"
                name="marketingPreferences"
                checked={formData.marketingPreferences}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </div>
          </div>
          <div className="hidden">
            <label className="font-semibold">
              Preferred Communication Channels (comma-separated):
            </label>
            <input
              type="text"
              name="preferredCommunicationChannels"
              value={formData.preferredCommunicationChannels}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">
              Languages Spoken (comma-separated):
            </label>
            <input
              type="text"
              name="languagesSpoken"
              value={formData.languagesSpoken}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">
              Service Areas (comma-separated):
            </label>
            <input
              type="text"
              name="serviceAreas"
              value={formData.serviceAreas}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">Professional Bio:</label>
            <textarea
              name="professionalBio"
              value={formData.professionalBio}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div className="hidden">
            <label className="font-semibold">
              Certifications and Awards (comma-separated):
            </label>
            <input
              type="text"
              name="certificationsAwards"
              value={formData.certificationsAwards}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">
              References (comma-separated):
            </label>
            <input
              type="text"
              name="references"
              value={formData.references}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            formNoValidate
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentSignup;
