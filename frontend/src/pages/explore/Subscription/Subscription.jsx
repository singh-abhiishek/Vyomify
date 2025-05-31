import React from 'react'
import { useGetLatestVideosOfSubscribedChannelsQuery } from '../../../store/slices/subscriptionApiSlice'
import { useSelector } from 'react-redux'
import VideoGridItem from '../../../components/videoGrid/VideoGridItem'
import { Spinner } from '../../../utils/loadingIndicator'
import VideoGridShimmer from '../../../components/shimmers/VideoGridShimmer/VideoGridShimmer'

const Subscription = () => {

    const userData = useSelector(state => state?.auth?.userData)
    const subscriberId = userData?.user?._id
    // console.log("subscriberId from Subscription", subscriberId)

    const { data: response, isLoading } = useGetLatestVideosOfSubscribedChannelsQuery(subscriberId)
    const latestVideosList = response?.data
    // console.log("latestVideosList from Subscription", response)

    if (isLoading) {
        return <VideoGridShimmer isHeading={true} />
    }

    if (latestVideosList?.length === 0) return (
        <div className="bg-black text-white w-full flex flex-col items-center justify-center gap-2 py-10 text-center">
            <h2 className="text-2xl font-semibold text-white">You're not subscribed to any channels yet</h2>
            <p className="text-sm text-gray-400">Discover and support your favorite creators</p>
        </div>
    )


    return (
        <div className="bg-black text-white w-full px-0">
            {/* Heading */}
            <div className="flex flex-col items-center mb-2">
                <div className="flex items-end gap-0 sm:gap-2 text-white text-xl sm:text-2xl font-semibold">
                    <h1 className="text-red-600 font-amaranth font-bold text-3xl sm:text-4xl leading-none">Latest Videos</h1>
                    <p className="text-zinc-300 font-medium">from your Subscriptions</p>
                </div>
                <span className="block h-0.5 w-10 bg-gradient-to-r from-red-600 to-rose-500 mt-2 rounded-full" />
            </div>

            {/* Video Grid */}
            <div className="flex flex-wrap gap-4 mt-0.5">
                {latestVideosList?.map((latestVideo, index) => (
                    <VideoGridItem {...latestVideo} key={latestVideo?._id} />
                ))}
            </div>

        </div>
    )
}

export default Subscription