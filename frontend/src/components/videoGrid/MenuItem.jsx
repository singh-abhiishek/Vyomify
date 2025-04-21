import React from 'react'
import { MdOutlineWatchLater, MdOutlineFileDownload, MdOutlineShare } from "react-icons/md";
import { BiBookmark } from "react-icons/bi";
import { useAddVideoToWatchLaterMutation, useIsVideoAlreadyInWatchLaterQuery, useRemoveVideoFromWatchLaterMutation } from '../../store/slices/playlistApiSlice';


const MenuItem = ({ videoId }) => {

    // console.log("video id from menu item", videoId)

    // check is video already in watch later
    const {data: response, refetch} = useIsVideoAlreadyInWatchLaterQuery(videoId)
    const isAlready = response?.data
    // console.log("is video already in watch laterfrom menu item", isAlready)


    // add video to watch later
    const [addVideoToWatchLater, ] = useAddVideoToWatchLaterMutation()
    const handleSaveToWatchLater = async (e) => {
        e.preventDefault()
        const response = await addVideoToWatchLater(videoId).unwrap()
        console.log("response video add to watch later from menu item", response)
        refetch()
    }

    // remove video from watch later
    const [removeVideoFromWatchLater,] = useRemoveVideoFromWatchLaterMutation()
    const handleRemoveFromWatchLater = async (e) => {
        e.preventDefault()
        const response = await removeVideoFromWatchLater(videoId).unwrap()
        refetch()
        console.log("response video remove from watch later from menu item", response)
    }

    return (
        <div>
            {/* menu  */}

            <div className="absolute right-5 bottom-2 z-50 w-56 rounded-xl bg-[#212121] shadow-lg border border-neutral-700">
                {/* Save to Watch Later */}

                { !isAlready ? 
                (<div 
                    onClick={(e) => handleSaveToWatchLater(e)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-800 cursor-pointer transition-colors rounded-t-xl">
                    <MdOutlineWatchLater size={18} />
                    <span>Save to Watch Later</span>
                </div>)

                :

                (<div 
                onClick={(e) => handleRemoveFromWatchLater(e)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-800 cursor-pointer transition-colors rounded-t-xl">
                    <MdOutlineWatchLater size={18} />
                    <span>Remove from Watch Later</span>
                </div>)
                }


                {/* Save to Playlist */}
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-800 cursor-pointer transition-colors">
                    <BiBookmark size={18} />
                    <span>Save to Playlist</span>
                </div>

                {/* Download */}
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-800  transition-colors">
                    <MdOutlineFileDownload size={18} />
                    <span>Download</span>
                </div>

                {/* Share */}
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-800 transition-colors rounded-b-xl">
                    <MdOutlineShare size={18} />
                    <span>Share</span>
                </div>
            </div>

        </div>
    )
}

export default MenuItem