import React from 'react'
import { useGetUserPlaylistsQuery } from '../../../store/slices/playlistApiSlice'
import { Spinner } from '../../../utils/loadingIndicator'
import PlaylistGridItem from '../../../components/videoGrid/PlaylistGridItem'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Playlists = () => {

    const user = useSelector(state => state?.auth?.userData?.user)
    const userId = user?._id;

    const location = useLocation()
    // console.log("location", location)

    // fetch all playlists of user
    const { data: response, isLoading } = useGetUserPlaylistsQuery(userId)
    const playlistsList = response?.data
    // console.log("response from explore playlists", playlistsList)

    if (isLoading) {
        return <div className='bg-black text-white w-full flex flex-col items-center justify-center gap-2 py-10 text-center'>
            <Spinner /> <p className="text-3xl text-gray-400">Loading</p>
        </div>
    }

    if (playlistsList?.length < 2) {
        return (
            <div className="bg-black text-white w-full flex flex-col items-center justify-center gap-3 py-12 text-center">
                <h2 className="text-xl font-semibold text-gray-300">No Playlists Found</h2>
                <p className="text-sm text-gray-500 max-w-md">
                    You haven’t created any playlists yet. Start building your collection!
                </p>
            </div>
        );
    }

    return (
        // <div className="bg-neutral-950 text-white w-full px-6 ">
        <div className="bg-black text-white w-full px-6 ">
            {/* Heading */}
            {!location.pathname.includes('explore/profile') &&
                <div className="flex flex-col items-center mb-2">
                    <div className="flex items-end gap-2 text-white text-xl sm:text-2xl font-semibold">
                        <h1 className="text-red-600 font-amaranth font-bold text-3xl sm:text-4xl leading-none">Playlists</h1>
                        <span className="text-zinc-300 font-medium">Curated for You</span>
                    </div>
                    <span className="block h-0.5 w-10 bg-gradient-to-r from-red-600 to-rose-500 mt-2 rounded-full" />
                </div>
            }


            {/* Video Grid */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"> */}
            <div className="flex flex-wrap gap-4">
                {playlistsList?.map((playlist, index) => (
                    playlist?.name !== "Watch Later" && (<div key={index}>
                        <PlaylistGridItem {...playlist} />
                    </div>)
                ))}
            </div>
        </div>
    )
}

export default Playlists