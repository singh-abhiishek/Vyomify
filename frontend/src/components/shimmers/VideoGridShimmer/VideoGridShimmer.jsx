import './VideoGridShimmer.css';

const VideoGridShimmer = ({isHeading = false}) => {
  return (
    <>
      {isHeading && <div className="flex flex-col items-center mb-2 sm:mb-4">
        {/* Large heading shimmer block */}
        <div className="shimmer w-[220px] sm:w-[280px] h-5 sm:h-8 rounded-md mb-1.5" />

        {/* Subtitle shimmer block */}
        {/* <div className="block sm:hidden shimmer w-[140px] sm:w-[0px] h-5 rounded-md mb-3 " /> */}

        {/* Gradient underline shimmer */}
        <div className="shimmer w-16 h-1 rounded-full" />
      </div>}

      <div className="flex flex-wrap gap-4 mt-0.5">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-1 w-[244px] sm:w-[250px] md:w-[330px] lg:w-[300px] xl:w-[345px]">
            <div className="w-full aspect-video bg-gray-800 rounded-xl shimmer"></div>

            <div className="flex gap-2 mt-1 sm:mt-2">
              <div className=" avatar shimmer"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 bg-gray-800 rounded w-3/4 shimmer"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 shimmer"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3 shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoGridShimmer;
