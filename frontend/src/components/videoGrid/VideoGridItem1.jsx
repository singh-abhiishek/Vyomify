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
import { usePlaylistModal } from "../../contextAPI/PlaylistModalContext ";

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
    // e.preventDefault();
    navigate(
      '/explore/watchVideo',
      {
        state: _id,
      }
    );
  }

  const {isPF1Open} = usePlaylistModal()
  // on click open menu bar 
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
      className="relative flex flex-row gap-4 p-3 w-full hover:bg-zinc-800/20 transition-colors duration-200"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      {/* Thumbnail + Video */}
      <div className="relative w-[55%] h-[70px] sm:h-full sm:w-[35%] lg:w-[25%] xl:w-[24%] aspect-video rounded-md overflow-hidden group cursor-pointer shrink-0">
        <div
          onClick={(e) => navigateToWatchVideoPage(e, _id)}
          className="relative w-full h-full"
        >
          <img
            src={thumbnail}
            alt="Thumbnail"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300  ${isVideoPlaying ? "opacity-0" : "opacity-100"
              }`}
            loading="lazy"
          />
          <video
            ref={videoRef}
            muted={isVideoMuted}
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? "opacity-100" : "opacity-0"
              }`}
            src={videoFile}
          />
          <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(remainingDuration)}
          </div>
        </div>

        {isVideoPlaying && (
          <div className="absolute top-3 right-0 z-10">
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
      <div className=" flex flex-col flex-1 min-w-0 text-white ">
        {/* Title + More Button */}
        <div className="flex justify-between items-start gap-2">
          <div
            onClick={(e) => navigateToWatchVideoPage(e, _id)}
            className="font-semibold text-sm md:text-base cursor-pointer line-clamp-2 leading-tight"
          >
            {title}
          </div>
          <MdMoreVert
            onClick={(e) => handleClickOnVertButton(e, _id)}
            className="cursor-pointer text-white shrink-0"
            size={20}
          />
        </div>

        {/* Username + Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-xs text-gray-400 mt-0.5">
          <Link
            to={`/explore/profile/${ownerDetails?.username}`}
            className="text-gray-300 truncate hover:underline"
          >
            @{ownerDetails?.username}
          </Link>
          <span className="hidden sm:inline">•</span>
          <span>{VIEW_FORMATTER.format(views)} Views • {getTimeAgo(createdAt)}</span>
        </div>

        {/* Description */}
        <div className="hidden sm:block text-xs text-gray-400  mt-1 mr-2">
          {description}
        </div>

        {/* Menu if open */}
        {isMenuOpen && (
          <MenuItem videoId={videoId} setIsMenuOpen={setIsMenuOpen} modalRef={modalRef} />
        )}
      </div>
    </div>
  );
};

export default VideoGridItem1;
