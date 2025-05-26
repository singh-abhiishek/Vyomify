import React, { useEffect, useState } from 'react'
import AllPlaylists from './AllPlaylists'
import { useFormContext } from 'react-hook-form';

const PlaylistForm1 = ({ modalRef1, setIsOpen1, setIsOpen2, userPlaylistsName }) => {

    console.log("from playlistForm1", userPlaylistsName)

    const { watch } = useFormContext()
    const playlistIds = watch("playlistIds") || [];
    const noOfSelectedPlaylist = playlistIds.length;

    const handleAddToPlaylists = (e) => {
        // api call to add the video in playlist
        e.preventDefault();
        setIsOpen1(false)
    }


    return (
        // <div className='dark:bg-[#1c1c1c] p-5 py-4 w-[420px] rounded-xl relative'>
        <div className='dark:bg-[#1c1c1c] p-5 py-4 w-[420px] rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.7)] border border-white/10 backdrop-blur-sm transition-all duration-300 relative'>
            <div className='flex flex-col gap-2 '
                ref={modalRef1}
            >

                {/* close button  */}
                {/* <div className='text-4xl absolute right-0.5 top-1'>
                    <svg
                        onClick={() => setIsOpen1(false)}
                        className="mr-2 cursor-pointer stroke-zinc-800 dark:stroke-zinc-400 hover:stroke-white transition-colors duration-200"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </div> */}

                {/* searchbar */}
                <div className='border mt-2'>
                    <input
                        type="text"
                        placeholder="Search..."
                        name="searchBox"
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                        className="text-white md:text-[14px] lg:text-[16px] py-1 pl-2 pr-10 mr-1 w-full bg-transparent outline-none " />
                </div>

                {/* playlist options */}
                <div className='mt-2 '>
                    <AllPlaylists userPlaylistsName={userPlaylistsName} />
                </div>

                {/* line  */}
                <div class="border-t border-gray-700 flex-grow  w-full mt-3">
                </div>

                {/* buttons :- new playlist , add  */}
                <div className='flex justify-between items-center p-0'>

                    <div className="rounded-lg bg-[#2b2b2b] text-gray-200 px-2 py-0.5 
                border border-[#3d3d3d] hover:bg-[#3a3a3a] 
                hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]"
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setIsOpen2(true)
                            }}
                            className='p-1 text-sm cursor-pointer'>
                            New playlist
                        </button>
                    </div>

                    <div className={`rounded-lg ${noOfSelectedPlaylist === 0 ? "bg-[#363636] text-gray-500" : "bg-[#2b2b2b] text-gray-200 hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d] "} px-2 py-0.5 
                border border-[#3d3d3d] 
                `}
                    >
                        <button
                            onClick={handleAddToPlaylists}
                            disabled={noOfSelectedPlaylist === 0}
                            className={`p-1 px-2 text-sm ${noOfSelectedPlaylist === 0 ? "" : "cursor-pointer"}`}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistForm1