import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
  return (
    <section className="flex flex-col items-center justify-center gap-3 font-dmSans relative dark:bg-[#18191B] py-10">
      <footer className="mx-auto px-10 flex lg:flex-row flex-col justify-center gap-y-8 w-4/5">
        {/* Logo and description */}
        <div className="w-60 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a href="/" className="flex items-center py-3 justify-center md:justify-start">
            <img
              className="w-20 md:w-28 block dark:hidden"
              src="/static/media/Tuf Logo B.a2ce02c035734f237b8a.png"
              alt="TUF Logo"
            />
            <img
              className="w-20 md:w-28 hidden dark:block"
              src="/static/media/TufLogoWhite.55c3498a0dd7701d258e.png"
              alt="TUF Logo Dark"
            />
          </a>
          <span className="text-xs mt-2 text-[#7a7a7a] block max-w-xs">
            The best place to learn data Structures, algorithms, most asked coding interview questions. real interview experiences free of cost.
          </span>

          {/* Social Icons */}
          <div className="flex flex-row gap-x-3 items-center mt-4 justify-center md:justify-start">
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/company/takeuforward/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border-2 border-[#f0f0f060] group hover:border-white transition-colors cursor-pointer"
            >
              <FaLinkedinIn className="text-[#7a7a7a] group-hover:text-white" size={16} />
            </a>

            <a
              aria-label="X (Twitter)"
              href="https://www.x.com/takeuforward_"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border-2 border-[#f0f0f060] group hover:border-white transition-colors cursor-pointer"
            >
              <FaXTwitter className="text-[#7a7a7a] group-hover:text-white" size={16} />
            </a>

            <a
              aria-label="Instagram"
              href="https://www.instagram.com/striver_79/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border-2 border-[#f0f0f060] group hover:border-white transition-colors cursor-pointer"
            >
              <FaInstagram className="text-[#7a7a7a] group-hover:text-white" size={16} />
            </a>

            <a
              aria-label="YouTube"
              href="https://www.youtube.com/channel/UCJskGeByzRRSvmOyZOz61ig"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border-2 border-[#f0f0f060] group hover:border-white transition-colors cursor-pointer"
            >
              <FaYoutube className="text-[#7a7a7a] group-hover:text-white" size={16} />
            </a>
          </div>
        </div>

        {/* Other links */}
        <div className="col-span-1 lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-8 md:ml-20">
          <div>
            <h2 className="title-font font-medium tracking-widest text-base mb-3 text-left text-new_Brand">
              Company
            </h2>
            <nav className="flex flex-col gap-y-3 text-sm">
              <a href="/about-us" className="hover:underline hover:text-new_Brand dark:text-[#F0F0F0] dark:hover:text-new_Brand">
                About Us
              </a>
              <a href="/contact-us" className="hover:underline hover:text-new_Brand dark:text-[#F0F0F0] dark:hover:text-new_Brand">
                Contact Us
              </a>
              <a href="/plus" className="hover:underline hover:text-new_Brand dark:text-[#F0F0F0] dark:hover:text-new_Brand">
                Pricing
              </a>
              <a href="/privacy-policy" className="hover:underline hover:text-new_Brand dark:text-[#F0F0F0] dark:hover:text-new_Brand">
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="hover:underline hover:text-new_Brand dark:text-[#F0F0F0] dark:hover:text-new_Brand">
                Terms and Conditions
              </a>
              <a href="/cancellation-refund-policy" className="hover:underline hover:text-new_Brand dark:text-[#F0F0F0] dark:hover:text-new_Brand">
                Cancellation / Refund Policy
              </a>
            </nav>
          </div>

          {/* Add other sections here similarly */}

        </div>
      </footer>
    </section>
  );
}
