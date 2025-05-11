import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserChannelProfileQuery } from '../../store/slices/userApiSlice';
import ProfileVideoPage from './profileVideo/ProfileVideoPage';
import ProfilePostPage from './profilePost/ProfilePostPage';
import ProfilePlaylistPage from './profilePlaylist/ProfilePlaylistPage';
import SubscribeBtn from '../watchVideo/leftPart/subscribe/SubscribeBtn';
import { useGetChannelSubscribersQuery } from '../../store/slices/subscriptionApiSlice';

const components = [
  {
    name: "Videos",
    component: ProfileVideoPage
  },
  {
    name: "Posts",
    component: ProfilePostPage
  },
  {
    name: "Playlists",
    component: ProfilePlaylistPage
  },
]

const ProfilePage = () => {
  const { username } = useParams();

  const [activeTab, setActiveTab] = useState(0);

  const { data: response } = useGetUserChannelProfileQuery(username)
  const userChannel = response?.data

  console.log("from profilepage", userChannel)

  const channelId = userChannel?._id
  const { data } = useGetChannelSubscribersQuery({ channelId })
  const subscribersCount = data?.data
  console.log("from profilepage subscibers count", subscribersCount)

  const ActiveComponent = components[activeTab].component;

  return (
    <div className='p-1.5 dark:bg-black text-white w-full'>
      {/* <div className='p-4 bg-amber-300 text-white w-full h-auto '> */}

      {/* show cover image */}
      <div className='w-full h-30 sm:h-38 md:h-44 bg-[#212121] text-white overflow-hidden rounded-sm'>
        <img
          className='object-cover w-full h-full'
          src={userChannel?.coverImage} alt="coverImage" />
      </div>

      {/* avatar and basic details  */}
      <div className='flex mt-1 md:mt-2 gap-2 md:gap-3 items-center sm-justify-start'>

        {/* show avatar image  */}
        <div className='w-26 h-26 sm:w-28 sm:h-26 md:w-40 md:h-40 bg-white rounded-[50%] overflow-hidden'>
          <img
            className='object-cover w-full h-full'

            src={userChannel?.avatar} alt="avatar" />
          {/* src="" alt="avatar" /> */}
        </div>

        {/* user basic detail  */}
        <div className='mt-1'>
          <h1 className="font-amaranth font-bold text-lg md:text-3xl lg:text-4xl">{userChannel?.fullName}</h1>
          <div className='text-sm text-gray-400'>
            <p>@{userChannel?.username}</p>
            <p>{subscribersCount} {subscribersCount > 1 ? "subscribers" : "subscriber"}</p>
            <p>{userChannel?.noOfVideos} {userChannel?.noOfVideos > 1 ? "videos" : "video"}</p>
          </div>

          <div>
            <SubscribeBtn channelId={userChannel?._id} />
          </div>
        </div>
      </div>

      {/* button for videos, post, playlist  */}
      <div className='flex mt-4 gap-12 px-4'>
        {
          components.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`cursor-pointer pb-1 text-sm font-medium transition-all duration-200
              ${activeTab === index
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 border-b-2 border-transparent  hover:border-gray-600'}
            `}
            >
              {item.name}
            </button>
          ))
        }
      </div>

      {/* line  */}
      <div class="border-t border-gray-700 flex-grow  w-full ">
      </div>

      {/* show the active tab  */}

      <div className=''>
        <ActiveComponent userId={userChannel?._id} />
      </div>

    </div>
  )
}

export default ProfilePage