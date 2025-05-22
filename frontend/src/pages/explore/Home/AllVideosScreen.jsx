import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useGetAllVideosQuery, useGetInfiniteAllVideosInfiniteQuery } from '../../../store/slices/videoApiSlice'
import VideoGridItem from '../../../components/videoGrid/VideoGridItem'
import { Spinner } from '../../../utils/loadingIndicator'
import VideoGridShimmer from '../../../components/shimmers/VideoGridShimmer/VideoGridShimmer'

const AllVideosScreen = () => {

    const [page, setPage] = useState(1);

    const { data: response, isLoading } = useGetAllVideosQuery({
        sortBy: 'createdAt',
        limit: 12,
        page,
        sortType: -1
    })
    const allVideos = response?.data?.allVideos


    // scroll and pagination 
    const a =
        useGetInfiniteAllVideosInfiniteQuery({
            sortBy: 'createdAt',
            limit: 12,
            page,
            sortType: -1
        })
    console.log("a", a)


    // if (isLoading) {
    //     return <div className='bg-black text-white w-full flex flex-col items-center justify-center gap-2 py-10 text-center'>
    //         <Spinner /> <p className="text-3xl text-gray-400">Loading</p>
    //     </div>
    // }

    if (isLoading) {
        return <VideoGridShimmer/>
    }


    return (
        <div className='flex flex-wrap gap-4 mt-0.5'>
            {allVideos?.map((video, index) => (
                <VideoGridItem key={index}{...video} />
            ))}
        </div>
    )
}

export default AllVideosScreen