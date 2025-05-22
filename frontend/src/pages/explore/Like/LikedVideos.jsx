import React from 'react'
import { useGetTotalLikedVideosQuery } from '../../../store/slices/likeApiSlice'
import VideoGridItem from '../../../components/videoGrid/VideoGridItem'
import VideoGridItem1 from '../../../components/videoGrid/VideoGridItem1'
import { Spinner } from '../../../utils/loadingIndicator'
import VideoGridShimmer1 from '../../../components/shimmers/VideoGridShimmer/VideoGridShimmer1'

const LikedVideos = () => {

  const { data: response, isLoading } = useGetTotalLikedVideosQuery()
  const likedVideosList = response?.data
  // console.log(likedVideosList)

  // if (isLoading) {
  //   return <div className='bg-black text-white w-full flex flex-col items-center justify-center gap-2 py-10 text-center'>
  //     <Spinner /> <p className="text-3xl text-gray-400">Loading</p>
  //   </div>
  // }

  if (isLoading) {
    return <VideoGridShimmer1 />
  }

  return (
    <div className='bg-black text-white w-full'>

      {/* Heading */}
      <div className="flex flex-col items-center mb-2">
        <div className="flex items-end gap-2 text-white text-2xl font-semibold">
          <h1 className="text-red-600 font-amaranth font-bold text-3xl sm:text-4xl leading-none">Liked</h1>
          <span className="text-zinc-300 font-medium">Videos</span>
        </div>
        <span className="block h-0.5 w-10 bg-gradient-to-r from-red-600 to-rose-500 mt-2 rounded-full" />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {likedVideosList?.map((likedVideo, index) => (
          // <VideoGridItem {...likedVideo?.video} {...likedVideo} />

          <VideoGridItem1
            key={likedVideo?._id}
            {...likedVideo?.video}
            {...likedVideo} />
        ))}
      </div>
    </div>
  )
}

export default LikedVideos