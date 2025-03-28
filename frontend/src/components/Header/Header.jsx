import React from 'react'
import Navbar from './Navbar'

const Header = () => {
    return (
        <div className=''>

            {/* ************************************************ */}

            <div className="w-full bg-dark dark:bg-[#0F0F0F] flex flex-col sm:py-14 py-8 items-center justify-center sm:mt-10 mt-10">
                <p class="text-red-600 font-bold md:text-[50px]  text-[26px] text-center xs:text-[26px] mt-4">Connect your thoughts</p>
                <p class="text-white font-bold sm:text-[18px] text-[12px] text-center capitalize mt-4">people have ALREADY signed up across the globe</p>
                <button class="bg-red-600 rounded-lg text-white sm:px-12 sm:py-4 px-10 py-4 mt-8 cursor-pointer">Get Started Now</button>
            </div>
            
            {/* ************************************************ */}

    </div>
  )
}

export default Header