import Link from "next/link";
import React from "react";

interface ContactButtonProps {
  text: string;
  href: string;
  textColor: string;
  bgColor: string;
  hoverBgColor: string;
  hoverTextColor: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  text,
  href,
  textColor,
  bgColor,
  hoverBgColor,
  hoverTextColor,
}) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border border-white px-8 py-3 text-${textColor} bg-${bgColor} transition-all duration-200 ease-in-out hover:bg-${hoverBgColor} hover:text-${hoverTextColor} focus:outline-none focus:ring active:bg-white/90`}
    >
      <span className="text-sm font-medium">{text}</span>
      <svg
        className="h-5 w-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </Link>
  );
};

export default ContactButton;
