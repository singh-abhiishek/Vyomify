import { useEffect, useRef, useState } from "react";
import { BiVolumeMute } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";
import { formatDuration } from "../../utils/formatDuration";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../../utils/loadingIndicator";

export const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: "compact",
});

const VideoGridItem1 = ({ 
    _id,
    title,
    thumbnail,
    description,
    videoFile,
    views,
    ownerDetails,
    createdAt,
    duration,
}) => {
    // console.log(title)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const [remainingDuration, setRemainingDuration] = useState(duration);

    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleTimeUpdate = () => {
            const remainingTime = duration - videoElement.currentTime;
            setRemainingDuration(Math.max(remainingTime, 0));
        };

        const toggleVideoState = async () => {
            if (isVideoPlaying) {
                try {
                    videoElement.currentTime = 0;
                    await videoElement.play();
                    videoElement.addEventListener("timeupdate", handleTimeUpdate);
                } catch (error) {
                    console.error("Error playing video", error);
                }
            } else {
                videoElement.pause();
                videoElement.removeEventListener("timeupdate", handleTimeUpdate);
                setRemainingDuration(duration);
            }
        };

        toggleVideoState();

        return () => {
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [isVideoPlaying, duration]);

    const navigate = useNavigate();
    const navigateToWatchVideoPage = (e, _id) => {
        e.preventDefault();
        navigate(
            '/explore/watchVideo',
            {
                state: _id,
            }
        );
    }

    return (
        <div
            className="flex ml-9 gap-4 w-full h-[200px] p-2"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
        >
            {/* Thumbnail + Video */}
            <div className="relative  aspect-video overflow-hidden rounded-xl cursor-pointer group ">
                <div
                    onClick={(e) => navigateToWatchVideoPage(e, _id)}
                    className="relative w-full h-full group-hover:opacity-100 transition-all duration-300"
                >
                    {/* Video Thumbnail */}
                    <img
                        src={thumbnail}
                        alt="Thumbnail"
                        className={`w-full h-full object-cover overflow-hidden absolute inset-0 transition-opacity duration-300 ${isVideoPlaying ? "opacity-0" : "opacity-100"}`}
                        loading="lazy"
                    />
                    {/* Video Player */}
                    <video
                        ref={videoRef}
                        muted={isVideoMuted}
                        playsInline
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isVideoPlaying ? "opacity-100" : "opacity-0"}`}
                        src={videoFile}
                    />
                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(remainingDuration)}
                    </div>
                </div>

                {/* Volume Icon */}
                {isVideoPlaying && (
                    <div className="absolute top-4 right-4 z-10">
                        {isVideoMuted ? (
                            <BiVolumeMute
                                className="p-2 rounded-full cursor-pointer bg-black bg-opacity-70 text-white"
                                size={28}
                                onClick={() => setIsVideoMuted(false)}
                            />
                        ) : (
                            <GoUnmute
                                className="p-2 rounded-full cursor-pointer bg-black bg-opacity-70 text-white"
                                size={28}
                                onClick={() => setIsVideoMuted(true)}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Video Info */}
            <div className="flex gap-3 mt-2 w-[55%] p-1">
                {/* Owner Avatar */}
                {/* <Link
                     to={`/explore/profile/${ownerDetails?.username}`}
                    className="flex-shrink-0 cursor-pointer"
                >
                    <img
                        src={ownerDetails?.avatar}
                        alt={ownerDetails?.fullName}
                        className="w-12 h-12 object-cover rounded-full"
                        loading="lazy"
                    />
                </Link> */}

                {/* Video Title & Info */}
                <div className="flex flex-col flex-grow mr-1">
                    <div
                        onClick={(e) => navigateToWatchVideoPage(e, _id)}
                        className="font-semibold text-lg line-clamp-2 cursor-pointer text-white"
                    >
                        {title}
                    </div>
                    <Link
                        to={`/explore/profile/${ownerDetails?.username}`}
                        className="text-sm text-gray-500 truncate"
                    >
                        {ownerDetails?.fullName}
                    </Link>
                    <div className="text-sm text-gray-400">
                        {VIEW_FORMATTER.format(views)} Views • {getTimeAgo(createdAt)}
                    </div>
                    <div className="text-sm text-gray-400">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoGridItem1;
