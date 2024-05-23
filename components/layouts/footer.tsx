import { FooterSection } from "@/types/footer-menu-types";
import ContactButton from "../button/button-contact";
import FooterMenu from "../menu/footer-menu";
import Image from "next/image";
import { fieldLabel } from "@/assets/field-label";
const footerSections: FooterSection[] = [
  {
    title: "Ashok ( Ash ) Patel",
    links: [
      { label: "SAVE MAX ACHIEVERS REALTY, Brokerage", href: "#" },
      {
        label:
          "Independently owned and operated.<br/>9 MILMINK ST, Toronto, Nunavut M9W3N3 <br/><br/>ashpatelrealtor@gmail.com",
        href: "#",
      },
    ],
  },

  {
    title: "Helpful Links",
    links: [
      { label: "Admin Login", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Client Login", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#1b0a0a]">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-indigo-600 p-6 shadow-lg sm:flex-row sm:justify-between">
          <strong className="text-xl text-white sm:text-xl">
            {fieldLabel["cpa-footer-title"]}
          </strong>

          <ContactButton
            text="Let's Get Started"
            href="#"
            textColor="indigo-600"
            bgColor="white"
            hoverBgColor="transparent"
            hoverTextColor="white"
          />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-4 justify-items-center lg:justify-items-start">
          <FooterMenu sections={footerSections} />
        </div>
        <div className="mt-16">
          <ul className="flex justify-center gap-6 lg:justify-end">
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-teal-700 transition hover:text-teal-700/75"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-teal-700 transition hover:text-teal-700/75"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-teal-700 transition hover:text-teal-700/75"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-teal-700 transition hover:text-teal-700/75"
              >
                <span className="sr-only">Youtube</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M21.8,7.6c0-1.4-1.6-2.6-3.6-2.8C15.2,4.5,12,4.5,12,4.5s-3.2,0-6.2,0.3c-2,0.2-3.6,1.4-3.6,2.8
    C2,8.8,2,12,2,12s0,3.2,0.2,4.4c0,1.4,1.6,2.6,3.6,2.8c3,0.3,6.2,0.3,6.2,0.3s3.2,0,6.2-0.3c2-0.2,3.6-1.4,3.6-2.8
    C22,15.2,22,12,22,12S22,8.8,21.8,7.6z M9.3,15.7V8.3l6.4,3.7L9.3,15.7z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-teal-700 transition hover:text-teal-700/75"
              >
                <span className="sr-only">Linkedin</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M8.7,18.3H6.5V9.5h2.2
    V18.3z M7.6,8.4c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3s1.3,0.6,1.3,1.3S8.3,8.4,7.6,8.4z M18.3,18.3h-2.2v-4.4
    c0-1,0-2.3-1.4-2.3c-1.4,0-1.6,1.1-1.6,2.2v4.5h-2.2v-8.8h2.1v1.2h0c0.3-0.5,1.1-1.4,2.4-1.4c2.5,0,3,1.7,3,3.9V18.3z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>

          <div className="mt-16">
            <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0">
              {fieldLabel["copyright-text"]}
              <br />
              <br />
              {fieldLabel["copyright-text-additional"]}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
