import React from 'react'
import { Spinner } from "../../../utils/loadingIndicator.jsx"
import { useGetUserPlaylistsQuery } from '../../../store/slices/playlistApiSlice'
import PlaylistGridItem from "../../videoGrid/PlaylistGridItem.jsx"


const ProfilePlaylistPage = ({ userId }) => {

  // show playlists of user on which profile we are
  const { data: response, isLoading } = useGetUserPlaylistsQuery(userId)
  const profilePlaylists = response?.data
  console.log("playlists from ProfilePlaylistPage", profilePlaylists)

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
      <div className="flex items-center justify-center text-gray-500 text-lg font-medium">
        This profile has no playlists yet.
      </div>
    )
  }

  return (
    <div className="bg-neutral-950 text-white w-full px-6 py-4">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fileredPlaylists?.map((playlist, index) => (
          (<div key={index}>
            <PlaylistGridItem {...playlist} />
          </div>)
        ))}
      </div>
    </div>
  )
}

export default ProfilePlaylistPage