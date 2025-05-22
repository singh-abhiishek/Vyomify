import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const CloseItem = ({ icon, icon1, iconName, linkTo }) => {

  const location = useLocation()
  const currUrl = location?.pathname
  const onSameLink = window.location.pathname === linkTo;

  return (
    <Link
      to={linkTo}
      className={
        `cursor-pointer flex flex-col items-center p-1 gap-1.5 lg:p-2 rounded-xl hover:bg-[#1d1d1d] ${onSameLink ? "bg-[#2e2e2f] " : ""}`}
    >
      {
        onSameLink ?
          <div
            className='text-[22px] lg:text-[24px]'
          >{icon1}
          </div>

          :

          <div
            className='text-[22px] lg:text-[24px]'
          >{icon}
          </div>
      }

      <span className='text-[9px] lg:text-[10px] font-semibold'>
        {iconName}
      </span>
    </Link>
  )
}

export default CloseItem