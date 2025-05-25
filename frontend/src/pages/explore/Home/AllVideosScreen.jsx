import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useGetAllVideosQuery } from '../../../store/slices/videoApiSlice'
import VideoGridItem from '../../../components/videoGrid/VideoGridItem'
import VideoGridShimmer from '../../../components/shimmers/VideoGridShimmer/VideoGridShimmer'

const AllVideosScreen = () => {

    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState([]);
    const [hasMoreVideo, setHasMoreVideo] = useState(true);
    const { data: response, isLoading, isFetching } = useGetAllVideosQuery(
        {
            sortBy: 'createdAt',
            limit: 12,
            page,
            sortType: -1
        },
        {
            skip: !hasMoreVideo
        }
    )

    const allVideos = response?.data?.allVideos
    const currentPage = response?.data?.currentPage
    const totalPages = response?.data?.totalPages
    // console.log(currentPage, totalPages)

    // scroll and pagination 
    



    // when video is loading
    if (isLoading) {
        return <VideoGridShimmer />
    }

    return (
        <div
            className='flex flex-wrap gap-4 mt-0.5 '>
            {allVideos?.map((video, index) => (
                <VideoGridItem key={index}{...video} />
            ))}
        </div>
    )
}

export default AllVideosScreen