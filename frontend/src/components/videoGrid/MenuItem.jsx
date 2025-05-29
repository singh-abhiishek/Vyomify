import React from 'react'
import { MdOutlineWatchLater, MdOutlineFileDownload, MdOutlineShare } from "react-icons/md";
import { BiBookmark } from "react-icons/bi";
import { useAddVideoToWatchLaterMutation, useIsVideoAlreadyInWatchLaterQuery, useRemoveVideoFromWatchLaterMutation } from '../../store/slices/playlistApiSlice';
import { usePlaylistModal } from '../../contextAPI/PlaylistModalContext ';
import PF1 from '../watchVideo/leftPart/bookmark/PF1';
import PF2 from '../watchVideo/leftPart/bookmark/PF2';


const MenuItem = ({ modalRef, videoId, setIsMenuOpen }) => {

    // console.log("video id from menu item", videoId)

    // check is video already in watch later
    const { data: response, refetch } = useIsVideoAlreadyInWatchLaterQuery(videoId)
    const isAlready = response?.data
    // console.log("is video already in watch laterfrom menu item", isAlready)


    // add video to watch later
    const [addVideoToWatchLater,] = useAddVideoToWatchLaterMutation()
    const handleSaveToWatchLater = async (e) => {
        e.preventDefault()
        const response = await addVideoToWatchLater(videoId).unwrap()
        // console.log("response video add to watch later from menu item", response)
        refetch()
    }

    // remove video from watch later
    const [removeVideoFromWatchLater,] = useRemoveVideoFromWatchLaterMutation()
    const handleRemoveFromWatchLater = async (e) => {
        e.preventDefault()
        const response = await removeVideoFromWatchLater(videoId).unwrap()
        refetch()
        // console.log("response video remove from watch later from menu item", response)
    }

    // save to playlist, using playlist modal context
    const { openPF1Modal, isPF1Open, isPF2Open } = usePlaylistModal()

    return (
        <div
            ref={modalRef}
        >
            {/* menu  */}

            <div className={`absolute right-4 bottom-0 z-40 ${!isAlready ? "w-50" : "w-56"}  rounded-xl bg-[#212121] shadow-lg border border-neutral-700`}>
                {/* Save to Watch Later */}

                {!isAlready ?
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
                <div
                    onClick={openPF1Modal}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-800 cursor-pointer transition-colors">
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


                {isPF1Open && <PF1 videoId={videoId} />}
            <div className='absolute z-10 top-0 left-0'>
            </div>

                {isPF2Open && <PF2 />}
            <div className='absolute z-10 top-0 left-0'>
            </div>

        </div>
    )
}

export default MenuItem