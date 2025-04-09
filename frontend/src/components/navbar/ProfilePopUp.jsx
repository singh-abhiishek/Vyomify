import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";

const ProfilePopUp = ({sendDataToProfileButton}) => {
  const {fullName} = useSelector(state => state.auth?.userData?.user)

  return (
    <div className="relative ">
      {/* Dropdown */}
      <div className="origin-top-right z-8 rounded-[12px] absolute top-full min-w-48 bg-[#191919] text-white dark:bg-dark_50 dark:border-zinc-800 border border-gray-200 py-1 shadow-lg overflow-hidden mt-1 right-0 md:min-w-50 md:z-10 md:py-1.5 lg:min-w-54 lg:z-12">
        
        {/* Close Button */}
        <div className="flex justify-between mt-1">
          <div></div>
          <svg
            onClick={() => sendDataToProfileButton(false)}
            className="mr-2 cursor-pointer stroke-zinc-800 dark:stroke-zinc-400 hover:stroke-white transition-colors duration-200"
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

        {/* User Avatar & Greeting */}
        <div className="flex justify-center items-center flex-col">
        <img
            className="w-13 h-13 lg:w-16 lg:h-16 rounded-full object-cover"
            src="https://media.istockphoto.com/id/2149922267/vector/user-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=eftd9nEYQYSWX_yZsHtkoo47x5l_Jp_2b-J4iD1pGPY="
            width="32"
            height="32"
            alt="User"
            />
          <p className="mt-2 text-sm font-medium lg:text-md lg:font-bold">Hi, {fullName || "user"}</p>
        </div>

        {/* Dropdown Links */}
        <div className="flex flex-col items-start px-3 mt-2 space-y-2 mb-1.5 lg:px-4 lg:mt-3 lg:space-y-3 lg:mb-2">
          {/* Profile Link */}
          <Link
            to="/"
            onClick={() => sendDataToProfileButton(false)}
            className="font-medium flex items-center px-2 hover:bg-[#212121] hover:dark:bg-dark_40 w-full py-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="flex-shrink-0 h-5 w-5"
            >
              <path
                strokeWidth="1.5"
                className="text-gray-400"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span className="text-sm ml-2">Profile</span>
          </Link>

          {/* Logout button  */}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ProfilePopUp;
