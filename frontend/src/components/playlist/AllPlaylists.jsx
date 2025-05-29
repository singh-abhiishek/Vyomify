import { ListVideo } from 'lucide-react';
import React from 'react'
import { useFormContext } from 'react-hook-form';


const AllPlaylists = ({ userPlaylistsName }) => {

  const { register } = useFormContext();
  // console.log("From allplaylists", userPlaylistsName)

  return (
    <div>
      <div className='flex items-center gap-1 mt-1 text-md text-gray-300 mb-1'>
        <ListVideo size={18} className='text-red-400' />
        <span className='text-red-400'>Select playlists</span>
      </div>

      {userPlaylistsName?.map((playlist, index) => (
        <label
          key={index}
          className="flex items-center gap-2 cursor-pointer hover:text-red-400 transition-colors duration-200"
        >
          <input
            type="checkbox"
            value={playlist._id}
            className="w-3 h-3 accent-red-500 cursor-pointer"
            {...register("playlistIds")}
          />
          <span className="text-sm text-gray-200 hover:text-red-400">{playlist.name}</span>
        </label>

      ))}
    </div>
  )
}

export default AllPlaylists