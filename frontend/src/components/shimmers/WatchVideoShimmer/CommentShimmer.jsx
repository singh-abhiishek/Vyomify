import React from "react";

const CommentShimmer = () => {
  return (
    <div className="flex space-x-2 p-1 animate-pulse">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-neutral-700" />

      <div className="flex-1 space-y-1">
        {/* Username and Timestamp */}
        <div className="flex items-center gap-2">
          <div className="w-24 h-3 bg-neutral-700 rounded" />
          <div className="w-16 h-2.5 bg-neutral-800 rounded" />
        </div>

        {/* Comment Text */}
        <div className="w-full h-4 bg-neutral-800 rounded" />
        <div className="w-3/4 h-3 bg-neutral-800 rounded" />

        {/* Like Button */}
        <div className="flex gap-2 mt-1">
          <div className="h-5 w-14 bg-neutral-700 rounded-full" />
        </div>
      </div>

      {/* Edit/Delete Buttons */}
      <div className="flex flex-col justify-start gap-2">
        <div className="w-4 h-4 bg-neutral-700 rounded" />
        <div className="w-4 h-4 bg-neutral-700 rounded" />
      </div>
    </div>
  );
};

export default CommentShimmer;
