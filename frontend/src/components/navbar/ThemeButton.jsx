import React, { useState } from "react";
import useTheme from "../../hooks/UseTheme.jsx";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

const themes = [
  { label: "System", icon: <FaDesktop />, value: "system" },
  { label: "Light", icon: <FaSun />, value: "light" },
  { label: "Dark", icon: <FaMoon />, value: "dark" },
];

const ThemeButton = () => {
  const [theme, setTheme] = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const handleThemeChange = (theme) => {
    setTheme(theme);
    setShowMenu(false);
  };

  const currentTheme = themes.find((t) => t.value === theme);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={showMenu}
        className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full bg-[#212121] text-white hover:bg-[#2c2c2c] transition"
      >
        {currentTheme?.icon}
        <span>Theme</span>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="origin-top-right z-10 rounded-[8px] absolute top-full min-w-38 bg-[#191919] text-white dark:bg-dark_50 dark:border-zinc-800 border border-gray-200 py-1.5 shadow-lg overflow-hidden mt-1 right-0">
          <div className="flex justify-between items-start">
            {/* Menu Options */}
            <div className="flex flex-col items-start px-2 mt-1 space-y-1 mb-1">
              {themes.map((theme) => (
                <button
                  key={theme.value}
                  type="button"
                  onClick={() => handleThemeChange(theme.value)}
                  className={`cursor-pointer font-medium flex items-center px-2 hover:bg-[#212121] hover:dark:bg-dark_40 w-full py-2 rounded-lg transition ${
                    theme === theme.value ? "bg-[#2c2c2c] font-semibold" : ""
                  }`}
                >
                  {theme.icon}
                  <span className="text-sm ml-2">{theme.label}</span>
                </button>
              ))}
            </div>

            {/* Close Button */}
            <svg
              onClick={() => setShowMenu(false)}
              className="mr-2 mt-2 cursor-pointer stroke-zinc-500 dark:stroke-zinc-400 hover:stroke-white transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeButton;
