import React, { useState, useRef } from 'react'
import { MdMoreVert } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { formatDuration } from '../../utils/formatDuration';
import { getTimeAgo } from '../../utils/getTimeAgo';
import MenuItem1 from './MenuItem1';
import useOutsideClick from "../../hooks/UseOutsideClick";

const PlaylistGridItem1 = ({
  _id,
  title,
  thumbnail,
  description,
  videoFile,
  views,
  ownerDetails,
  createdAt,
  duration,
  playlistName,
  playlistId,
  refetchPlaylistById,
  playlistOwnerId
}) => {
  // console.log(playlistOwnerId)

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

  // on click open menu bar 
  const [isMenu1Open, setIsMenu1Open] = useState(false)
  // This hook listens for outside click, and close the pop up modal
  const modalRef = useRef()
  useOutsideClick(modalRef, () => setIsMenu1Open(false), isMenu1Open);

  const [videoId, setVideoId] = useState(null)
  const handleClickOnVertButton = (e, _id) => {
    e.preventDefault();
    setIsMenu1Open(prev => !prev)
    setVideoId(_id)
  }


  return (
    <div className=" relative flex gap-1 sm:gap-4 w-full h-[93px] sm:h-[145px] md:h-[150px] p-1.5 sm:p-2">
      {/* Thumbnail */}
      <div
        onClick={(e) => navigateToWatchVideoPage(e, _id)}
        className="relative aspect-video w-[58%] sm:w-[35%] lg:w-[25%] xl:w-[24%] xl:p-2 rounded-md overflow-hidden group cursor-pointer shrink-0"
      >
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-full h-full object-cover absolute"
          loading="lazy"
        />
        <div className="absolute bottom-0.5 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(duration)}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-grow items-start justify-between gap-2 overflow-hidden p-1">
        {/* Text Info */}
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Title */}
          <div
            onClick={(e) => navigateToWatchVideoPage(e, _id)}
            className="font-semibold text-xs sm:text-sm line-clamp-2 cursor-pointer text-white"
          >
            {title}
          </div>

          {/* Channel & Meta */}
          <div className="flex flex-wrap items-center gap-x-1 text-[10px] sm:text-sm text-gray-300 overflow-hidden mt-0.5 sm:mt-1">
            <Link
              to={`/explore/profile/${ownerDetails?.username}`}
              className="truncate max-w-[80px] sm:max-w-[150px]"
            >
              @{ownerDetails?.username}
            </Link>
            <span className="hidden sm:inline">·</span>

            <span className="truncate max-w-[60px] sm:max-w-[100px]">
              {views} views
            </span>
            <span className="hidden sm:inline">·</span>

            <span className="truncate max-w-[70px] sm:max-w-[100px]">
              {getTimeAgo(createdAt)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-1 text-[10px] sm:text-sm text-gray-300 overflow-hidden mt-0.5 sm:mt-1">
            <span className="md:line-clamp-2 hidden sm:block">
              {description}
            </span>
          </div>
        </div>

        {/* Menu Icon */}
        <div className="flex-shrink-0 pt-0.5 sm:pt-1">
          <MdMoreVert
            onClick={(e) => handleClickOnVertButton(e, _id)}
            className="cursor-pointer text-white hover:text-gray-300"
            size={20}
          />
        </div>

        {isMenu1Open && (
          <MenuItem1
            playlistOwnerId={playlistOwnerId}
            videoId={videoId}
            playlistId={playlistId}
            setIsMenu1Open={setIsMenu1Open}
            playlistName={playlistName}
            refetchPlaylistById={refetchPlaylistById}
            modalRef={modalRef}
          />
        )}
      </div>
    </div>
  );
};


export default PlaylistGridItem1