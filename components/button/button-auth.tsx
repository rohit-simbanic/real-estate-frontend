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
  onClick?: () => void;
}
const ButtonAuth: React.FC<ButtonProps> = ({
  text,
  textColor,
  href,
  borderColor,
  borderWidth,
  borderRadius,
  bgColor,
  hoverBgColor,
  shadow,
  onClick,
}) => {
  const shadowClass = shadow ? "shadow" : "";

  return (
    <Link
      href={href}
      className={`inline-block px-5 py-2.5 text-sm font-medium text-${textColor} bg-${bgColor} border-${borderWidth} border-${borderColor} rounded-${borderRadius} ${shadowClass} transition-colors duration-300 hover:bg-${hoverBgColor}`}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

export default ButtonAuth;
