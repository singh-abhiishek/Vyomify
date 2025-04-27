import React from 'react'
import DashBoardLower from './Lower/DashBoardLower.jsx'
import DashBoardUpper from './Upper/DashBoardUpper.jsx'

const DashBoard = () => {
    return (
        // <div className='p-4 dark:bg-[#0F0F0F] text-white w-full'>
        <div className='bg-black text-white w-full'>

            {/* upper part  */}
            <DashBoardUpper />

            {/* line  */}
            {/* <div class="lg:border-t lg:border-gray-700 lg:flex-grow  lg:w-full lg:mt-3">
            </div> */}

            {/* lower part  */}
            <DashBoardLower />
        </div>
    )
}

export default DashBoard