import React from 'react'
import { useFormContext } from 'react-hook-form';


const AllPlaylists = ({ userPlaylistsName }) => {

  const { register } = useFormContext();
  console.log("From allplaylists",userPlaylistsName )

  return (
    <div>
      <h2 className='font-bold font-amaranth '>
        Select Playlists
      </h2>

      {userPlaylistsName?.map((playlist, index) => (
        <label key={index} className="block">
          <input
            type="checkbox"
            value={playlist._id}
            className='cursor-pointer'
            {...register("playlistIds")}
          />
          <span className="ml-2 text-[14px]">
            {playlist.name}
          </span>
        </label>
      ))}
    </div>
  )
}

export default AllPlaylists