import React, { useState } from 'react'
import { useGetAllSearchedVideosQuery } from '../../../store/slices/videoApiSlice'
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from '../../../utils/loadingIndicator';
import VideoGridItem from '../../../components/videoGrid/VideoGridItem';
import SearchedChannel from './SearchedChannel';

const SearchedVideos = ({ searchQuery }) => {

    // console.log("from searched videos", searchQuery)
    const query = searchQuery

    const { data: response, isLoading } = useGetAllSearchedVideosQuery(query)
    const searchedVideos = response?.data?.searchedVideos
    const searchedChannel = response?.data?.channel
    const totalVideos = response?.data?.totalVideos
    // console.log("from searched videos searchedVideos", searchedVideos)
    // console.log("from searched videos searchedChannel", searchedChannel[0])

    if (isLoading) {
        return <div className='flex justify-center items-center text-2xl text-white'>
            <Spinner /> Loading
        </div>
    }

    if (searchedVideos.length === 0 && searchedChannel.length === 0) return (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <h2 className="text-2xl font-semibold text-white">No Videos Found</h2>
            <p className="text-sm text-gray-400">Try using more accurate or full keywords, channel name for better results.</p>
        </div>
    )


    if (searchedChannel.length > 0) {
        return (
            <div className='w-full'>  
                <SearchedChannel {...searchedChannel[0]}/>
            </div>
        )
    }

    return (
        <div className='flex flex-wrap gap-2 mt-2 w-full'>
            {searchedVideos?.map((video, index) => (
                <div
                    className=''
                    key={index}>
                    <VideoGridItem {...video} />
                </div>
            ))}
        </div>
    )
}

export default SearchedVideos