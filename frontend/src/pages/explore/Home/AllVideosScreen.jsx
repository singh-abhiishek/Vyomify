import React, { useCallback, useEffect, useState } from 'react'
import { useGetAllVideosQuery } from '../../../store/slices/videoApiSlice'
import VideoGridItem from '../../../components/videoGrid/VideoGridItem'
import VideoGridShimmer from '../../../components/shimmers/VideoGridShimmer/VideoGridShimmer'
import { useOutletContext } from 'react-router-dom';

const AllVideosScreen = () => {

    // scroll and pagination concept, when we hit bottom of page
    const { scrollableRef } = useOutletContext(); // reference from exploreLayout

    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState([]);
    const [hasMoreVideo, setHasMoreVideo] = useState(true);
    const { data: response, isLoading, isFetching } = useGetAllVideosQuery(
        {
            sortBy: 'createdAt',
            limit: 12,
            page, // changing page trigger a refetch automatically as long as hasMoreVideo is still true.
            sortType: -1
        },
        {
            skip: !hasMoreVideo // stop fetching if no more videos left
        }
    )

    useEffect(() => {
        if (response?.data?.allVideos) {
            setVideos((prevVideos) => {
                const newVideos = response?.data?.allVideos.filter(
                    newVid => !prevVideos.some(existing => existing._id === newVid._id)  // to avoid appending duplicate videos
                );
                return [...prevVideos, ...newVideos];
            });

            setHasMoreVideo(page < response?.data?.totalPages); // all video fetched loaded, no more
        } else if (response?.data?.totalPages === 0) {
            setHasMoreVideo(false); // No videos available at all or nothing left to load
        }
    }, [response]);

    // handleScroll checks if the user has scrolled within 50px of the bottom set page to next 
    const handleScroll = useCallback(() => {
        const container = scrollableRef?.current;
        if (
            container &&
            container.scrollTop + container.clientHeight >=
            container.scrollHeight - 50 &&
            !isFetching && hasMoreVideo
        ) {
            // console.log('Reached bottom — load more!');
            setPage(prev => prev + 1);
        }
    }, [scrollableRef, isFetching, hasMoreVideo]);


    useEffect(() => {
        const container = scrollableRef?.current;
        if (!container) return;
        container.addEventListener('scroll', handleScroll);

        // cleanup function ko React save kar leta hai aur jab zarurat ho tab call karta hai
        // return wali line immediately nahi chalti
        // Wo ek cleanup function hota hai jo React ko batata hai: Jab component unmount ho jaye ya dependencies change ho jaye, tab ye function call kar dena
        return () => container.removeEventListener('scroll', handleScroll);

        // jab handleScroll change hota hai, cleanup function chalta hai, old listener hataata hai, fir naya listener add karta hai.
    }, [handleScroll]);


    // when video is loading
    if (isLoading) {
        return <VideoGridShimmer />
    }

    return (
        <>
            <div className='flex flex-wrap gap-4 mt-0.5'>
                {videos?.map((video) => (
                    <VideoGridItem key={video?._id} {...video} />
                ))}
            </div>

            {isFetching && hasMoreVideo && (
                <div className="w-full flex justify-center py-6">
                    <div className="h-6 w-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
            )}


            {!hasMoreVideo && (
                <div className="w-full flex justify-center py-4 text-gray-400 text-sm">
                    No more videos
                </div>
            )}
        </>
    )
}

export default AllVideosScreen