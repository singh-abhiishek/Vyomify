import React from 'react'
import { useGetChannelVideosQuery } from '../../../store/slices/dashboardApiSlice'
import DashBoardLowerItem from './DashBoardLowerItem'

const DashBoardLower = () => {

  // fetch user channel videos for ananlytics
  const { data: response } = useGetChannelVideosQuery()
  const channelVideos = response?.data
  console.log("response from DashBoardLower", channelVideos)

  return (



<div className="w-full overflow-x-auto">
  <div className="min-w-[900px]">
    <div className="grid grid-cols-9 gap-4 px-4 py-2 bg-gray-800 text-gray-200 font-semibold text-sm rounded-t-md">
      <div>Thumbnail</div>
      <div className="flex items-center gap-1">Details</div>
      <div>Likes</div>
      <div className="flex items-center gap-1">Views</div>
      <div>Created</div>
      <div>Updated</div>
      <div>Status</div>
      <div>Toggle</div>
      <div>Delete</div>
    </div>

    {channelVideos?.map((video) => (
      <DashBoardLowerItem key={video._id} {...video} />
    ))}
  </div>
</div>


  )
}

export default DashBoardLower