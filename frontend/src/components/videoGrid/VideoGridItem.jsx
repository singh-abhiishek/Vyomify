import { useEffect, useRef, useState } from "react";
import {  BiVolumeMute } from "react-icons/bi";
import { MdMoreVert} from "react-icons/md";
import { GoUnmute } from "react-icons/go";
import { formatDuration } from "../../utils/formatDuration";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

export const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: "compact",
});

//NOTE: to show on home and profile page 
const VideoGridItem = ({
    _id,
    title,
    thumbnail,
    videoFile,
    views,
    // owner,
    ownerDetails,
    createdAt,
    duration,
}) => {

    // console.log("onwer", ownerDetails)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const [remainingDuration, setRemainingDuration] = useState(duration);

    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleTimeUpdate = () => {
            const remainingTime = duration - videoElement.currentTime;
            setRemainingDuration(Math.max(remainingTime, 0)); // if video is played on hover
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
        e.preventDefault()
        // console.log(_id)
        navigate(
            '/explore/watchVideo',
            {
                state: _id, // "state" is the default key
            }
        )
    }

    // on click open menu bar 
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const handleClickOnVertButton = (e, _id) => {
        e.preventDefault();
        setIsMenuOpen(prev => !prev)
        setVideoId(_id)
    }

    return (
        <div
            className="flex flex-col gap-2 w-[350px] relative"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
        >
            {/* Thumbnail + Video */}
            <div className="relative w-full aspect-video overflow-hidden rounded-xl cursor-pointer">
                <div
                    onClick={(e) => navigateToWatchVideoPage(e, _id)}
                    className="block w-full h-full relative">
                    <img
                        src={thumbnail}
                        alt="Thumbnail"
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-200 ${isVideoPlaying ? "opacity-0" : "opacity-100"
                            }`}
                        loading="lazy"
                    />
                    <video
                        ref={videoRef}
                        muted={isVideoMuted}
                        playsInline
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-200 ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
                            }`}
                        src={videoFile}
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-sm px-2 py-0.5 rounded">
                        {formatDuration(remainingDuration)}
                    </div>
                </div>

                {/* Volume Icon */}
                {isVideoPlaying && (
                    <div>
                        {isVideoMuted ? (
                            <BiVolumeMute
                                className="absolute p-[6px] rounded-full cursor-pointer top-4 right-1 bg-black bg-opacity-70 text-white"
                                size={28}
                                onClick={() => setIsVideoMuted(false)}
                            />
                        ) : (
                            <GoUnmute
                                className="absolute p-[6px] rounded-full cursor-pointer top-4 right-1 bg-black bg-opacity-70 text-white"
                                size={28}
                                onClick={() => setIsVideoMuted(true)}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Video Info */}
            <div className="relative flex gap-2 mt-2 justify-between">
                <div className="flex gap-1">
                    <Link
                        to={`/explore/profile/${ownerDetails?.username}`}
                        className="flex-shrink-0 cursor-pointer">
                        <img
                            src={ownerDetails?.avatar}
                            alt={ownerDetails?.fullName}
                            className="w-10 h-10 object-cover rounded-full"
                            loading="lazy"
                        />
                    </Link>

                    <div className="flex flex-col overflow-hidden">
                        <div
                            onClick={(e) => navigateToWatchVideoPage(e, _id)}
                            className="font-semibold text-base line-clamp-2 cursor-pointer"
                        >
                            {title}
                        </div>
                        <Link
                            to={`/explore/profile/${ownerDetails?.username}`}
                            className="text-sm text-gray-200 truncate"
                        >
                            {ownerDetails?.fullName}
                        </Link>
                        <div className="text-sm text-gray-400">
                            {VIEW_FORMATTER.format(views)} Views • {getTimeAgo(createdAt)}
                        </div>
                    </div>
                </div>


                <div
                    className=""
                >
                    <MdMoreVert
                        onClick={(e) => handleClickOnVertButton(e, _id)}
                        className="cursor-pointer"
                        size={24} />
                </div>
            </div>

            {isMenuOpen && <MenuItem videoId={videoId}/>}

        </div>
    );
};

export default VideoGridItem;
