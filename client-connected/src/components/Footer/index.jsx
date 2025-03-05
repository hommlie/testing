import React from "react";
import { IoLogoGooglePlaystore, IoLogoApple } from "react-icons/io5";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import config from "../../config/config";
import Playstore from "/assets/icons/playstore.svg";
import Appstore from "/assets/icons/appstore.svg";

export default function Footer({
  logo,
  logoAlt,
  copyright,
  facebook,
  instagram,
  linkedin,
  twitter,
  youtube,
  locations,
}) {
  // Parse locations string and create array of location names
  const locationArray = locations ? locations.split("|") : [];

  return (
    <footer className="footer mt-10 z-10 px-4 md:px-10 pb-4">
      <div className="container-sm max-w-7xl mx-auto px-10 space-y-8">
        <div className="" style={{ border: "1px dotted #E5E7EB" }}></div>
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="h-10 lg:h-12">
              <img src={logo} alt={logoAlt} className="h-full w-fit" />
            </div>
            <p className="text-sm text-gray-500 max-w-[250px]">
              One click to transform your home into a sparkling haven with our
              professional cleaning services. From deep cleans.
            </p>
            <div className="flex gap-4">
              <SocialIcon Icon={FaFacebookF} link={facebook} />
              <SocialIcon Icon={FaInstagram} link={instagram} />
              <SocialIcon Icon={FaTwitter} link={twitter} />
              <SocialIcon Icon={FaLinkedinIn} link={linkedin} />
              <SocialIcon Icon={FaYoutube} link={youtube} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <FooterSection
              title="Company Info"
              links={[
                { title: "Home", link: `${config.VITE_BASE_URL}` },
                { title: "About us", link: `${config.VITE_BASE_URL}/about-us` },
                { title: "Services", link: `${config.VITE_BASE_URL}/services` },
                {
                  title: "Partner us",
                  link: `${config.VITE_BASE_URL}/partner-us`,
                },
                {
                  title: "Contact us",
                  link: `${config.VITE_BASE_URL}/contact-us`,
                },
              ]}
            />

            <FooterSection
              title="Our Brands"
              links={[
                { title: "Hommlie", link: "https://www.hommlie.com/" },
                { title: "Hompure", link: "https://hompure.in/" },
                { title: "Hoy Smart", link: "https://hoysmart.in/" },
                { title: "RoachX", link: "https://roachx.in/" },
                { title: "Pink Store", link: "https://pinkstore.co.in/" },
              ]}
            />

            <FooterSection
              title="Quick Links"
              links={[
                {
                  title: "Community",
                  link: `${config.VITE_BASE_URL}/community`,
                },
                {
                  title: "Blogs",
                  link: `${config.VITE_BASE_URL}/blogs`,
                },
                {
                  title: "Women Empowerment",
                  link: `${config.VITE_BASE_URL}/women-empowerment`,
                },
                {
                  title: "B2B Services",
                  link: "https://b2b.hommlie.com/",
                },
                {
                  title: "Register as Professional",
                  link: `${config.VITE_BASE_URL}/partner-us`,
                },
              ]}
            />
          </div>

          <div className="hidden lg:block">
            <div className="flex flex-col gap-4 text-white">
              <a
                href="https://play.google.com/store/apps/details?id=com.hommlie.user&pcampaignid=web_share"
                className="rounded-xl flex flex-row justify-center items-center gap-2"
              >
                <img src={Playstore} alt="" />
              </a>
              <a
                href="#"
                className="rounded-xl flex flex-row justify-center items-center gap-2"
              >
                <img src={Appstore} alt="" />
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic location links with pipe separators */}
        <div className="flex flex-wrap items-center">
          <span className="text-sm mr-2">We are available in:</span>
          {locationArray.map((location, index) => (
            <React.Fragment key={location}>
              <a
                href={`${config.VITE_BASE_URL}/${location
                  .trim()
                  .toLowerCase()}`}
                className="text-sm text-[#035240] hover:underline"
              >
                {location.trim()}
              </a>
              {/* Add pipe separator between locations but not after the last one */}
              {index < locationArray.length - 1 && (
                <span className="mx-2 text-gray-400">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="border border-black"></div>
        <div className="flex gap-4 items-center pt-2 text-sm text-gray-400">
          <p className="">{copyright}</p>
          <p className="flex gap-3">
            <a
              href={`${config.VITE_BASE_URL}/privacy-policy`}
              className="underline"
            >
              Privacy Policy
            </a>
            <a
              href={`${config.VITE_BASE_URL}/terms-conditions`}
              className="underline"
            >
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

const FooterSection = ({ title, links }) => (
  <div>
    <p className="capitalize text-sm lg:text-[19px] font-medium !text-gray-900_03 mb-4">
      {title}
    </p>
    <ul className="flex flex-col gap-1 lg:gap-2">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.link} className="text-xs lg:text-sm text-[#035240]">
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ Icon, link }) => (
  <a
    href={link}
    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white"
  >
    <Icon className="text-[#035240] text-sm" />
  </a>
);
