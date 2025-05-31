import { useEffect, useRef, useState } from "react";
import { BiVolumeMute } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";
import { formatDuration } from "../../utils/formatDuration";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../../utils/loadingIndicator";
import { MdMoreVert } from "react-icons/md";
import MenuItem from "./MenuItem";
import useOutsideClick from "../../hooks/UseOutsideClick";

export const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: "compact",
});

const VideoGridItem2 = ({
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
        // e.preventDefault();
        navigate(
            '/explore/watchVideo',
            {
                state: _id,
            }
        );
    }

    // on click open menu bar 
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    // This hook listens for outside click, and close the pop up modal
    const modalRef = useRef()
    useOutsideClick(modalRef, () => setIsMenuOpen(false), isMenuOpen);

    const [videoId, setVideoId] = useState(null)
    const handleClickOnVertButton = (e, _id) => {
        e.preventDefault();
        setIsMenuOpen(prev => !prev)
        setVideoId(_id)
    }
    return (
        <div
            className="flex flex-row items-start gap-2 p-3 w-full rounded-xl hover:bg-white/5 transition-colors duration-200"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
        >
            {/* Thumbnail + Video */}
            <div className="relative w-[55%] h-[80px] lg:h-auto lg:w-[40%] aspect-[16/9] rounded-lg overflow-hidden group cursor-pointer shrink-0">
                <div
                    onClick={(e) => navigateToWatchVideoPage(e, _id)}
                    className="relative w-full h-full"
                >
                    <img
                        src={thumbnail}
                        alt="Thumbnail"
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? "opacity-0" : "opacity-100"
                            }`}
                    />
                    <video
                        ref={videoRef}
                        muted={isVideoMuted}
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? "opacity-100" : "opacity-0"
                            }`}
                        src={videoFile}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                        {formatDuration(remainingDuration)}
                    </div>
                </div>

                {/* Volume Toggle */}
                {isVideoPlaying && (
                    <div className="absolute top-2 right-2 z-10">
                        {isVideoMuted ? (
                            <BiVolumeMute
                                className="p-1 bg-black/70 rounded-full text-white cursor-pointer"
                                size={20}
                                onClick={() => setIsVideoMuted(false)}
                            />
                        ) : (
                            <GoUnmute
                                className="p-1 bg-black/70 rounded-full text-white cursor-pointer"
                                size={20}
                                onClick={() => setIsVideoMuted(true)}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Video Info */}
            <div className="flex flex-col justify-between flex-1 overflow-hidden text-white">
                <div className="flex justify-between items-start">
                    <div
                        onClick={(e) => navigateToWatchVideoPage(e, _id)}
                        className="font-medium text-[13px] sm:text-sm cursor-pointer line-clamp-1 lg:line-clamp-2 leading-snug"
                    >
                        {title}
                    </div>
                    <MdMoreVert
                        onClick={(e) => handleClickOnVertButton(e, _id)}
                        className="cursor-pointer text-white shrink-0 ml-2"
                        size={20}
                    />
                </div>

                <Link
                    to={`/explore/profile/${ownerDetails?.username}`}
                    className="text-xs text-gray-300 truncate mt-0.5"
                >
                    @{ownerDetails?.username}
                </Link>

                <div className="text-xs text-gray-400 mt-0.5">
                    {VIEW_FORMATTER.format(views)} views • {getTimeAgo(createdAt)}
                </div>

                {isMenuOpen && (
                    <MenuItem videoId={videoId} modalRef={modalRef} setIsMenuOpen={setIsMenuOpen} />
                )}
            </div>
        </div>


    )
}

export default VideoGridItem2