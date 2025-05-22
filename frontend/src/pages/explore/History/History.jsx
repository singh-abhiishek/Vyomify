import React from 'react'
import { useClearWatchHistoryMutation, useGetWatchHistoryQuery } from '../../../store/slices/userApiSlice'
import { Spinner } from '../../../utils/loadingIndicator';
import VideoGridItem1 from '../../../components/videoGrid/VideoGridItem1';
import { showToastMessage } from '../../../utils/showToaster';
import VideoGridShimmer1 from '../../../components/shimmers/VideoGridShimmer/VideoGridShimmer1';

const History = () => {

    // get watch history list
    const { data: response, isLoading } = useGetWatchHistoryQuery();
    const watchHistoryList = response?.data
    // console.log("history", watchHistoryList)


    // clear user watch history
    const [clearWatchHistory] = useClearWatchHistoryMutation()
    const handleClearWatchHistory = async (e) => {
        e.preventDefault();

        try {
            const response = await clearWatchHistory().unwrap()

            // console.log("response from clear watch history", response)
            if (response.success) {
                showToastMessage("watch history cleared", "success")
            }
        } catch (error) {
            console.error("error while clearing watch history", error)
            showToastMessage("watch history not cleared", "error")
        }
    }


    // if (isLoading) {
    //     return <div className='bg-black text-white w-full flex flex-col items-center justify-center gap-2 py-10 text-center'>
    //         <Spinner /> <p className="text-3xl text-gray-400">Loading</p>
    //     </div>
    // }

    if (isLoading) {
        return  <VideoGridShimmer1 isWatchHistoryBtn={true} />
    }


    if (watchHistoryList?.length === 0) return (
        <div className="bg-black text-white w-full flex flex-col items-center justify-center gap-2 py-10 text-center">
            <h2 className="text-2xl font-semibold text-white">watch History is Empty</h2>
            <p className="text-sm text-gray-400">Go and enjoy some video</p>
        </div>
    )

    return (
        <div className='bg-black text-white w-full '>

            {/* heading  */}
            <div className="flex flex-col items-center mt-1">
                <div className="flex items-end gap-2 text-white text-2xl font-semibold">
                    <h1 className="text-red-600 font-amaranth font-bold text-3xl sm:text-4xl leading-none">WatchHistory</h1>
                    {/* <p className="text-zinc-300 font-medium">relive your views</p> */}
                </div>
                <span className="block h-0.5 w-10 bg-gradient-to-r from-red-600 to-rose-500 mt-2 rounded-full" />
            </div>

            <div className='flex flex-col-reverse'>
                <div className="flex flex-wrap mt-2">
                    {watchHistoryList?.map((video, index) => (
                        <VideoGridItem1 key={index} {...video} />
                    ))}
                </div>

                <div className='mt-3 sm:mt-6 text-center'>
                    <button
                        onClick={(e) => handleClearWatchHistory(e)}
                        type='button'
                        className="bg-neutral-900 border border-neutral-700 text-white px-1.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium hover:border-red-500 hover:text-red-400 transition-colors duration-200 cursor-pointer">
                        Clear WatchHistory
                    </button>
                </div>

                {/* <div className='mt-6'>
                <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:border-red-500 hover:text-red-400 hover:shadow-red-500/30">
                    <span className="absolute inset-0 h-full w-full scale-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-10 transition-all duration-500 group-hover:scale-100"></span>
                    <span className="relative z-10">Clear Watch History</span>
                </button>

            </div> */}
            </div>

        </div>
    )
}

export default History