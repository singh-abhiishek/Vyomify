import React, { useEffect, useRef, useState } from 'react'
import Comment from './comment/Comment.jsx'
import ViewVideoDetail2 from './ViewVideoDetail2.jsx'
import ViewVideoDetail1 from './ViewVideoDetail1.jsx'
import ReactPlayer from 'react-player'
import { useGetVideoByIdQuery } from '../../../store/slices/videoApiSlice.js'
import LeftPartWatchVideoShimmer from '../../shimmers/WatchVideoShimmer/LeftPartWatchVideoShimmer.jsx'
import { useGetWatchHistoryQuery } from '../../../store/slices/userApiSlice.js'

const LeftPartWatchVideo = ({ videoId }) => {
  // console.log(videoId)

  const { refetch: refetchWatchHistory } = useGetWatchHistoryQuery();
  const { data: response, isLoading, isSuccess } = useGetVideoByIdQuery(videoId)
  const video = response?.data
  // console.log("from viewvideo", video)

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      refetchWatchHistory();
    }
  }, [isSuccess, refetchWatchHistory, videoId]);


  // useEffect(() => {
  //   return () => {
  //     setIsPlaying(false); // stop playing on unmount
  //   };
  // }, []);


  if (isLoading) {
    return <LeftPartWatchVideoShimmer />
  }


  return (
    <>

      {/* video part  */}
      <div className='w-full h-[170px] sm:h-[200px] md:h-[300px] lg:h-[550px]'>
        <ReactPlayer
          key={videoId} // forces re-render when videoId changes
          url={video?.videoFile}
          width="100%"
          height="100%"
          controls
          playing={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      {/* video detail part - 1*/}
      <div>
        <ViewVideoDetail1 video={video} />
      </div>

      {/* video detail part - 2*/}
      <div className='mt-4'>
        <ViewVideoDetail2 video={video} />
      </div>

      {/* comment section */}
      <div className=''>
        <Comment videoId={videoId} />
      </div>

    </>
  )
}

export default LeftPartWatchVideo