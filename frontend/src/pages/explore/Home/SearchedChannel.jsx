import React from 'react'
import VideoGridItem from '../../../components/videoGrid/VideoGridItem.jsx'
import VideoGridItem1 from "../../../components/videoGrid/VideoGridItem1.jsx"
import { Link } from 'react-router-dom'
import SubscribeBtn from '../../../components/watchVideo/leftPart/subscribe/SubscribeBtn.jsx'

const SearchedChannel = ({
    _id,
    avatar,
    fullName,
    username,
    subscriberCount,
    videoCount,
    isSubscribedByCurrentUser,
    latestVideos
}) => {

    console.log("from serached channel", username)
    const ownerDetails = {
        username
    }

    return (
        <div className='flex flex-col items-center justify-center w-[100%]'>

            {/* show channel details  */}
            <div className='flex w-full items-center justify-center gap-2'>

                {/* avatar */}
                <Link
                    to={`/explore/profile/${username}`}
                    className='sm:w-40 sm:h-40 bg-white rounded-[50%] overflow-hidden'>
                    <img
                        className='object-cover w-full h-full'
                        src={avatar} alt="avatar" />
                </Link>

                <div className=" text-white w-full max-w-md">
                    {/* Full Name */}
                    <div className="sm:text-xl text-lg font-semibold ">{fullName}</div>

                    {/* Username and subscriber count */}
                    <div className="flex flex-wrap items-center text-[12px] sm:text-sm text-gray-400 ">
                        <Link
                            to={`/explore/profile/${username}`}
                            className=" hover:underline"
                        >
                            @{username}
                        </Link>
                    </div>

                    {/* Video count */}
                    <div className="flex flex-wrap items-center gap-1 text-[12px] sm:text-sm text-gray-400 ">
                        <p>
                            {subscriberCount}{" "}
                            {subscriberCount === 1 ? "Subscriber" : "Subscribers"}
                        </p>
                        <span>•</span>
                        <div className="text-[12px] sm:text-sm text-gray-400">
                            {videoCount} {videoCount === 1 ? "Video" : "Videos"}
                        </div>
                    </div>

                    {/* Subscribe button */}
                    <SubscribeBtn channelId={_id} />
                </div>

            </div>

            {/* line  */}
            <div class="border-t border-gray-700 flex-grow  w-full mt-3">
            </div>

            {/* show channel latest Videos  */}
            <div className='flex flex-wrap gap-2 mt-2 w-full'>
                {latestVideos?.map((video) => (
                    <VideoGridItem1 
                    key={video?.title}
                    {...video} 
                    ownerDetails={ownerDetails} 
                    />
                ))}
            </div>
        </div>
    )
}

export default SearchedChannel