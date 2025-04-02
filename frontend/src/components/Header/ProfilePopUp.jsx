import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";

const ProfilePopUp = ({sendDataToProfileButton}) => {
  const {fullName} = useSelector(state => state.auth?.userData?.user)

  return (
    <div className="relative ">
      {/* Dropdown */}
      <div className="origin-top-right z-10 rounded-[8px] absolute top-full min-w-60 bg-[#191919] text-white dark:bg-dark_50 dark:border-zinc-800 border border-gray-200 py-1.5  shadow-lg overflow-hidden mt-1 right-0">
        
        {/* Close Button */}
        <div className="flex justify-between mt-1 ">
          <div></div>
          <svg
            onClick={() => sendDataToProfileButton(false)}
            className="mr-2 cursor-pointer stroke-zinc-800 dark:stroke-zinc-400 "
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
            className="w-16 h-16 rounded-full object-cover"
            src="https://media.istockphoto.com/id/2149922267/vector/user-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=eftd9nEYQYSWX_yZsHtkoo47x5l_Jp_2b-J4iD1pGPY="
            width="32"
            height="32"
            alt="User"
            />
          <p className="mt-2 text-md font-bold">Hi, {fullName || "user"}</p>
        </div>

        {/* Dropdown Links */}
        <div className="flex flex-col items-start px-4 mt-3 space-y-3 mb-2">
          {/* Profile Link */}
          <Link
            to="/"
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


          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ProfilePopUp;
