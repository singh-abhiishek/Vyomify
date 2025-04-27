import React from 'react'
import { Pencil, Trash2, Eye } from "lucide-react";
import { FiEdit } from 'react-icons/fi'
import { AiFillLike } from 'react-icons/ai'

import { FormatDate } from '../../../utils/FormatDate'
import { useToggleVideoPublishStatusMutation } from '../../../store/slices/videoApiSlice';
import { showToastMessage } from '../../../utils/showToaster';
import { Spinner } from '../../../utils/loadingIndicator';
import UpdateVideoDetails from './UpdateVideoDetails';
import UpdateVideoThumbnail from './UpdateVideoThumbnail';

const DashBoardLowerItem = ({
    _id,
    thumbnail,
    title,
    description,
    countLikes,
    isPublished,
    views,
    createdAt,
    updatedAt,
    duration,
    refetchChannelVideos
}) => {

    // console.log(thumbnail)

    // toggle video publish status
    const [toggleVideoPublishStatus, {isLoading}] = useToggleVideoPublishStatusMutation()
    const handleTogglePublishStatus = async (videoId) => {
        try {
            const response = await toggleVideoPublishStatus(videoId).unwrap()
            if(response.success){
                console.log("status toggled successfully", "status")
                showToastMessage("status toggled successfully", "success")
                refetchChannelVideos()
            }
        } catch (error) {
            console.log("error while toggle publish status", error)
            showToastMessage("error while toggle publish status", "error")
        }
    }

  return (
    <div className="grid grid-cols-9 gap-4 items-center  px-4 py-3 border-b border-gray-700 text-sm text-gray-300 hover:bg-[#0c0c0c] transition group">
      
    {/*update Thumbnail */}
    <UpdateVideoThumbnail 
        videoId={_id}
        currThumbnail={thumbnail}
        refetchChannelVideos={refetchChannelVideos}
    />

    {/* update Details */}
    <UpdateVideoDetails 
        videoId={_id}
        currTitle={title}
        currDescription={description}
        refetchChannelVideos={refetchChannelVideos}
    />

    {/* Likes */}
    {/* <div>{countLikes}</div> */}
    <div className="flex items-center gap-1 text-gray-500 group-hover:text-gray-400">
      <AiFillLike  size={16} /> <span>{countLikes}</span>
    </div>

    {/* Views */}
    <div className="flex items-center gap-1 text-gray-500 group-hover:text-gray-400">
      <Eye size={16} /> <span>{views}</span>
    </div>

    {/* Created */}
    <div className="text-xs text-gray-500 group-hover:text-gray-400">{FormatDate(createdAt)}</div>

    {/* Updated */}
    <div className="text-xs text-gray-500 group-hover:text-gray-400">{FormatDate(updatedAt)}</div>

    {/* Status */}
    <div>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isPublished
            ? "bg-green-200/10 text-green-400"
            : "bg-red-200/10 text-red-400"
        }`}
      >
        {/* {isPublished ? "Published" : "Unpublished"} */}
        {isPublished ? "Public" : "Private"}
      </span>
    </div>

    {/* Toggle Button */}
    <div>
      <button 
      onClick={() => handleTogglePublishStatus(_id)}
      className="px-2 py-1 text-xs bg-blue-700 hover:bg-blue-800 text-white rounded-md cursor-pointer">
        {
            isLoading ? <Spinner size={14}/> :
            // isPublished ? "Unpublish" : "Publish"
            isPublished ? "Make Private" : "Make Public"

        }
      </button>
    </div>

    {/* Delete Button */}
    <div>
      <button
        title="Delete video"
        className="text-red-500 hover:text-red-700 cursor-pointer"
      >
        <Trash2 size={17} />
      </button>
    </div>
  </div>
  )
}

export default DashBoardLowerItem