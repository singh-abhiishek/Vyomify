import { MdOutlineWatchLater, MdOutlineFileDownload, MdOutlineShare } from "react-icons/md";
import { useAddVideoToWatchLaterMutation, useIsVideoAlreadyInWatchLaterQuery, useRemoveVideoFromPlaylistMutation, useRemoveVideoFromWatchLaterMutation } from '../../store/slices/playlistApiSlice';
import { useSelector } from 'react-redux';
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";


const MenuItem1 = ({ playlistOwnerId, videoId, playlistId, setIsMenu1Open, playlistName, refetchPlaylistById, modalRef }) => {

    const loginUser = useSelector(state => state?.auth?.userData?.user)
    const authenticatedUserId = loginUser?._id
    // console.log(authenticatedUserId, playlistOwnerId)

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
        setIsMenu1Open(false)
    }

    // remove video from watch later
    const [removeVideoFromWatchLater,] = useRemoveVideoFromWatchLaterMutation()
    const handleRemoveFromWatchLater = async (e) => {
        e.preventDefault()
        const response = await removeVideoFromWatchLater(videoId).unwrap()
        refetch()
        setIsMenu1Open(false)
        // console.log("response video remove from watch later from menu item", response)
    }

    // remove video from playlist
    const [removeVideoFromPlaylist] = useRemoveVideoFromPlaylistMutation()
    const handleRemoveFromPlaylist = async (e) => {
        e.preventDefault()
        const response = await removeVideoFromPlaylist({ videoId, playlistId }).unwrap()
        setIsMenu1Open(false)
        refetchPlaylistById()
        // console.log("response, remove video from playlist, from menu item", response)
    }
    
    return (
        <div
            ref={modalRef}
            className={`absolute right-8 bottom-5 z-50 ${!isAlready ? "w-50" : "w-56"} rounded-xl bg-[#212121] shadow-lg border border-neutral-700`}>
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


            {/* Remove from Playlist, only user which create playlist can remove video */}
            {authenticatedUserId === playlistOwnerId && <div
                onClick={(e) => handleRemoveFromPlaylist(e)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-800 cursor-pointer transition-colors">
                <MdBookmark size={18} />
                <span>Remove From {playlistName}</span>
            </div>}


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
    )
}

export default MenuItem1