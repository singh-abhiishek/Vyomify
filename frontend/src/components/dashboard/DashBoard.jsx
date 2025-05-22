import React from 'react'
import DashBoardLower from './Lower/DashBoardLower.jsx'
import DashBoardUpper from './Upper/DashBoardUpper.jsx'

const DashBoard = () => {
    return (
        // <div className='p-4 dark:bg-[#0F0F0F] text-white w-full'>
        <div className='bg-black text-white w-full'>
            <DashBoardUpper />
            <DashBoardLower />
        </div>
    )
}

export default DashBoard