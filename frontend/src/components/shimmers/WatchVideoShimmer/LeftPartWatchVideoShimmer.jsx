import React from "react";

const LeftPartWatchVideoShimmer = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Video player shimmer */}
      <div className="w-full h-[150px] sm:h-[200px] md:h-[300px] lg:h-[550px] bg-neutral-800 rounded-md" />

      {/* Video title/details shimmer */}
      <div className="space-y-2 px-2">
        <div className="h-6 w-3/4 bg-neutral-800 rounded" />
        <div className="h-4 w-1/2 bg-neutral-700 rounded" />
      </div>

      {/* Video detail part 2 shimmer */}
      <div className="px-2 space-y-2">
        <div className="h-4 w-2/3 bg-neutral-800 rounded" />
        <div className="h-3 w-5/6 bg-neutral-700 rounded" />
        <div className="h-3 w-4/5 bg-neutral-700 rounded" />
      </div>

      {/* Comments shimmer */}
      <div className="px-2 space-y-4">
        <div className="h-4 w-1/4 bg-neutral-800 rounded" />
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="flex space-x-2">
            <div className="w-7 h-7 bg-neutral-700 rounded-full" />
            <div className="flex-1 space-y-1">
              <div className="w-24 h-3 bg-neutral-800 rounded" />
              <div className="w-full h-3 bg-neutral-700 rounded" />
              <div className="w-3/4 h-3 bg-neutral-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftPartWatchVideoShimmer;
