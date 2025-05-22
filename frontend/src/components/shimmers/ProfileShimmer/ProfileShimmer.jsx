import React from "react";
import './ProfileShimmer.css';

const ProfileShimmer = () => {
  return (
    <div className="dark:bg-black text-white w-full">
      {/* Cover Image */}
      <div className="w-full h-20 sm:h-40 md:h-48 shimmer mb-4 rounded-none" />

      {/* Avatar and user info */}
      <div className="flex gap-1 items-center px-0">
        {/* Avatar */}
        <div className="avatar1 shimmer" />

        {/* Text Info */}
        <div className="flex flex-col gap-2">
          <div className="shimmer w-28 sm:w-40 md:w-60 h-4 sm:h-5 md:h-6 rounded-md" />
          <div className="shimmer w-20 sm:w-24 h-3 sm:h-4 rounded-md" />
          <div className="flex gap-2">
            <div className="shimmer w-16 sm:w-20 h-3 sm:h-4 rounded-md" />
            <div className="shimmer w-16 sm:w-20 h-3 sm:h-4 rounded-md" />
          </div>
          <div className="shimmer w-20 sm:w-24 h-6 sm:h-8 rounded-md mt-1" />
        </div>
      </div>

      {/* Buttons (Videos, Posts, Playlist) */}
      <div className="flex mt-6 gap-3 md:gap-4 px-4 flex-wrap">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="shimmer w-15 md:w-19 h-6 md:h-7 rounded-md" />
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-5 w-full" />

      {/* Active Component Shimmer */}
      <div className="px-4 sm:px-6 flex flex-wrap w-full gap-4">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="shimmer h-50 w-full sm:w-[48%] lg:w-[23%] rounded-lg mb-4"
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileShimmer;
