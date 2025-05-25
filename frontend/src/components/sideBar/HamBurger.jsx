import React from 'react'
import { FaBars } from 'react-icons/fa'
import { useLeftSideBar } from '../../contextAPI/SideBarContext.jsx'

const HamBurger = () => {
    const { toggleLeftbar } = useLeftSideBar()
    // console.log("Toggle func:", toggleLeftbar);
  return (
    <button 
    onClick={toggleLeftbar}
    className='cursor-pointer text-xl '>
        <FaBars />
    </button>
  )
}

export default HamBurger