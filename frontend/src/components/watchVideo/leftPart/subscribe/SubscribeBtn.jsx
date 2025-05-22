import React, { useState } from 'react'
import { useCheckSubscriptionStatusQuery, useGetSubscribedChannelsQuery, useToggleSubscriptionsMutation } from '../../../../store/slices/subscriptionApiSlice'
import { showToastMessage } from '../../../../utils/showToaster'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../../store/slices/authSlice'

const SubscribeBtn = ({ channelId }) => {

    const { data } = useCheckSubscriptionStatusQuery(channelId)
    const isSubscribed = data?.data;
    // console.log("data", isSubscribed)

    const [toggleSubscriptions] = useToggleSubscriptionsMutation()
    const handleSubscriptions = async (e) => {
        e.preventDefault()
        try {
            const response = await toggleSubscriptions(channelId).unwrap();

            const statusAfterToggle = response?.data?.isSubscribed
            // console.log("statusAfterToggle", statusAfterToggle)

        } catch (error) {
            console.log(error)
            showToastMessage("error while subscription", "error");
        }
    }

    return (
        <div className="mt-1">
            <button
                onClick={handleSubscriptions}
                type="button"
                className={`cursor-pointer px-1 text-[10px] md:text-sm py-1.5 md:px-3 md:py-2 rounded-lg font-medium tracking-wide border transition-all duration-300
                    ${isSubscribed
                        ? 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400'
                        : 'bg-gradient-to-r from-red-600 to-red-500 text-white border-transparent hover:opacity-90'}
                    `}
            >
                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
        </div>
    )
}

export default SubscribeBtn