import React from 'react'
import { Spinner } from "../../../utils/loadingIndicator.jsx"
import { useGetUserPlaylistsQuery } from '../../../store/slices/playlistApiSlice'
import PlaylistGridItem from "../../videoGrid/PlaylistGridItem.jsx"


const ProfilePlaylistPage = ({ userId }) => {

  // show playlists of user on which profile we are
  const { data: response, isLoading } = useGetUserPlaylistsQuery(userId)
  const profilePlaylists = response?.data
  // console.log("playlists from ProfilePlaylistPage", profilePlaylists)

  if (isLoading) {
    return <div className='bg-black text-white w-full flex flex-col items-center justify-center gap-2 py-10 text-center'>
      <Spinner /> <p className="text-3xl text-gray-400">Loading</p>
    </div>
  }

  // filter playlists :- remove watch later and private playlists
  const fileredPlaylists = profilePlaylists.filter(
    (playlist) => playlist?.name !== "Watch Later" && playlist.isPrivate === false
  )

  if (fileredPlaylists?.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 text-md sm:text-lg font-medium mt-30">
        This profile has no Playlists yet.
      </div>
    )
  }

  return (
    <div className="w-full px-6 py-4 flex flex-wrap gap-2 sm:gap-3">
      {/* Video Grid */}
      
        {fileredPlaylists?.map((playlist, index) => (
          (<div key={index}>
            <PlaylistGridItem {...playlist} />
          </div>)
        ))}
      
    </div>
  )
}

export default ProfilePlaylistPage