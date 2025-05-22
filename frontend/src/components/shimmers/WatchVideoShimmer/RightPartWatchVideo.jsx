import React from "react";

const RightPartWatchVideoShimmer = () => {
  return (
    <div className="space-y-4 mt-2 animate-pulse">
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          className="flex gap-3 w-full"
        >
          {/* Thumbnail placeholder */}
          <div className="w-40 h-24 bg-neutral-700 rounded-md flex-shrink-0" />

          {/* Content placeholder */}
          <div className="flex flex-col justify-between flex-1 py-1 space-y-2">
            <div className="h-4 bg-neutral-600 rounded w-3/4" />
            <div className="h-3 bg-neutral-600 rounded w-1/2" />
            <div className="h-3 bg-neutral-600 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RightPartWatchVideoShimmer;
