"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

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

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!formData.message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (validate()) {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID_CONTACT!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY_CONTACT!;

      const templateParams = {
        from_email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      };

      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    }
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
