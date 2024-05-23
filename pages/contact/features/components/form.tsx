"use client";
import React, { useState } from "react";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5"
      data-testid="contact-form"
    >
      <input
        className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="First Name*"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Last Name*"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
        type="email"
        placeholder="Email*"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
        type="tel"
        placeholder="Phone*"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <textarea
        placeholder="Message*"
        className="w-full h-32 bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
        name="message"
        value={formData.message}
        onChange={handleChange}
      />
      <div className="flex items-end">
        {" "}
        <button
          type="submit"
          className="h-14 uppercase text-sm font-bold tracking-wide bg-indigo-600 text-gray-100 p-1 rounded-lg w-full focus:outline-none focus:shadow-outline"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
