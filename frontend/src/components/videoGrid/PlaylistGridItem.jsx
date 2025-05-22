import React from 'react'
import { getTimeAgo } from '../../utils/getTimeAgo'
import { useNavigate } from 'react-router-dom'
import { MdOutlinePlaylistPlay, MdPlaylistPlay, } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";


const PlaylistGridItem = ({
  _id,
  videoInfo,
  description,
  isPrivate,
  name,
  owner,
  createdAt,
  updatedAt,
}) => {

  const navigate = useNavigate()
  const handleSeeFullPlaylist = (e, playlistId) => {
    e.preventDefault()
    navigate(
      `/explore/playlists/${playlistId}`, // single playlist screen
      { state: owner } // playlist owner
    )
  }

  return (
    <div
      onClick={(e) => handleSeeFullPlaylist(e, _id)}
      className="w-full sm:w-[320px] md:w-[310px] lg:w-[340px] bg-[#121212] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-[#3f3f3f] hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      {/* Thumbnail stack */}
      <div className="relative w-full aspect-video flex items-center justify-center">
        {/* Background layered thumbnails */}
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="w-[88%] h-[88%] bg-[#2a2a2a] rounded-xl translate-y-3 translate-x-3"></div>
          <div className="w-[92%] h-[92%] bg-[#1f1f1f] rounded-xl translate-y-1.5 translate-x-1.5"></div>
        </div>

        {/* Main Thumbnail */}
        <img
          src={videoInfo?.thumbnail || "/default-thumbnail.jpg"}
          alt="Playlist Thumbnail"
          className="w-[95%] h-[95%] object-cover rounded-md relative z-10 shadow-md"
        />

        {/* Video Count Badge */}
        <div className="absolute bottom-2 right-4 text-xs bg-black/70 text-white px-1 py-[2px] rounded z-20 flex items-center justify-center">
          <MdPlaylistPlay size={18} />{!videoInfo?.totalVideoCount
            ? "No Video"
            : videoInfo.totalVideoCount === 1
              ? "1 Video"
              : `${videoInfo.totalVideoCount} Videos`}
        </div>
      </div>

      {/* Playlist Info */}
      <div className="p-4 text-white space-y-1">
        <h3 className="text-base font-semibold truncate text-gray-100">{name}</h3>
        <p className="text-xs text-gray-400 flex">
          {isPrivate ? 'Private' : 'Public'}
          {isPrivate && <HiLockClosed size={13} />}
          · Updated {getTimeAgo(updatedAt)}
        </p>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="pt-2">
          <button className="group inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200">
            View full playlist
            <svg
              className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>


  )
}

export default PlaylistGridItem
