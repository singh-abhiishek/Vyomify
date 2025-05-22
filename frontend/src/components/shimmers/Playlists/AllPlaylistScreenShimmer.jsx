import React from 'react';

const AllPlaylistScreenShimmer = () => {
  return (
    <div className="bg-black text-white w-full flex flex-col lg:flex-row gap-4 animate-pulse p-4">
      {/* Left Playlist Info Card */}
      <div className="w-full lg:max-w-sm bg-neutral-900 rounded-xl overflow-hidden shadow-lg border border-neutral-800 p-2.5 sm:p-4 flex flex-col md:flex-row lg:flex-col gap-4 text-gray-200">
        
        {/* Thumbnail Placeholder */}
        <div className="w-full md:w-[50%] lg:w-full h-32 sm:h-40 md:h-48 p-1 md:p-2 rounded-lg bg-neutral-800" />

        {/* Playlist Content */}
        <div className="flex flex-col justify-between flex-1 gap-2">
          {/* Title and Description */}
          <div>
            <div className="w-2/3 h-5 bg-neutral-700 rounded" />
            <div className="w-full h-3 bg-neutral-800 rounded mt-2" />
          </div>

          {/* Owner Info */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-10 h-10 bg-neutral-700 rounded-full" />
            <div className="space-y-1">
              <div className="w-20 h-3 bg-neutral-700 rounded" />
              <div className="w-24 h-4 bg-neutral-800 rounded" />
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-2 text-xs text-gray-400 mt-2">
            <div className="w-24 h-3 bg-neutral-800 rounded" />
            <div className="w-28 h-3 bg-neutral-800 rounded" />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="h-6 w-16 bg-neutral-800 rounded-full" />
            <div className="h-6 w-20 bg-neutral-800 rounded-full" />
            <div className="h-6 w-24 bg-neutral-800 rounded-full" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 text-lg mt-4">
            <div className="w-6 h-6 bg-neutral-700 rounded" />
            <div className="w-6 h-6 bg-neutral-700 rounded" />
          </div>

          <div className='md:h-[280px] hidden lg:block'></div>
        </div>
      </div>

      {/* Right side: Vertical video list */}
      <div className="w-full flex flex-col gap-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-row gap-3"
            >
              {/* Video Thumbnail */}
              <div className="w-full md:w-48 h-28 bg-neutral-800 rounded-lg" />

              {/* Video Info */}
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-4 bg-neutral-700 rounded" />
                <div className="w-1/2 h-3 bg-neutral-800 rounded" />
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-24 h-3 bg-neutral-800 rounded" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllPlaylistScreenShimmer;
