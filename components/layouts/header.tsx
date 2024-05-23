"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ButtonAuth from "../button/button-auth";
import { useTheme } from "@/contexts/theme-context";
import Image from "next/image";
import { fieldLabel } from "@/assets/field-label";
import ToggleButton from "@/theme/components/toggle-button/button-toggle";
import { redirect } from "next/navigation";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  console.log("isAuthenticated", isAuthenticated);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIsChecked(!isChecked);
    localStorage.setItem("isChecked", JSON.stringify(!isChecked));
  };

  useEffect(() => {
    const storedIsChecked = localStorage.getItem("isChecked");
    if (storedIsChecked !== null) {
      setIsChecked(JSON.parse(storedIsChecked));
    }

    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuItems = fieldLabel["menu-item"];
  return (
    <nav className="flex flex-wrap items-center justify-between p-5 bg-white dark:bg-[#1b0a0a]">
      <div className="flex justify-between w-full md:hidden">
        <Link className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <svg
            className="h-8 w-8"
            fill="#0d9488"
            width="800px"
            height="800px"
            viewBox="0 0 50 50"
            version="1.2"
            baseProfile="tiny"
            xmlns="http://www.w3.org/2000/svg"
            overflow="inherit"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path d="M14.237 39.5h30.483v-26.081h-30.483v26.081zm15.489-23.485l10.99 9.598h-2.769v11.516h-6.436v-8.129h-4.065v8.129h-6.096v-11.516h-2.84l11.216-9.598zm-18.876-9.031v-5.966h-6.774v48.982h6.774v-39.967h35.226v-3.049z" />
            </g>
          </svg>
        </Link>
        <button id="hamburger" onClick={toggleMenu}>
          <Image
            className={`toggle ${isMenuOpen ? "hidden" : "block"}`}
            src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
            width="40"
            height="40"
            alt="Open Menu"
          />
          <Image
            className={`toggle ${isMenuOpen ? "block" : "hidden"}`}
            src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
            width="40"
            height="40"
            alt="Close Menu"
          />
        </button>
      </div>
      <Link className="text-teal-600 md:block hidden" href="/">
        <span className="sr-only">Home</span>
        <svg
          className="h-8 w-8"
          fill="#0d9488"
          width="800px"
          height="800px"
          viewBox="0 0 50 50"
          version="1.2"
          baseProfile="tiny"
          xmlns="http://www.w3.org/2000/svg"
          overflow="inherit"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <path d="M14.237 39.5h30.483v-26.081h-30.483v26.081zm15.489-23.485l10.99 9.598h-2.769v11.516h-6.436v-8.129h-4.065v8.129h-6.096v-11.516h-2.84l11.216-9.598zm-18.876-9.031v-5.966h-6.774v48.982h6.774v-39.967h35.226v-3.049z" />
          </g>
        </svg>
      </Link>
      <div
        className={`toggle ${
          isMenuOpen ? "block" : "hidden"
        } w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-teal-900 md:border-none`}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="block md:inline-block text-teal-600 text-xl hover:text-blue-500 px-3 py-3 border-b-2 border-teal-900 md:border-none"
          >
            {item.title}
          </Link>
        ))}
        <div className="sm:flex sm:gap-4 block md:hidden w-full justify-between items-center my-4">
          <ToggleButton isChecked={isChecked} handleChange={handleChange} />
          <div className="flex gap-2">
            {isAuthenticated ? (
              <ButtonAuth
                text="Logout"
                textColor="white"
                href="/"
                borderColor="blue-500"
                borderWidth={0}
                borderRadius="md"
                bgColor="teal-600"
                hoverBgColor="blue-700"
                shadow={true}
                onClick={handleLogout}
              />
            ) : (
              <ButtonAuth
                text="Login"
                textColor="white"
                href="/admin/login"
                borderColor="blue-500"
                borderWidth={0}
                borderRadius="md"
                bgColor="teal-600"
                hoverBgColor="blue-700"
                shadow={true}
                onClick={handleLogin}
              />
            )}

            <ButtonAuth
              text="Register"
              textColor="teal-600"
              href="/admin/signup"
              borderColor="blue-500"
              borderWidth={0}
              borderRadius="md"
              bgColor="gray-100"
              hoverBgColor="blue-700"
              shadow={false}
            />
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4 items-center">
            <label
              htmlFor="AcceptConditions"
              className="relative h-8 w-14 cursor-pointer rounded-full dark:bg-gray-300 bg-black transition [-webkit-tap-highlight-color:_transparent] peer-checked:bg-green-500"
            >
              <input
                type="checkbox"
                id="AcceptConditions"
                className="peer sr-only"
                checked={isChecked}
                onChange={handleChange}
              />
              <span className="absolute inset-y-0 left-0 m-1 size-6 rounded-full bg-white transition-all duration-300 ease-in-out peer-checked:left-6"></span>
            </label>
            {isAuthenticated ? (
              <ButtonAuth
                text="Logout"
                textColor="white"
                href="/"
                borderColor="blue-500"
                borderWidth={0}
                borderRadius="md"
                bgColor="teal-600"
                hoverBgColor="blue-700"
                shadow={true}
                onClick={handleLogout}
              />
            ) : (
              <ButtonAuth
                text="Login"
                textColor="white"
                href="/admin/login"
                borderColor="blue-500"
                borderWidth={0}
                borderRadius="md"
                bgColor="teal-600"
                hoverBgColor="blue-700"
                shadow={true}
                onClick={handleLogin}
              />
            )}

            <ButtonAuth
              text="Register"
              textColor="teal-600"
              href="/admin/signup"
              borderColor="blue-500"
              borderWidth={0}
              borderRadius="md"
              bgColor="gray-100"
              hoverBgColor="blue-700"
              shadow={false}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
