import { FooterSection } from "@/types/footer-menu-types";
import Image from "next/image";
import React from "react";

interface FooterMenuProps {
  sections: FooterSection[];
}

const FooterMenu: React.FC<FooterMenuProps> = ({ sections }) => {
  return (
    <>
      <Image
        src="https://filecenter.bestforagents.com/Customers/358381/fileManager/Ash_Patel.JPG?src=Custom"
        alt=""
        className="object-cover rounded-[50%]"
        height={300}
        width={300}
      />
      {sections.map((section, index) => (
        <div key={index} className="text-center lg:text-left">
          <p className="text-lg font-medium text-gray-900 dark:text-teal-600">
            {section.title}
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            {section.links.map((link, linkIndex) => (
              <>
                <li key={linkIndex}>
                  <a href={link.href}>
                    <p
                      className="text-gray-700 transition hover:text-gray-700/75"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    ></p>
                  </a>
                </li>
              </>
            ))}
            {section.title === "Ashok ( Ash ) Patel" && (
              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 2h8a2 2 0 012 2v3.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 017 7.5V4a2 2 0 011-1.73V19a2 2 0 002 2h4a2 2 0 002-2V4.27A2 2 0 0118 4v3.5a.5.5 0 00.5.5h.5a.5.5 0 00.5-.5V4a2 2 0 00-2-2H8z"
                      />
                    </svg>

                    <span className="flex-1 text-gray-700">
                      Cell: 416.669.7892
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>

                    <span className="flex-1 text-gray-700">
                      Office: 905-497-6701
                    </span>
                  </a>
                </li>

                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="12"
                      rx="2"
                      ry="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="3"
                      y1="10"
                      x2="21"
                      y2="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="7"
                      y="14"
                      width="10"
                      height="6"
                      rx="1"
                      ry="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="17" r="1" fill="currentColor" />
                    <line
                      x1="10"
                      y1="17"
                      x2="14"
                      y2="17"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <address className="-mt-0.5 flex-1 not-italic text-gray-700">
                    Fax: 905-497-6700
                  </address>
                </li>
              </ul>
            )}
          </ul>
        </div>
      ))}

      <Image
        src="https://filecenter.bestforagents.com/Customers/358381/fileManager/SaveMaxLogo.png?src=Custom"
        alt=""
        className="object-cover rounded-[50%]"
        height={300}
        width={300}
      />
    </>
  );
};

export default FooterMenu;
