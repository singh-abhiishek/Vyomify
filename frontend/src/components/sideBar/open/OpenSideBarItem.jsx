import React from 'react'

import { MdOutlineHome } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdSubscriptions } from "react-icons/md";

import { MdOutlineHistory } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { MdPlaylistPlay } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdVideoLibrary } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { MdOutlineThumbUp } from "react-icons/md";
import { MdThumbUp } from "react-icons/md";

import OpenItem from './OpenItem';
import SubscribeBtn from '../../watchVideo/leftPart/subscribe/SubscribeBtn';
import SubscriptionsItemList from './SubscriptionsItemList';

const menuItems1 = [
  { icon: <MdOutlineHome />, icon1: <MdHome />, iconName: "Home", linkTo: "/explore" },
  { icon: <MdOutlineSubscriptions />, icon1: <MdSubscriptions />, iconName: "Subscriptions", linkTo: "/explore/subscriptions" }
]

const menuItems2 = [
  { icon: <MdOutlineHistory />, icon1: <MdHistory />, iconName: "History", linkTo: "/explore/history" },
  { icon: <MdOutlinePlaylistPlay />, icon1: <MdPlaylistPlay />, iconName: "Playlists", linkTo: "/explore/playlists" },
  { icon: <MdOutlineVideoLibrary />, icon1: <MdVideoLibrary />, iconName: "Your Videos", linkTo: "/explore/dashboard" },
  { icon: <MdOutlineWatchLater />, icon1: <MdWatchLater />, iconName: "Watch Later", linkTo: "/explore/watch-later" },
  { icon: <MdOutlineThumbUp />, icon1: <MdThumbUp />, iconName: "Liked Videos", linkTo: "/explore/likedVideos" },
]

const OpenSideBarItem = () => {
  return (
    <div className='px-3 lg:px-0.5'>

      <div className='flex flex-col gap-1 lg:p-3 lg:gap-2 justify-center'>
        {menuItems1.map((item, index) => (
            <OpenItem
              key={index}
              icon={item.icon}
              icon1={item.icon1}
              iconName={item.iconName}
              linkTo={item.linkTo}
            />
        ))}
      </div>

      {/* line  */}
      <div className="border-t border-gray-700 flex-grow  w-full mt-3">
      </div>


      <span className='text-sm  text-gray-400'>
        you
      </span>

      <div className='flex flex-col gap-1 lg:p-2 lg:gap-2'>
        {menuItems2.map((item, index) => (
            <OpenItem
              key={index}
              icon={item.icon}
              icon1={item.icon1}
              iconName={item.iconName}
              linkTo={item.linkTo}
            />
        ))}
      </div>

      {/* line  */}
      <div className="border-t border-gray-700 flex-grow  w-full mt-3">
      </div>

      {/* subscriptions  */}
      <span className='text-sm  text-gray-400'>
        Subscriptions
      </span>
      <div className='overflow-y-auto max-h-[280px]'>
        <SubscriptionsItemList />
      </div>
    </div>
  )
}

export default OpenSideBarItem