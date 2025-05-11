import React, { useState } from 'react'
import { useGetAllPublishedVideosQuery } from '../../../store/slices/videoApiSlice'
import ProfileVideos from './ProfileVideos'

const ProfileVideoPage = ({ userId }) => {

  // const sortBy = "latest"
  const [sortBy, setSortBy] = useState("Latest")
  
  const { data: response } = useGetAllPublishedVideosQuery({
    userId,
    sortBy
  })

  const userPublishedVideos = response?.data

  console.log("response from profilevideopage", userPublishedVideos)
  return (
    <div className='mt-2'>

      {/* show button of latest, popular, oldest, */}
      <div className='flex gap-2 '>
        {
          ["Latest", "Popular", "Oldest"].map((item, index) => (
            <button
              key={index}
              onClick={() => setSortBy(item)}
              className={`
                px-4 py-1.5 mx-1 rounded-md text-sm font-medium
                transition-all duration-200
                ${sortBy === item
                  ? "bg-white text-black"
                  : "bg-[#212121] text-gray-300 hover:bg-[#2c2c2c] hover:text-white"
                }
              `}
            >
              {item}
            </button>
          ))
        }
      </div>

      {/* show all videos published by user  */}
      <ProfileVideos userPublishedVideos={userPublishedVideos}/>

    </div>
  )
}

export default ProfileVideoPage 