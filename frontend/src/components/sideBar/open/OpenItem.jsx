import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const OpenItem = ({ icon, icon1, iconName, linkTo }) => {

    const location = useLocation()
    const currUrl = location?.pathname
    // const onSameLink = currUrl?.includes(linkTo)
    const onSameLink = window.location.pathname === linkTo;

    console.log("from openitem location -", currUrl)

    return (
        <Link
            to={linkTo}
            className={
                `cursor-pointer flex items-center  p-2 gap-4 lg:p-2 hover:bg-white/10 rounded-lg ransition-all duration-200 ${onSameLink ? "bg-[#2e2e2f]" : ""}`}
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


            <div className='text-[11px] lg:text-[13px] font-semibold'>
                {iconName}
            </div>
        </Link>
    )
}

export default OpenItem