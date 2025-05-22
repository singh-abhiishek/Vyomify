import React from "react";

const LowerDashBoardShimmer = () => {
  return (
    <div className="w-full overflow-x-auto animate-pulse">
      <div className="min-w-[900px]">
        {/* Header */}
        <div className="grid grid-cols-9 gap-4 px-4 py-2 bg-gray-800 text-gray-200 font-semibold text-sm rounded-t-md">
          <div>Thumbnail</div>
          <div>Details</div>
          <div>Likes</div>
          <div>Views</div>
          <div>Uploaded</div>
          <div>Last Edited</div>
          <div>Status</div>
          <div>Toggle</div>
          <div>Delete</div>
        </div>

        {/* Placeholder rows */}
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-9 gap-4 px-4 py-3 border-b border-gray-700 items-center"
            >
              <div className="w-16 h-10 bg-neutral-700 rounded-md" />
              <div className="space-y-1">
                <div className="w-24 h-3 bg-neutral-700 rounded-md" />
                <div className="w-32 h-2 bg-neutral-800 rounded-md" />
              </div>
              <div className="w-8 h-3 bg-neutral-700 rounded-md" />
              <div className="w-10 h-3 bg-neutral-700 rounded-md" />
              <div className="w-20 h-3 bg-neutral-700 rounded-md" />
              <div className="w-24 h-3 bg-neutral-700 rounded-md" />
              <div className="w-16 h-4 bg-neutral-700 rounded-full" />
              <div className="w-10 h-5 bg-neutral-700 rounded" />
              <div className="w-6 h-6 bg-neutral-700 rounded" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LowerDashBoardShimmer;
