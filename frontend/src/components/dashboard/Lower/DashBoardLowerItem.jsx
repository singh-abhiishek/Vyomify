import React from 'react'
import { Pencil, Trash2, Eye } from "lucide-react";
import { FiEdit } from 'react-icons/fi'

import { FormatDate } from '../../../utils/FormatDate'

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
    duration
}) => {

    // console.log(thumbnail)

  return (
    <div className="grid grid-cols-9 gap-4 items-center px-4 py-3 border-b border-gray-700 text-sm text-gray-300 hover:bg-[#2a2a2a] transition group">
      
    {/* Thumbnail */}
    <div className="relative w-fit">
      <img
        src={thumbnail}
        alt="thumbnail"
        className="w-18 h-11 object-cover rounded-md border border-gray-600"
      />
      <button
        title="Edit thumbnail"
        className="absolute bottom-0 right-0 bg-black/60 p-1 rounded-full text-blue-400 hover:text-blue-600 cursor-pointer"
      >
        <Pencil size={14} />
        {/* <FiEdit size={14} /> */}
      </button>
    </div>

    {/* Title with overlay icon only */}
    <div className="w-fit max-w-[120px] truncate">
      <button
        title="Edit title"
        className=" bg-black/60 p-1 rounded-full text-blue-400 hover:text-blue-600 cursor-pointer"
      >
        <FiEdit size={17} />
      </button>
    </div>

    {/* Likes */}
    <div>{countLikes}</div>

    {/* Views */}
    <div className="flex items-center gap-1 text-gray-400">
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
        {isPublished ? "Published" : "Unpublished"}
      </span>
    </div>

    {/* Toggle Button */}
    <div>
      <button className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer">
        {isPublished ? "Unpublish" : "Publish"}
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