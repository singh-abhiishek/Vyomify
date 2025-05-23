import React from 'react'
import VideoGridItem from '../../videoGrid/VideoGridItem';

const ProfileVideos = ({ userPublishedVideos }) => {

  if (userPublishedVideos?.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 text-md sm:text-lg font-medium mt-30">
        This profile has no Videos yet.
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap gap-6 mt-6">
        {userPublishedVideos?.map((video, index) => (
          <div
            className=''
            key={index}>
            <VideoGridItem {...video} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileVideos