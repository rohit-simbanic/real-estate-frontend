"use client";
import React, { useState } from "react";
import { MailPayloadType, validate } from "../utils";
import { sendMail } from "../action";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState<MailPayloadType>(initialState);

  const [errors, setErrors] = useState<Partial<MailPayloadType>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isValid, errors } = validate(formData);

    setErrors(errors);
    if (!isValid) return;

    const templateParams = {
      from_email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    await sendMail(templateParams);
    setFormData(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5"
      data-testid="contact-form"
    >
      <div className="flex flex-col">
        <input
          className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="First Name*"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
        )}
      </div>
      <div className="flex flex-col">
        <input
          className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Last Name*"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
        )}
      </div>
      <div className="flex flex-col">
        <input
          className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Email*"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div className="flex flex-col">
        <input
          className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="tel"
          placeholder="Phone*"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>
      <div className="flex flex-col md:col-span-2">
        <textarea
          placeholder="Message*"
          className="w-full h-32 bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>
      <div className="flex items-end md:col-span-2">
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
