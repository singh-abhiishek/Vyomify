import React from 'react'
import { MdHistory, MdHome, MdOutlineHistory, MdOutlineHome, MdOutlinePlaylistPlay, MdOutlineThumbUp, MdPlaylistPlay, MdSubscriptions, MdThumbUp } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import CloseItem from './CloseItem';
import { Link } from 'react-router-dom';
// import logo from "../../../assets/vyomifyLogo.png"
import logo from "../../../assets/vyomifyLogo1.png"

const menuItems = [
  { icon: <MdOutlineHome />, icon1: <MdHome />, iconName: "Home", linkTo: "/explore" },
  { icon: <MdOutlineHistory />, icon1: <MdHistory />, iconName: "History", linkTo: "/explore/history" },
  { icon: <MdOutlineThumbUp />, icon1: <MdThumbUp />, iconName: "Liked", linkTo: "/explore/likedVideos" },
  { icon: <MdOutlinePlaylistPlay />, icon1: <MdPlaylistPlay />, iconName: "Playlists", linkTo: "/explore/playlists" },
  { icon: <MdOutlineSubscriptions />, icon1: <MdSubscriptions />, iconName: "Subscriptions", linkTo: "/explore/subscriptions" },
]



const CloseSideBarItem = () => {
  return (
    <div className='flex flex-col justify-between min-h-[95vh]'>
      <div className='flex flex-col gap-1 lg:gap-2 p-1'>
        {menuItems.map((item, index) => (
          <CloseItem
            key={index}
            icon={item.icon}
            icon1={item.icon1}
            iconName={item.iconName}
            linkTo={item.linkTo}
          />
        ))}
      </div>

      <div>
        <Link 
        to="/"
         className="flex justify-center lg:justify-start py-2">
          <img
            className="w-24 md:w-28"
            src={logo} 
            alt="Vyomify Logo"
          />
        </Link>
      </div>
    </div>
  )
}

export default CloseSideBarItem