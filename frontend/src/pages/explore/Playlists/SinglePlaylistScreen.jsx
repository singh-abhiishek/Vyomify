import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { FormatDate } from '../../../utils/FormatDate';
import { useGetPlaylistByIdQuery } from '../../../store/slices/playlistApiSlice';
import PlaylistGridItem1 from '../../../components/videoGrid/PlaylistGridItem1';
import UpdatePlaylist from './UpdatePlaylist';
import DeletePlaylist from './DeletePlaylist';
import { useSelector } from 'react-redux';
import { HiLockClosed } from "react-icons/hi";

const SinglePlaylistScreen = () => {

  // get playlist id from params
  const { playlistId } = useParams();
  // console.log("from single playlist screen", playlistId)

  // playlist ownerId, we send it while navigating without exposing it in the URL
  const location = useLocation()
  const playlistOwnerId = location?.state
  // console.log("from singleplaylistscreen location", playlistOwnerId, location) 

  // fetch playlist details
  const { data: response, refetch } = useGetPlaylistByIdQuery(playlistId)
  const playlist = response?.data
  const playlistVideos = playlist?.videos
  const playlistOwner = playlist?.playlistOwner
  const videoCount = playlistVideos?.length

  // console.log(videoCount)
  // console.log("playlist details from SinglePlaylistScreen", playlist)

  // login user
  const user = useSelector(state => state?.auth?.userData?.user)

  return (
    <div className="bg-black text-white w-full flex flex-col lg:flex-row gap-4 md:h-[85vh] lg:h-[90vh]">

      {/* left side  */}
      <div className="w-full md:max-w-full lg:max-w-sm bg-neutral-900 rounded-xl overflow-hidden shadow-lg border border-neutral-800 p-2.5 sm:p-4 flex flex-col md:flex-row lg:flex-col gap-4 text-gray-200 transition-all duration-300 hover:border-neutral-700">

        {/* Thumbnail */}
        <div className="w-full md:w-[50%] lg:w-full h-32 sm:h-50 md:h-50 p-1 md:p-2 rounded-lg overflow-hidden">
          {playlistVideos && (
            <img
              src={playlistVideos[0]?.thumbnail || "/default-thumbnail.jpg"}
              alt="thumbnail"
              className="w-full h-full object-cover overflow-hidden rounded-lg"
            />
          )}
        </div>

        {/* Playlist Content */}
        <div className="flex flex-col justify-between flex-1 gap-1 md:gap-2" >
          {/* Playlist Info */}
          <div>
            <h1 className="text-red-500 font-amaranth font-bold text-xl md:text-2xl truncate">{playlist?.name}</h1>
            <p className="text-sm text-gray-400 line-clamp-1">{playlist?.description}</p>
          </div>

          {/* Owner Info */}
          <div className="flex items-center gap-1.5">
            <Link
              to={`/explore/profile/${playlistOwner?.username}`}
            >
              <img
                src={playlistOwner?.avatar || "/default-avatar.jpg"}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border border-neutral-700"
              />
            </Link>
            <div className="leading-tight">
              <p className="text-xs text-gray-400">Created by</p>
              <Link
                to={`/explore/profile/${playlistOwner?.username}`}
                className="text-sm font-semibold text-red-500">@{playlistOwner?.username}</Link>
            </div>
          </div>

          {/* Dates */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>Created: {FormatDate(playlist?.createdAt)}</p>
            <p>Updated: {FormatDate(playlist?.updatedAt)}</p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-2 text-xs mt-1">
            <span className="bg-neutral-800 px-2 py-1 rounded-full flex gap-0.5">
              {playlist?.isPrivate ? "Private" : "Public"}
              {playlist?.isPrivate && <HiLockClosed size={13}  />}
            </span>
            <span className="bg-neutral-800 px-2 py-1 rounded-full">
              {videoCount} {videoCount > 1 ? "Videos" : "Video"}
            </span>
            <span className="bg-neutral-800 px-2 py-1 rounded-full">{playlist?.totalViews || 0} Views</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 text-gray-400 text-lg mt-2">
            <UpdatePlaylist
              refetchPlaylistById={refetch}
              playlistId={playlistId}
              playlist={playlist}
              playlistOwnerId={playlistOwner?._id}
              loginUserId={user?._id}
            />
            <DeletePlaylist
              playlistId={playlistId}
              playlistOwnerId={playlistOwner?._id}
              loginUserId={user?._id}
            />
          </div>
        </div>

        <div className='md:h-[280px] hidden md:block'></div>
      </div>

      {/* right side  */}
      <div className='w-full '>
        {
          playlistVideos?.map((video) =>
            <PlaylistGridItem1
              key={video?._id}
              {...video}
              refetchPlaylistById={refetch}
              playlistName={playlist?.name}
              playlistId={playlist?._id}
              playlistOwnerId={playlistOwnerId}
            />
          )
        }
      </div>
    </div>
  )
}

export default SinglePlaylistScreen