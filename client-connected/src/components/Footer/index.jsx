import React from "react";
import { IoLogoGooglePlaystore, IoLogoApple } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import config from "../../config/config";

export default function Footer({ logo, logoAlt, copyright, facebook, instagram, linkedin, twitter, youtube }) {
  return (
    <footer className="footer rounded-lg mt-[40px] z-10">
      <div className="container-sm pt-5 lg:pt-24 pb-5 space-y-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4">
            <img src={logo} alt={logoAlt} className="h-10 lg:h-14 w-max" />
            <p className="text-sm text-gray-500 max-w-[300px]">
              One click to transform your home into a sparkling haven with our professional cleaning services. From deep cleans.
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
              title="Our Brands"
              links={[
                { title: "Hommlie", link: "https://www.hommlie.com/" },
                { title: "Hompure", link: "https://www.hompure.in/" },
                { title: "Hoy Smart", link: "https://www.hompure.in/" },
                { title: "RoachX", link: "https://www.hompure.in/" },
                { title: "Pink Store", link: "https://www.hompure.in/" }
              ]}
            />

            <FooterSection
              title="Company Info"
              links={[
                { title: "About us", link: `${config.VITE_BASE_URL}/about-us` },
                // { title: "Why Hygiene", link: "#" },
                // { title: "Mission", link: "#" },
                // { title: "FAQs", link: "#" },
                { title: "Careers", link: `${config.VITE_BASE_URL}/careers` },
                { title: "Partner us", link: `${config.VITE_BASE_URL}/partner-us` }
              ]}
            />

            {/* <FooterSection
              title="Our Services"
              links={[
                { title: "Pest Control", link: "#" },
                { title: "Cleaning Services", link: "#" },
                { title: "Sanitization", link: "#" },
                { title: "Bird Netting", link: "#" },
                { title: "Mosquito Mesh", link: "#" }
              ]}
            /> */}

            <FooterSection
              title="For Commercial Services"
              links={[
                { title: "Industries", link: "https://b2b.hommlie.com/Industries.html" },
                { title: "Commercial Pest Management", link: "https://b2b.hommlie.com/" },
                { title: "Commercial Cleaning Services", link: "https://b2b.hommlie.com/" },
                { title: "Why Hommlie", link: `${config.VITE_BASE_URL}/about-us` },
                { title: "Contact Us", link: `${config.VITE_BASE_URL}/contact-us` }
              ]}
            />
          </div>

          <div className="hidden lg:block">
            <p className="capitalize text-[19px] font-medium !text-gray-900_03">Get the app</p>
            <div className="flex flex-col mt-[30px] gap-4 text-white">
              <button className="w-[165px] h-[60px] rounded-xl flex flex-row justify-center items-center gap-2" style={{backgroundColor: "#035240"}}>
                <IoLogoApple className="text-white w-[29px] h-[29px]" />
                <div className="flex flex-col items-start">
                  <p className="text-xs">Download on the</p>
                  <p className="text-sm">Apple Store</p>
                </div>
              </button>
              <button className="w-[165px] h-[60px] rounded-xl flex flex-row justify-center items-center gap-2" style={{backgroundColor: "#035240"}}>
                <IoLogoGooglePlaystore className="text-white w-[29px] h-[29px]" />
                <div className="flex flex-col items-start">
                  <p className="text-xs">Get it on</p>
                  <p className="text-sm">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="" style={{border: "1px dotted #E5E7EB"}}></div>
        <div className="pt-4">
          <p className="text-sm text-gray-400">
            Read <a href={`${config.VITE_BASE_URL}/privacy-policy`} className="underline">Privacy Policy</a> and <a href={`${config.VITE_BASE_URL}/terms-conditions`} className="underline">Terms & Conditions</a> of service apply.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

const FooterSection = ({ title, links }) => (
  <div>
    <p className="capitalize text-sm lg:text-[19px] font-medium !text-gray-900_03 mb-4">{title}</p>
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
  <a href={link} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white">
    <Icon className="text-[#035240] text-sm" />
  </a>
);