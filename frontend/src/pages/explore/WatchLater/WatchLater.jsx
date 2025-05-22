import React from 'react'
import { useGetAllWatchLaterVideosQuery } from '../../../store/slices/playlistApiSlice'
import VideoGridItem1 from '../../../components/videoGrid/VideoGridItem1'
import { Spinner } from '../../../utils/loadingIndicator'

const WatchLater = () => {

  const { data: response, isLoading } = useGetAllWatchLaterVideosQuery()
  const watchLaterVideosList = response?.data[0]?.video
  console.log("all watch later video from watch later", watchLaterVideosList)

  if (isLoading) {
    return <div className='bg-black text-white w-full flex flex-col items-center justify-center gap-2 py-10 text-center'>
      <Spinner /> <p className="text-3xl text-gray-400">Loading</p>
    </div>
  }

  return (
    <div className='bg-black text-white w-full'>

      <div className="flex flex-col items-center">
        <div className="flex items-end gap-2 text-white text-2xl font-semibold">
          <h1 className="text-red-600 font-amaranth font-bold text-4xl leading-none">Watch Later</h1>
          <p className="text-zinc-300 font-medium">your saved videos</p>
        </div>
        <span className="block h-0.5 w-10 bg-gradient-to-r from-red-600 to-rose-500 mt-2 rounded-full" />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {watchLaterVideosList?.map((video, index) => (
          <VideoGridItem1 
          key={video?.createdAt}
          {...video} 
          />
        ))}
      </div>
    </div>
  )
}

export default WatchLater