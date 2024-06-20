"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./component";
import sendMail from "../actions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const ContactForm = () => {
  const {
    register,
    trigger,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: initialState,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    trigger();

    if (!isValid) return;

    const formData = getValues();

    const templateParams = {
      from_email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    await sendMail(templateParams);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5"
      data-testid="contact-form"
    >
      <Input
        register={register("firstName", {
          required: "First Name is required",
        })}
        name="firstName"
        placeHolder="Your First Name"
        error={errors.firstName}
      />

      <Input
        register={register("lastName", {
          required: "Last Name is required",
        })}
        name="lastName"
        placeHolder="Your Last Name"
        error={errors.lastName}
      />

      <Input
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address",
          },
        })}
        name="email"
        placeHolder="Your Email"
        error={errors.email}
      />

      <Input
        register={register("phone", {
          required: "Phone is required",
        })}
        name="phone"
        placeHolder="Your Phone"
        error={errors.phone}
      />

      <Input
        register={register("message", {
          required: "Message is required",
        })}
        name="message"
        placeHolder="Please send me information about this property"
        error={errors.message}
        isTextArea
      />

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