import Link from "next/link";
import React from "react";

interface ButtonLoginProps {
  text?: string;
  href: string;
}

const ButtonLogin: React.FC<ButtonLoginProps> = ({
  text = "Login",
  href = "/admin/login",
}) => {
  return (
    <Link href={href}>
      <button className="group relative h-12 w-full overflow-hidden rounded-lg bg-white text-lg shadow mt-2">
        <div className="absolute inset-0 w-3 bg-teal-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span className="relative text-black group-hover:text-white">
          {text}
        </span>
      </button>
    </Link>
  );
};

export default ButtonLogin;
