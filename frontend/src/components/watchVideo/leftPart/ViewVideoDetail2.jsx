import React from 'react'
import { FormatDate } from '../../../utils/FormatDate'

const ViewVideoDetail2 = ({ video }) => {
  return (
    <div className='bg-[#272727] rounded p-2'>

      {/* views and created at  */}
      <div className='flex gap-2 text-sm text-gray-400'>
        <span>{video?.views}views</span>
        <span>{FormatDate(video?.createdAt)}</span>
      </div>

      {/* video description  */}
      <p
      className='text-sm line-clamp-3'
      >
        {video?.description}
      </p>
    </div>
  )
}

export default ViewVideoDetail2