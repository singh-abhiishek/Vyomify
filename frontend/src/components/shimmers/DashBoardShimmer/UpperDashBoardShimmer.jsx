import React from "react";

const UpperDashBoardShimmer = () => {
  return (
    <div className="flex flex-col animate-pulse">

      {/* First Part */}
      <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
        
        {/* Cover Image */}
        <div className="w-full h-32 sm:h-44 bg-neutral-800 rounded-md" />

        {/* Avatar */}
        <div className="-mt-8 sm:-mt-12 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-neutral-700 border-4 border-black" />

        {/* Profile Info Box */}
        <div className="mt-2 px-4 py-3 rounded-lg bg-[#121212] text-center sm:text-left shadow-[0_2px_10px_rgba(0,0,0,0.3)] border border-white/10 space-y-3 w-[90%] sm:w-[400px]">
          <div className="h-4 w-40 bg-neutral-700 rounded-md mx-auto sm:mx-0" />
          <div className="h-4 w-48 bg-neutral-700 rounded-md mx-auto sm:mx-0" />
          <div className="h-4 w-52 bg-neutral-700 rounded-md mx-auto sm:mx-0" />
          <div className="h-0.5 bg-neutral-800 my-2" />
          <div className="h-3 w-48 bg-neutral-700 rounded-md mx-auto sm:mx-0" />
          <div className="h-3 w-48 bg-neutral-700 rounded-md mx-auto sm:mx-0" />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 flex-grow w-full mt-4" />

      {/* Section Heading */}
      <div className="flex flex-col items-center mt-4">
        <div className="h-6 w-48 bg-neutral-700 rounded-md" />
        <div className="h-1 w-10 bg-gradient-to-r from-red-600 to-rose-500 mt-2 rounded-full" />
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 mb-2 px-4">
        {Array(6).fill(0).map((_, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 bg-[#121212] p-3 rounded-lg border border-white/10 shadow">
            <div className="w-6 h-6 bg-neutral-600 rounded-full" />
            <div className="h-3 w-16 bg-neutral-700 rounded-md" />
            <div className="h-4 w-12 bg-neutral-800 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpperDashBoardShimmer;
