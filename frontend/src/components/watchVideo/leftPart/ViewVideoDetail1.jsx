import React from 'react'
import SubscribeBtn from './subscribe/SubscribeBtn'
import { useGetChannelSubscribersQuery } from '../../../store/slices/subscriptionApiSlice'
import { Link } from 'react-router-dom'
import Like from './like/Like.jsx'
import BookMark from './bookmark/BookMark.jsx'
import { useAddVideoToWatchLaterMutation, useIsVideoAlreadyInWatchLaterQuery, useRemoveVideoFromWatchLaterMutation } from '../../../store/slices/playlistApiSlice.js'
import { BiBookmark, BiBookmarkAlt } from 'react-icons/bi'
import { showToastMessage } from '../../../utils/showToaster.jsx'

const ViewVideoDetail1 = ({ video }) => {

    // console.log("viewvideodetails1", video)
    const videoId = video?._id
    const channelId = video?.owner?._id
    const { data, refetch } = useGetChannelSubscribersQuery({ channelId })
    const subscribersCount = data?.data
    // console.log("from ViewVideoDetail1 subscriber count", data)


    // check is video already in watch later
    const { data: response, refetch: refetchWatchLater } = useIsVideoAlreadyInWatchLaterQuery(videoId)
    const isAlready = response?.data
    // console.log("is video already in watch laterfrom menu item", isAlready)


    // add video to watch later
    const [addVideoToWatchLater,] = useAddVideoToWatchLaterMutation()
    const handleSaveToWatchLater = async (e) => {
        e.preventDefault()
        const response = await addVideoToWatchLater(videoId).unwrap()
        // console.log("response video add to watch later from menu item", response)
        refetchWatchLater()
        showToastMessage("video saved to watch Later", "success")
    }

    // remove video from watch later
    const [removeVideoFromWatchLater,] = useRemoveVideoFromWatchLaterMutation()
    const handleRemoveFromWatchLater = async (e) => {
        e.preventDefault()
        const response = await removeVideoFromWatchLater(videoId).unwrap()
        refetchWatchLater()
        showToastMessage("video removed from watch Later", "success")
        // console.log("response video remove from watch later from menu item", response)
    }

    return (
        <div className='p-1' >
            {/* video title  */}
            <span
                className='line-clamp-1 font-bold mb-0.5'
            >
                {video?.title}
            </span>

            <div className='flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center'>
                <div className='flex gap-1.5 sm:gap-1 items-center'>
                    {/* channel avatar */}
                    <div className='h-[35px] w-[35px] md:h-[40px] md:w-[40px] rounded-full overflow-hidden'>
                        <Link
                            to={`/explore/profile/${video?.ownerUsername}`}
                        >
                            <img
                                className=' object-cover w-full h-full'
                                src={video?.owner?.avatar}
                                alt="channel avatar"
                            />
                        </Link>
                    </div>

                    {/* channel name and subscriber count */}
                    <div className='flex flex-col'>
                        <span
                            className='text-sm'
                        >{video?.ownerUsername || "username"}</span>
                        
                        <span className='text-[8px] md:text-sm text-gray-400'>
                            {subscribersCount} {subscribersCount > 1 ? "Subscribers" : "Subscriber"}
                        </span>
                    </div>

                    {/* subscribe button */}
                    <div>
                        <SubscribeBtn channelId={video?.owner?._id} />
                    </div>
                </div>


                <div className='flex items-center gap-2 ml-0.5'>
                    {/* like dislike button */}
                    <Like video={video} />

                    {/* save to watch Later  */}
                    <div className="flex items-center gap-2">
                        {!isAlready ?
                            (<button
                                type='button'
                                onClick={(e) => handleSaveToWatchLater(e)}
                                className="cursor-pointer flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-1.5 rounded-2xl border border-gray-700 bg-[#1a1a1a] text-gray-300 text-sm font-medium">
                                <BiBookmark size={15} className="text-gray-400" />
                            </button>)

                            :

                            (<button
                                type='button'
                                onClick={(e) => handleRemoveFromWatchLater(e)}
                                className="cursor-pointer flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-1.5  rounded-2xl border border-gray-700 bg-[#1a1a1a] text-gray-300 text-sm font-medium">
                                <BiBookmarkAlt size={15} className="text-gray-400" />
                            </button>)
                        }
                    </div>

                    {/* bookmark button  */}
                    <BookMark video={video} />
                </div>
            </div>
        </div>
    )
}

export default ViewVideoDetail1