import React from 'react'
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useToggleVideoLikeStatusMutation, useTotalLikesOnVideoQuery } from '../../../../store/slices/likeApiSlice';

const Like = ({video}) => {
    const videoId = video?._id

    // get total like on a video
    const {data} = useTotalLikesOnVideoQuery(videoId)
    const totalLikesOnVideo = data?.data
    // console.log("from like front", totalLikesOnVideo)


    // toggle video like status on hitting like button
    const [toggleVideoLikeStatus] = useToggleVideoLikeStatusMutation()

    const handleVideoLikeToggle = async (e) => {
        e.preventDefault();

        try {
            const reponse = await toggleVideoLikeStatus(videoId).unwrap()
            console.log("resposne from togglevideolike", reponse)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex gap-1 md:gap-1.5 ">
                <button 
                type='button'
                onClick={handleVideoLikeToggle}
                className="cursor-pointer flex items-center md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-2xl border border-gray-700 bg-[#1a1a1a] text-gray-300 text-sm font-medium  ">
                    <ThumbsUp size={14} className="text-gray-400 " />
                    {totalLikesOnVideo}
                </button>

                <button 
                className="flex items-center px-2 py-1 md:px-3 md:py-1.5 rounded-2xl border border-gray-700 bg-[#1a1a1a] text-gray-300 text-sm font-medium"
                >
                    <ThumbsDown size={14} className="text-gray-400" />
                </button>
            </div>
        </div>
    )
}

export default Like