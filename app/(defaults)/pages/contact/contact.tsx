import React, { useState } from "react";
import ContactForm from "./features/components/form";
import { fieldLabel } from "@/assets/field-label";

const ContactPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 py-5">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl dark:bg-gray-800">
          <h1 className="font-bold uppercase text-3xl dark:text-teal-600">
            Send us a message
          </h1>
          <ContactForm />
        </div>
        <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-teal-600 rounded-2xl">
          <div className="flex flex-col text-gray-600">
            <h1 className="font-bold uppercase text-4xl my-4">
              {fieldLabel["contact-header"]}
            </h1>
            <p className="text-gray-500">{fieldLabel["contact-subheader"]}</p>

            <div className="flex my-4 w-full lg:w-[90%]">
              <div className="flex flex-col">
                <i className="fas fa-map-marker-alt pt-2 pr-2" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl">{fieldLabel["office-title"]}</h2>
                <p className="text-gray-500">{fieldLabel["address:"]}</p>
              </div>
            </div>

            <div className="flex my-4 w-full lg:w-[90%]">
              <div className="flex flex-col">
                <i className="fas fa-phone-alt pt-2 pr-2" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl">{fieldLabel["contact-title"]}</h2>
                <p className="text-gray-500">
                  Tel: {fieldLabel["contact-telephone"]}
                </p>
                <p className="text-gray-500">
                  Fax: {fieldLabel["contact-fax"]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
