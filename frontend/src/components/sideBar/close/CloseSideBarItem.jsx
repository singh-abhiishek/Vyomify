import React from 'react'
import { MdHistory, MdHome, MdOutlineHistory, MdOutlineHome, MdOutlinePlaylistPlay, MdOutlineThumbUp, MdPlaylistPlay, MdSubscriptions, MdThumbUp } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import CloseItem from './CloseItem';

const menuItems = [
    {icon: <MdOutlineHome />,          icon1:<MdHome />,          iconName: "Home", linkTo: "/explore"},
    {icon: <MdOutlineHistory />,       icon1:<MdHistory />,       iconName: "History", linkTo: "/explore/history"},
    {icon: <MdOutlineThumbUp />,       icon1:<MdThumbUp />,       iconName: "Liked", linkTo: "/explore/likedVideos"},  
    {icon: <MdOutlinePlaylistPlay />,  icon1:<MdPlaylistPlay />,  iconName: "Playlists", linkTo: "/explore/playlists"},
    {icon: <MdOutlineSubscriptions />, icon1:<MdSubscriptions />, iconName: "Subscriptions", linkTo: "/explore/subscriptions"},
]

const CloseSideBarItem = () => {
  return (
    <div className='flex flex-col gap-1 lg:gap-2 p-1'>
        {menuItems.map((item, index) => (
          <CloseItem
          key      = {index}
          icon     = {item.icon}
          icon1    = {item.icon1}
          iconName = {item.iconName}
          linkTo   = {item.linkTo}
          />
        ))}
    </div>
  )
}

export default CloseSideBarItem