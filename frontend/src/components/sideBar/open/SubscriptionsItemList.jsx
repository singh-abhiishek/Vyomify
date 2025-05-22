import React from 'react'
import { useSelector } from 'react-redux'
import { useGetSubscribedChannelsQuery } from '../../../store/slices/subscriptionApiSlice'
import { Link } from 'react-router-dom'

const SubscriptionsItemList = () => {

    // take login user id from store
    const user = useSelector(state => state?.auth?.userData?.user)
    const subscriberId = user?._id

    // fetch user subscribed list
    const { data: response } = useGetSubscribedChannelsQuery(subscriberId)
    const subscribedChannels = response?.data?.subscribedChannels
    // console.log("subscribed channel from SubscriptionsItemList", subscribedChannels)

    return (
        <div className="flex flex-col mt-2 gap-1 ">
            {subscribedChannels?.map((channel, index) => (
                <Link 
                to={`/explore/profile/${channel?.username}`}
                    key={channel?.username}
                    className="flex items-center gap-1 p-1 hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                    <Link >
                        <img
                            src={channel?.avatar}
                            alt="user avatar"
                            className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
                        />
                    </Link>

                    <div className="text-sm">
                        <p className="font-semibold text-[11px] text-white truncate">{channel?.fullName}</p>
                        <p className="text-gray-400 text-[9px] truncate">@{channel?.username}</p>
                    </div>
                </Link>
            ))}
        </div>


    )
}

export default SubscriptionsItemList