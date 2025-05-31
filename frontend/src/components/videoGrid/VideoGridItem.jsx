import { useEffect, useRef, useState } from "react";
import { BiVolumeMute } from "react-icons/bi";
import { MdMoreVert } from "react-icons/md";
import { GoUnmute } from "react-icons/go";
import { formatDuration } from "../../utils/formatDuration";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import useOutsideClick from "../../hooks/UseOutsideClick";
import { usePlaylistModal } from "../../contextAPI/PlaylistModalContext ";

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
    const { isPF1Open } = usePlaylistModal()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    // This hook listens for outside click, and close the pop up modal
    const modalRef = useRef()
    useOutsideClick(modalRef, () => setIsMenuOpen(false), isMenuOpen, isPF1Open);

    const [videoId, setVideoId] = useState(null)
    const handleClickOnVertButton = (e, _id) => {
        e.preventDefault();
        setIsMenuOpen(prev => !prev)
        setVideoId(_id)
    }

    return (
        <div
            className="flex flex-col gap-1 w-[293px] sm:w-[250px] md:w-[330px] lg:w-[300px] xl:w-[345px]"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
        >
            {/* Thumbnail + Video */}
            <div className=" w-full aspect-video overflow-hidden rounded-xl cursor-pointer relative">
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

                {isVideoPlaying && (
                    <div className="absolute top-0 right-1 z-20">
                        {isVideoMuted ? (
                            <BiVolumeMute
                                className="p-1 bg-black/70 rounded-full text-white cursor-pointer"
                                size={22}
                                onClick={() => setIsVideoMuted(false)}
                            />
                        ) : (
                            <GoUnmute
                                className="p-1 bg-black/70 rounded-full text-white cursor-pointer"
                                size={22}
                                onClick={() => setIsVideoMuted(true)}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Video Info */}
            <div className="flex gap-2 mt-1 sm:mt-2 justify-between relative">
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
                            className="text-[13px] font-semibold sm:text-base line-clamp-2 cursor-pointer"
                        >
                            {title}
                        </div>
                        <Link
                            to={`/explore/profile/${ownerDetails?.username}`}
                            className="text-[12px] sm:text-sm text-gray-200 truncate"
                        >
                            {ownerDetails?.fullName}
                        </Link>
                        <div className="text-[12px] sm:text-sm text-gray-400">
                            {VIEW_FORMATTER.format(views)} Views • {getTimeAgo(createdAt)}
                        </div>
                    </div>
                </div>

                <div>
                    <MdMoreVert
                        onClick={(e) => handleClickOnVertButton(e, _id)}
                        className="cursor-pointer"
                        size={24} />
                </div>
                {isMenuOpen && <MenuItem modalRef={modalRef} videoId={videoId} />}
            </div>
        </div>
    );
};

export default VideoGridItem;
