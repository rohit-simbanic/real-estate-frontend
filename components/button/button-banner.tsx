import Link from "next/link";
import React from "react";

interface ButtonProps {
  text: string;
  textColor: string;
  href: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: string;
  bgColor: string;
  hoverBgColor: string;
  shadow: boolean;
  className?: string;
}

const ButtonBanner: React.FC<ButtonProps> = ({
  text,
  textColor,
  href,
  borderColor,
  borderWidth,
  borderRadius,
  bgColor,
  hoverBgColor,
  shadow,
}) => {
  const shadowClass = shadow ? "shadow" : "";
  return (
    <Link
      href={href}
      className={`inline-block px-12 py-3 text-sm font-medium text-${textColor} bg-${bgColor} border-${borderWidth} border-${borderColor} rounded-${borderRadius} ${shadowClass} hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto hover:bg-${hoverBgColor}`}
    >
      {text}
    </Link>
  );
};

export default ButtonBanner;
