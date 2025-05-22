import React, { useRef } from 'react'
import { usePlaylistModal } from '../../../../contextAPI/PlaylistModalContext ';
import { ClipLoader } from 'react-spinners';
import { X } from "lucide-react";
import useOutsideClick from '../../../../hooks/UseOutsideClick';

const PF1 = ({ videoId }) => {

    const {
        isPF1Open,
        isPF2Open,
        closePF1Modal,
        userPlaylistsName,
        setSelectedPlaylists,
        selectedPlaylists,
        handleAddToPlaylists,
        openPF2Modal,
        isLoading
    } = usePlaylistModal()

    const noOfSelectedPlaylist = selectedPlaylists.length
    // console.log("noOfSelectedPlaylist",selectedPlaylists)

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedPlaylists((prev) =>
            checked ? [...prev, value] : prev.filter(id => id !== value)
        );
    };

    const handleAddButtonClick = (e) => {
        e.preventDefault();
        handleAddToPlaylists(videoId); // Pass the actual video ID here
    };

    const modalRef = useRef()
    useOutsideClick(modalRef, closePF1Modal, isPF1Open, isPF2Open);

    return (
        <div
        ref={modalRef}
            className='dark:bg-[#1c1c1c] p-4 py-2 sm:py-3 w-[250px] sm:w-[300px] rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.7)] border border-white/10 backdrop-blur-sm transition-all duration-300 absolute z-40 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='flex flex-col gap-2 '>

                {/* <X 
                onClick={closePF1Modal}
                /> */}
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
                    <div>
                        <h2 className='font-semibold text-sm sm:font-bold font-amaranth '>
                            Select Playlists
                        </h2>

                        {userPlaylistsName?.map((playlist, index) => (
                            <label key={index} className="block">
                                <input
                                    type="checkbox"
                                    value={playlist._id}
                                    className='cursor-pointer'
                                    onChange={handleCheckboxChange}
                                />
                                <span className="ml-2 text-[14px]">
                                    {playlist.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* line  */}
                <div class="border-t border-gray-700 flex-grow  w-full mt-1">
                </div>

                {/* buttons :- new playlist , add  */}
                <div className='flex justify-between items-center p-0'>

                    <div className="rounded-lg bg-[#2b2b2b] text-gray-200 px-1 sm:px-2 sm:py-0.5 
                border border-[#3d3d3d] hover:bg-[#3a3a3a] 
                hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]"
                    >
                        <button
                            onClick={openPF2Modal}
                            className='p-1 px-2 text-[13px] sm:text-sm cursor-pointer'>
                            New playlist
                        </button>
                    </div>


                    <div className={`rounded-lg ${noOfSelectedPlaylist === 0 ? "bg-[#363636] text-gray-500" : "bg-[#2b2b2b] text-gray-200 hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d] "} px-1 sm:px-2 sm:py-0.5 
                border border-[#3d3d3d]`
                    }
                    >
                        <button
                            onClick={handleAddButtonClick}
                            className={`p-1 px-2 text-[13px] sm:text-sm ${noOfSelectedPlaylist === 0 ? "" : "cursor-pointer"}`}
                            disabled={noOfSelectedPlaylist === 0}
                        >
                            {noOfSelectedPlaylist === 0 ? "Select" : "Add"}
                            {/* Add */}

                            {!isLoading ? (
                                <div
                                    className="flex items-center gap-2"
                                >
                                    <ClipLoader size={18} color="#fff" />
                                    {/* <span>creating...</span> */}
                                </div>
                            ) : ("")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PF1 