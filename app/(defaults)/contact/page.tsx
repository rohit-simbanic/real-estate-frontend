import ContactPage from "@/pages/contact/contact";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Page",
};

const Contact = () => {
  return <ContactPage />;
};

export default Contact;
