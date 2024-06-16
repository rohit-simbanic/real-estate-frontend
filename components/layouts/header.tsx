"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ButtonAuth from "../button/button-auth";
import { useTheme } from "@/contexts/theme-context";
import Image from "next/image";
import { fieldLabel } from "@/assets/field-label";
import ToggleButton from "@/theme/components/toggle-button/button-toggle";
import axios from "axios";
import { useAuth } from "@/contexts/auth-provider";
import { getCloudinaryUrl } from "@/helpers/cloudinary-image-fetch";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log("isMenuOpen", isMenuOpen);
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [agentId, setAgentId] = useState<string | null>(null);
  const { isAuthenticated, agent, logout } = useAuth();

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

    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop === 0) {
        setIsFixed(false);
        setIsHeaderVisible(true);
      } else if (scrollTop > lastScrollTop) {
        // Scroll down
        setIsHeaderVisible(false);
      } else {
        // Scroll up
        setIsHeaderVisible(true);
        setIsFixed(true);
      }
      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAuthenticated, isFixed, isHeaderVisible]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuItems = fieldLabel["menu-item"];

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };
  return (
    <nav
      className={`flex flex-wrap items-center justify-between p-5 bg-gray-100 dark:bg-[#1b0a0a] transition-transform duration-300 ${
        isFixed ? "fixed top-0 w-full z-50" : ""
      } ${isHeaderVisible ? "" : "-translate-y-full"}`}
    >
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
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

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
        <button
          id="hamburger"
          onClick={toggleMenu}
          className="flex items-center"
        >
          <Image
            className={`${isMenuOpen ? "!hidden" : "!block"}`}
            src="https://img.icons8.com/ios-filled/50/4dc0b5/xbox-menu.png"
            width="40"
            height="40"
            alt="Open Menu"
          />
          <Image
            className={`${isMenuOpen ? "!block" : "!hidden"}`}
            src="https://img.icons8.com/ios-filled/50/4dc0b5/cancel.png"
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
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

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
        <div className="flex sm:gap-4 md:hidden w-full justify-between items-center my-4">
          <ToggleButton isChecked={isChecked} handleChange={handleChange} />
          <div className="flex gap-2 items-center">
            {isAuthenticated ? (
              <>
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
                  onClick={logout}
                />
                {agent?.profilePicture ? (
                  <Link href={"/admin/agent-profile"} className="block">
                    <Image
                      src={getCloudinaryUrl(agent.profilePicture)}
                      alt="Profile"
                      height={52}
                      width={52}
                      className="rounded-[50%] flex items-center justify-center h-[52px] w-[53px]"
                    />
                  </Link>
                ) : (
                  <Link href={"/admin/agent-profile"}>
                    <div className="flex items-center justify-center w-[52px] h-[52px] bg-purple-700 text-white rounded-full text-2xl font-bold">
                      {getInitial(agent?.fullName)}
                    </div>
                  </Link>
                )}
              </>
            ) : (
              <>
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
                />
                <ButtonAuth
                  text="Register"
                  textColor="gray-800"
                  href="/admin/signup"
                  borderColor="blue-500"
                  borderWidth={0}
                  borderRadius="md"
                  bgColor="gray-300"
                  hoverBgColor="blue-700"
                  shadow={false}
                />
              </>
            )}
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
              <>
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
                  onClick={logout}
                />
                {agent?.profilePicture ? (
                  <Link href={"/admin/agent-profile"} className="block">
                    <Image
                      src={getCloudinaryUrl(agent.profilePicture)}
                      alt="Profile"
                      height={52}
                      width={52}
                      className="rounded-[50%] flex items-center justify-center h-[52px] w-[53px]"
                    />
                  </Link>
                ) : (
                  <Link href={"/admin/agent-profile"}>
                    <div className="flex items-center justify-center w-[52px] h-[52px] bg-purple-700 text-white rounded-full text-2xl font-bold">
                      {getInitial(agent?.fullName)}
                    </div>
                  </Link>
                )}
              </>
            ) : (
              <>
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
                />
                <ButtonAuth
                  text="Register"
                  textColor="gray-800"
                  href="/admin/signup"
                  borderColor="blue-500"
                  borderWidth={0}
                  borderRadius="md"
                  bgColor="gray-300"
                  hoverBgColor="blue-700"
                  shadow={false}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
