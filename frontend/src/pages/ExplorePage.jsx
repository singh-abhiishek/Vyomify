import React, { useState } from "react";

const ExplorePage = () => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="bg-amber-300 w-[20%] flex flex-col items-start p-4">
        <h2 className="text-xl font-bold mb-8">Explore</h2>
        
        {/* Navbar Items */}
        <nav className="space-y-4 w-full">
          <div className="cursor-pointer hover:bg-amber-400 p-2 rounded">
            Home
          </div>
          <div className="cursor-pointer hover:bg-amber-400 p-2 rounded">
            Liked Videos
          </div>
          <div className="cursor-pointer hover:bg-amber-400 p-2 rounded">
            History
          </div>
          <div className="cursor-pointer hover:bg-amber-400 p-2 rounded">
            Playlist
          </div>
        </nav>
        
        {/* Settings and Support at the bottom */}
        <div className="mt-auto w-full space-y-4">
          <div className="cursor-pointer hover:bg-amber-400 p-2 rounded">
            Settings
          </div>
          <div className="cursor-pointer hover:bg-amber-400 p-2 rounded">
            Support
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="bg-red-500 w-[80%]">
        <h1 className="text-white text-3xl p-4">Right Section Content</h1>
      </div>
    </div>
  );
};

export default ExplorePage;
