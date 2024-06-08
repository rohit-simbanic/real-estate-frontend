"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
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
    confirmPassword: "",
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    const phoneNumber = formData.phoneNumber;
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be exactly 10 digits";
    }
    // Check if email is already registered
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/agent/agents`
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
    } else if (name === "phoneNumber") {
      // Ensure phone number does not exceed 10 digits
      newValue = value.slice(0, 10);
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
    // Append non-file fields
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key] as any);
      }
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/agent/register-agent`,
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border ${
                  errors.password
                    ? "border-red-500 font-bold"
                    : "border-gray-300"
                } rounded focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-1 text-gray-700"
              >
                {showPassword ? (
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 64 64"
                    enable-background="new 0 0 64 64"
                  >
                    <path
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      d="M1,32c0,0,11,15,31,15s31-15,31-15S52,17,32,17
                 S1,32,1,32z"
                    />
                    <circle
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      cx="32"
                      cy="32"
                      r="7"
                    />
                    <line
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      x1="9"
                      y1="55"
                      x2="55"
                      y2="9"
                    />
                  </svg>
                ) : (
                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 60.254 60.254"
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="M29.008,48.308c-16.476,0-28.336-17.029-28.833-17.754c-0.248-0.36-0.231-0.841,0.039-1.184
                     c0.561-0.712,13.906-17.424,29.913-17.424c17.953,0,29.474,16.769,29.956,17.482c0.23,0.342,0.229,0.79-0.007,1.129
                     c-0.475,0.688-11.842,16.818-29.899,17.721C29.786,48.297,29.396,48.308,29.008,48.308z M2.267,30.028
                     c2.326,3.098,13.553,16.967,27.812,16.254c15.237-0.76,25.762-13.453,27.938-16.3c-2.175-2.912-12.811-16.035-27.889-16.035
                     C16.7,13.947,4.771,27.084,2.267,30.028z"
                          />
                        </g>
                        <g>
                          <path
                            d="M30.127,37.114c-3.852,0-6.986-3.135-6.986-6.986c0-3.851,3.134-6.985,6.986-6.985s6.986,3.135,6.986,6.985
                     C37.113,33.979,33.979,37.114,30.127,37.114z"
                          />
                        </g>
                        <g>
                          <path
                            d="M30.127,42.614c-6.885,0-12.486-5.602-12.486-12.486c0-6.883,5.602-12.485,12.486-12.485
                     c6.884,0,12.486,5.602,12.486,12.485C42.613,37.012,37.013,42.614,30.127,42.614z M30.127,19.641
                     c-5.782,0-10.486,4.704-10.486,10.486c0,5.781,4.704,10.485,10.486,10.485s10.486-4.704,10.486-10.485
                     C40.613,24.345,35.91,19.641,30.127,19.641z"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Confirm Password:</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"} // showConfirmPassword toggle
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border ${
                  errors.confirmPassword
                    ? "border-red-500 font-bold"
                    : "border-gray-300"
                } rounded focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                className="absolute inset-y-0 right-0 px-3 py-1 text-gray-700"
              >
                {showConfirmPassword ? (
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 64 64"
                    enable-background="new 0 0 64 64"
                  >
                    <path
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      d="M1,32c0,0,11,15,31,15s31-15,31-15S52,17,32,17
                 S1,32,1,32z"
                    />
                    <circle
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      cx="32"
                      cy="32"
                      r="7"
                    />
                    <line
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      x1="9"
                      y1="55"
                      x2="55"
                      y2="9"
                    />
                  </svg>
                ) : (
                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 60.254 60.254"
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="M29.008,48.308c-16.476,0-28.336-17.029-28.833-17.754c-0.248-0.36-0.231-0.841,0.039-1.184
                     c0.561-0.712,13.906-17.424,29.913-17.424c17.953,0,29.474,16.769,29.956,17.482c0.23,0.342,0.229,0.79-0.007,1.129
                     c-0.475,0.688-11.842,16.818-29.899,17.721C29.786,48.297,29.396,48.308,29.008,48.308z M2.267,30.028
                     c2.326,3.098,13.553,16.967,27.812,16.254c15.237-0.76,25.762-13.453,27.938-16.3c-2.175-2.912-12.811-16.035-27.889-16.035
                     C16.7,13.947,4.771,27.084,2.267,30.028z"
                          />
                        </g>
                        <g>
                          <path
                            d="M30.127,37.114c-3.852,0-6.986-3.135-6.986-6.986c0-3.851,3.134-6.985,6.986-6.985s6.986,3.135,6.986,6.985
                     C37.113,33.979,33.979,37.114,30.127,37.114z"
                          />
                        </g>
                        <g>
                          <path
                            d="M30.127,42.614c-6.885,0-12.486-5.602-12.486-12.486c0-6.883,5.602-12.485,12.486-12.485
                     c6.884,0,12.486,5.602,12.486,12.485C42.613,37.012,37.013,42.614,30.127,42.614z M30.127,19.641
                     c-5.782,0-10.486,4.704-10.486,10.486c0,5.781,4.704,10.485,10.486,10.485s10.486-4.704,10.486-10.485
                     C40.613,24.345,35.91,19.641,30.127,19.641z"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Phone Number:</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`mt-1 p-2 border ${
                errors.phoneNumber
                  ? "border-red-500 font-bold"
                  : "border-gray-300"
              } rounded focus:ring-blue-500 focus:border-blue-500`}
              pattern="\d{10}"
              required
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="hidden">
            <label className="font-semibold">License Number:</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">Government ID:</label>
            <input
              type="text"
              name="governmentID"
              value={formData.governmentID}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">Website URL:</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">Profile Picture:</label>
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
            />
          </div>
          <div className="hidden">
            <label className="font-semibold">Professional Bio:</label>
            <textarea
              name="professionalBio"
              value={formData.professionalBio}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
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
