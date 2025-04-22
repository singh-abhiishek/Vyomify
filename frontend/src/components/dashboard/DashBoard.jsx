import React from 'react'
import DashBoardLower from './Lower/DashBoardLower.jsx'
import DashBoardUpper from './Upper/DashBoardUpper.jsx'

const DashBoard = () => {
    return (
        // <div className='p-4 dark:bg-[#0F0F0F] text-white w-full'>
        <div className='bg-black text-white w-full'>

            {/* upper part  */}
            <div className=' dark:bg-[#0F0F0F] p-2'>
                {/* avatar, coverImage, fullName */}
                <DashBoardUpper />
            </div>

            {/* line  */}
            <div class="border-t border-gray-700 flex-grow  w-full mt-3">
            </div>


            {/* lower part  */}
            <div className='p-2'>

                <div>
                    Video Analytics 
                </div>
                <DashBoardLower />
            </div>
        </div>
    )
}

export default DashBoard