import React from 'react'
import { useSelector } from 'react-redux'
import { FormatDate } from '../../../utils/FormatDate'
import { HiUser, HiAtSymbol, HiMail } from 'react-icons/hi';
import { Eye, Video, Heart, Users, UserPlus, MessageSquare } from 'lucide-react';
import { MdDateRange, MdUpdate } from 'react-icons/md'
import { useGetChannelStatsQuery } from '../../../store/slices/dashboardApiSlice';
import StatCard from './StatCard';


const DashBoardUpper = () => {
  const user = useSelector(state => state?.auth?.userData?.user)
  console.log(user)

  // get user channel stats
  const response = useGetChannelStatsQuery()
  const stats = response?.data?.data
  console.log("user channel stats response", stats)
  return (
    <div className='flex flex-col'>

      {/* first part  */}
      <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">

        {/* coverImage */}
        <div className="w-full">
          <img
            src={user?.coverImage}
            alt="coverImage"
            className="w-full h-20 sm:h-40 object-cover rounded-md"
          />
        </div>

        {/* avatar */}
        <div className="-mt-8 sm:-mt-12">
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-18 h-18 sm:w-24 sm:h-24 rounded-full border-2 border-gray-700 shadow-md object-cover"
          />
        </div>


        <div className="mt-1 px-2 text-center sm:text-left space-y-0.5">

          <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start">
            {/* <HiAtSymbol className="text-gray-700" /> */}
            <span><span className="font-medium text-gray-700">username:</span> @{user?.username}</span>
          </p>

          <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start">
            <HiUser className="text-gray-700" />
            <span><span className="font-medium text-gray-700">Full Name:</span> {user?.fullName}</span>
          </p>



          <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start">
            <HiMail className="text-gray-700" />
            <span><span className="font-medium text-gray-700">email:</span> {user?.email}</span>
          </p>

          <div className="mt-2 text-xs text-gray-400 space-y-0.5">
            <p className="flex items-center gap-1 justify-center sm:justify-start">
              <MdDateRange />
              <span><span className="font-medium">Channel created:</span> {FormatDate(user?.createdAt)}</span>
            </p>
            <p className="flex items-center gap-1 justify-center sm:justify-start">
              <MdUpdate />
              <span><span className="font-medium">Last updated:</span> {FormatDate(user?.updatedAt)}</span>
            </p>
          </div>

        </div>



      </div>

      {/* line  */}
      <div class="border-t border-gray-700 flex-grow  w-full mt-3">
      </div>
      {/* second part  */}
      <div>
        Channel Analytics
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
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