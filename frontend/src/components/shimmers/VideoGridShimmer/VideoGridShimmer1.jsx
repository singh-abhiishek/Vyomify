import React from "react";
import "./VideoGridShimmer1.css";

const height = window.innerWidth < 427 ? 100 : 180;
// console.log(height)

const VideoGridShimmer1 = ({isWatchHistoryBtn = false}) => {
  return (
    <>
      <div className="flex flex-col items-center mb-2">
        {/* Large heading shimmer block */}
        <div className="shimmer w-[220px] sm:w-[280px] h-7 sm:h-8 rounded-md mb-1.5" />

        {/* Gradient underline shimmer */}
        <div className="shimmer w-16 h-1 rounded-full" />

        {isWatchHistoryBtn && <div className="shimmer w-[130px] sm:w-[140px] h-7 sm:h-8 rounded-md mt-3 sm:mt-6" />}
      </div>

      <div className="p-3 flex flex-col gap-4 w-full bg-black">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex gap-4 w-full rounded-md overflow-hidden cursor-pointer"
            style={{ height: `${height}px`, backgroundColor: "#121212" }}
          >
            {/* Thumbnail Placeholder */}
            <div className="w-[25%] aspect-video rounded-md shimmer" />

            {/* Text content placeholder */}
            <div className="flex flex-col flex-1 min-w-0 py-2 space-y-3">
              <div className="h-5 rounded shimmer-text w-3/4" />
              <div className="h-4 rounded shimmer-text w-1/2" />
              <div className="h-3 rounded shimmer-text w-full max-w-[70%]" />
            </div>
          </div>
        ))}
      </div>
    </>


  );
};

export default VideoGridShimmer1;
