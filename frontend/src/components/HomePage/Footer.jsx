import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import { Link } from "react-router-dom";
import logo from "../../assets/vyomifyLogo1.png"

export default function Footer() {
  {/* bg-[#191b1f] bg-[#252629] bg-zinc-900*/ }
  return (
    <section className="bg-[#191b1f] text-gray-400 py-12 font-dmSans select-none">
      <footer className="mx-auto px-6 md:px-16 max-w-7xl flex flex-col lg:flex-row justify-between gap-12">
        {/* Logo & Description */}
        <div className="w-60 flex-shrink-0 text-center lg:text-left">
          <Link
            to="/"
            className="flex ">
            <img
              className="w-15"
              src={logo}
              alt="Vyomify Logo"
            />
          </Link>
          <p className="text-sm mt-2 text-gray-400">
            Vyomify is your go-to platform to upload videos, create posts, and connect with your audience.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center lg:justify-start mt-5 gap-4">
            <a
              href="https://github.com/singh-abhiishek"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-700 hover:border-red-600 transition-colors cursor-pointer"
            >
              <FaGithub className="text-gray-400 hover:text-red-600" size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhishek-singh-05a440230/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-700 hover:border-red-600 transition-colors cursor-pointer"
            >
              <FaLinkedinIn className="text-gray-400 hover:text-red-600" size={18} />
            </a>
            <div
              aria-label="Twitter (X)"
              className="p-2 rounded-full border border-gray-700 hover:border-red-600 transition-colors"
            >
              <SiX className="text-gray-400 hover:text-red-600" size={18} />
            </div>
            {/* <a
              href="https://www.x.com/video_hub"
              aria-label="Twitter (X)"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-700 hover:border-red-600 transition-colors cursor-pointer"
            >
              <SiX className="text-gray-400 hover:text-red-600" size={18} />
            </a> */}
            <div
              aria-label="Instagram"
              className="p-2 rounded-full border border-gray-700 hover:border-red-600 transition-colors "
            >
              <FaInstagram className="text-gray-400 hover:text-red-600" size={18} />
            </div>
            <div
              aria-label="YouTube"
              className="p-2 rounded-full border border-gray-700 hover:border-red-600 transition-colors"
            >
              <FaYoutube className="text-gray-400 hover:text-red-600" size={18} />
            </div>
          </div>
        </div>

        {/* Lists without links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 flex-grow max-w-4xl text-sm">
          <div>
            <h3 className="text-red-600 font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li>About Us</li>
              <li>Contact</li>
              <li>Pricing</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-red-600 font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Blog</li>
              <li>FAQ</li>
              <li>Support</li>
              <li>Tutorials</li>
            </ul>
          </div>

          <div>
            <h3 className="text-red-600 font-semibold mb-4">Community</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Forums</li>
              <li>Events</li>
              <li>Partners</li>
            </ul>
          </div>

          <div>
            <h3 className="text-red-600 font-semibold mb-4">More</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Terms & Conditions</li>
              <li>Refund Policy</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* disclaimer + copyright */}
      <div className="flex flex-col mt-10 border-t border-zinc-800 pt-6 text-center text-gray-500 text-xs select-none space-y-2">
        <p className="text-gray-500 px-4 md:px-0">
          <strong>Disclaimer:</strong> Vyomify features demo profiles using names and videos of popular creators.
          These are unofficial and created solely for showcasing the project.
        </p>
        <span>© 2025 Vyomify. All rights reserved.</span>
        <span>Made with ❤️ and code</span>
      </div>

    </section>
  );
}
