import React from "react";

const PlaylistShimmer = ({length = 8}) => {
  return (
    <>
      <style>{`
        .shimmer {
          position: relative;
          overflow: hidden;
          background-color: #2d2d2d;
          border-radius: 0.5rem; /* same as rounded-lg */
        }
        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150px;
          height: 100%;
          width: 150px;
          background: linear-gradient(
            to right,
            rgba(255,255,255,0),
            rgba(255,255,255,0.1),
            rgba(255,255,255,0)
          );
          animation: shimmer 1.5s infinite;
          z-index: 1;
          pointer-events: none;
          border-radius: inherit;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      <div className="flex flex-col items-center mb-2 sm:mb-4">
        {/* Large heading shimmer block */}
        <div className="shimmer w-[220px] sm:w-[280px] h-5 sm:h-8 rounded-md mb-1.5" />

        {/* Subtitle shimmer block */}
        <div className="block sm:hidden shimmer w-[140px] sm:w-[0px] h-5 rounded-md mb-3 " />

        {/* Gradient underline shimmer */}
        <div className="shimmer w-16 h-1 rounded-full" />
      </div>


      <div className="flex flex-wrap gap-3 px-6">
        {[...Array(length)].map((_, idx) => (
          <div 
          key={idx}
          className="w-full mt-2 sm:w-[320px] md:w-[310px] lg:w-[340px] bg-[#121212] rounded-lg overflow-hidden border border-[#2a2a2a] mx-auto">
            {/* Thumbnail placeholder */}
            <div className="relative w-full aspect-video flex items-center justify-center">
              <div className="shimmer w-[95%] h-[92%]" />
            </div>

            {/* Playlist information placeholders */}
            <div className="p-4 space-y-3">
              <div className="shimmer w-3/4 h-5" />
              <div className="shimmer w-1/2 h-4" />
              <div className="shimmer w-full h-8 rounded-md" />
              <div className="shimmer w-1/3 h-6 rounded-md" />
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default PlaylistShimmer;
