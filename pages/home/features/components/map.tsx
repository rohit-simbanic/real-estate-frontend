"use client";
import { fieldLabel } from "@/assets/field-label";
import React, { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

const MapComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: event.target.value });
    setErrors({ ...errors, email: "" });
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, message: event.target.value });
    setErrors({ ...errors, message: "" });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      email: "",
      message: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
      valid = false;
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_HOME!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    const templateParams = {
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        setFormData({
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="absolute inset-0 bg-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7236.506769120159!2d-79.42301964318247!3d43.800978991587435!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2cf990b0faf3%3A0xd8386489c908a67b!2sRBC%20Royal%20Bank!5e0!3m2!1sen!2sus!4v1715255856423!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: "1px", borderColor: "teal" }}
        ></iframe>
      </div>
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white dark:bg-gray-900 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font dark:text-teal-600">
            {fieldLabel["map-header"]}
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            {fieldLabel["map-subheader"]}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                {fieldLabel["map-form-field-email"]}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white dark:bg-gray-800 rounded border dark:border-gray-800 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={formData.email}
                onChange={handleEmailChange}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-600"
              >
                {fieldLabel["map-form-field-message"]}
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-white dark:bg-gray-800 rounded border dark:border-gray-800 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                value={formData.message}
                onChange={handleMessageChange}
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-sm">{errors.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              {fieldLabel["map-form-field-submit"]}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            {fieldLabel["map-spam-alert"]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;
