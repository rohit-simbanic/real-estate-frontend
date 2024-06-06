"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      valid = false;
    }
    if (!formData.message) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (!captchaVerified) {
      alert("Please complete the captcha verification.");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      to_name: "Ashok Patel",
      message: formData.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        recaptchaRef.current?.reset();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(true);
  };

  return (
    <div className="w-[100%] lg:w-[30%] mx-auto bg-white shadow rounded-lg p-6 mt-1 dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <Image
          className="shadow-lg mb-4"
          src="https://filecenter.bestforagents.com/Customers/358381/fileManager/Ash_Patel.JPG?src=Custom"
          alt="Agent"
          width={200}
          height={200}
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Ashok (Ash) Patel
          </h2>
          <p className="text-sm text-gray-500">Broker</p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Dir: 416-669-7892</p>
            <p>Bus: 905-497-6701</p>
            <p>Fax: 905-497-6700</p>
          </div>
        </div>
      </div>

      <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className={`w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
            errors.name ? "border-red-500" : ""
          }`}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className={`w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
            errors.email ? "border-red-500" : ""
          }`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          className={`w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
            errors.phone ? "border-red-500" : ""
          }`}
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone}</span>
        )}
        <textarea
          name="message"
          placeholder="Please send me information about this property"
          className={`w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
            errors.message ? "border-red-500" : ""
          }`}
          rows={4}
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message}</span>
        )}
        <div
          className="captcha"
          style={{ transform: "scale(0.85)", transformOrigin: "0 0" }}
        >
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={handleCaptchaChange}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
          disabled={!captchaVerified}
        >
          Request More Info
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
