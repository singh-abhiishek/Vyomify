import React, { useState } from 'react'
import { useGetAllVideosQuery } from '../../../store/slices/videoApiSlice'
import VideoGridItem2 from '../../videoGrid/VideoGridItem2';
import RightPartWatchVideoShimmer from '../../shimmers/WatchVideoShimmer/RightPartWatchVideo';

const RightPartWatchVideo = () => {
    const [page, setPage] = useState(1);
    const { data: response, isLoading } = useGetAllVideosQuery({
        sortBy: 'createdAt',
        limit: 12,
        page,
        sortType: -1
    })
    const allVideos = response?.data?.allVideos


    if(isLoading){
        return <RightPartWatchVideoShimmer />
    }

    return (
        <div className="flex flex-wrap gap-1 mt-2 md:mt-0">
            {allVideos?.map((allVideo) => (
                <VideoGridItem2
                    key={allVideo?._id}
                    {...allVideo?.video}
                    {...allVideo} />
            ))}
        </div>
    )
}

export default RightPartWatchVideo