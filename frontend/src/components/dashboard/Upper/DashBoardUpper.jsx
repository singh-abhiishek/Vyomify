import React from 'react'
import { useSelector } from 'react-redux'
import { FormatDate } from '../../../utils/FormatDate'
import { HiUser, HiAtSymbol, HiMail } from 'react-icons/hi';
import { Eye, Video, Heart, Users, UserPlus, MessageSquare } from 'lucide-react';
import { MdDateRange, MdUpdate } from 'react-icons/md'
import { useGetChannelStatsQuery } from '../../../store/slices/dashboardApiSlice';
import StatCard from './StatCard';
import UpdateAvatar from './UpdateAvatar';
import UpdateCoverImage from './UpdateCoverImage';


const DashBoardUpper = () => {
  const user = useSelector(state => state?.auth?.userData?.user)
  // console.log(user)

  // get user channel stats
  const response = useGetChannelStatsQuery()
  const stats = response?.data?.data
  // console.log("user channel stats response", stats)

  return (
    <div className='flex flex-col'>

      {/* first part  */}
      <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">

        {/* coverImage */}
        <div className="w-full">
          <UpdateCoverImage />
        </div>

        {/* avatar */}
        <div className="-mt-8 sm:-mt-12">
          <UpdateAvatar />
        </div>


        <div className="mt-1 px-4 py-3 rounded-lg bg-[#121212] text-center sm:text-left shadow-[0_2px_10px_rgba(0,0,0,0.3)] border border-white/10 space-y-2">

          {/* Username */}
          <p className="text-sm text-gray-400 flex items-center gap-1 justify-center sm:justify-start">
            {/* <HiAtSymbol className="text-blue-500" /> */}
            <span className="font-medium text-gray-500">Username:</span>
            <span className="text-white">@{user?.username}</span>
          </p>

          {/* Full Name */}
          <p className="text-sm text-gray-400 flex items-center gap-1 justify-center sm:justify-start">
            <HiUser className="text-blue-500" />
            <span className="font-medium text-gray-500">Full Name:</span>
            <span className="text-white">{user?.fullName}</span>
          </p>

          {/* Email */}
          <p className="text-sm text-gray-400 flex items-center gap-1 justify-center sm:justify-start">
            <HiMail className="text-blue-500" />
            <span className="font-medium text-gray-500">Email:</span>
            <span className="text-white">{user?.email}</span>
          </p>

          {/* Dates */}
          <div className="pt-2 border-t border-white/10 text-xs text-gray-400 space-y-1">
            <p className="flex items-center gap-2 justify-center sm:justify-start">
              <MdDateRange className="text-blue-500" />
              <span><span className="font-medium">Channel Created:</span> {FormatDate(user?.createdAt)}</span>
            </p>
            <p className="flex items-center gap-2 justify-center sm:justify-start">
              <MdUpdate className="text-blue-500" />
              <span><span className="font-medium">Last Updated:</span> {FormatDate(user?.updatedAt)}</span>
            </p>
          </div>
        </div>

      </div>

      {/* line  */}
      <div class="border-t border-gray-700 flex-grow  w-full mt-3">
      </div>


      {/* second part  */}
      <div className="flex flex-col items-center mt-3">
        <div className="flex items-end gap-2 text-white text-2xl font-semibold">
          <h1 className="text-red-600 font-amaranth font-bold text-3xl leading-none">Channel Analytics</h1>
          {/* <p className="text-zinc-300 font-medium">Curated for You</p> */}
        </div>
        <span className="block h-0.5 w-10 bg-gradient-to-r from-red-600 to-rose-500 mt-2 rounded-full" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 mb-2">
        <StatCard icon={<Users className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />} label="Followers" value={stats?.countSubscribers || 0} />
        <StatCard icon={<UserPlus className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6" />} label="Following" value={stats?.countSubscribedTo || 0} />
        <StatCard icon={<Heart className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />} label="Likes" value={stats?.countLikes || 0} />
        <StatCard icon={<Eye className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />} label="Views" value={stats?.countViews || 0} />
        <StatCard icon={<Video className="text-purple-500 w-5 h-5 sm:w-6 sm:h-6" />} label="Videos" value={stats?.countVideos || 0} />
        <StatCard icon={<MessageSquare className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />} label="Tweets" value={stats?.countTweets || 0} />
      </div>

    </div>
  )
}

export default DashBoardUpper