import { Metadata } from "next";
import React from "react";
import ContactPage from "../pages/contact/contact";

export const metadata: Metadata = {
  title: "Contact Page",
};

const Contact = () => {
  return <ContactPage />;
};

export default Contact;
