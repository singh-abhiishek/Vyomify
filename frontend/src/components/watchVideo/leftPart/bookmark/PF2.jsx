import React, { useState, useEffect } from 'react'
import { ClipLoader } from "react-spinners"
import { usePlaylistModal } from '../../../../contextAPI/PlaylistModalContext ';
import { useCreatePlaylistMutation } from '../../../../store/slices/playlistApiSlice';
import { showToastMessage } from '../../../../utils/showToaster';
import { useRef } from 'react';
import useOutsideClick from '../../../../hooks/UseOutsideClick';

const PF2 = () => {

    // from PlaylistModalContext
    const { isPF2Open, closePF2Modal, refetch } = usePlaylistModal()

    const [isPrivate, setIsPrivate] = useState(true); // false = public, true = private
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    // create new playlist
    const [createPlaylist, { isLoading }] = useCreatePlaylistMutation({})
    const handleSubmit = async (e) => {
        //api call
        e.preventDefault();
        console.log("create playlist start from pf2")
        try {
            const response = await createPlaylist({
                name,
                description,
                isPrivate
            }).unwrap()

            console.log("response after creating playlist", response)
            if (response.success) {
                refetch()
                closePF2Modal()
                showToastMessage("playlist created successfully.", "success")
            }
        } catch (error) {
            console.log("errorr...", error)
            if (error.status === 409) {
                showToastMessage("A playlist with this name already exists.", "error");
            }
            else showToastMessage("Request failed!", "error");
        }
    }

    const modalRef = useRef()
    useOutsideClick(modalRef, closePF2Modal, isPF2Open);

    return (
        <form >
            <div 
            ref={modalRef}
            className='dark:bg-[#1d1d1d] p-2 sm:p-4 py-2 sm:py-4 w-[250px] sm:w-[300px] shadow-[0_2px_20px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-300 rounded-lg absolute z-50 left-1/2 sm:left-2/3 top-2/3 sm:top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className=''>
                    {/* name  */}
                    <div className='mb-0.5'>
                        <textarea
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-gray-300 pl-2 py-2 h-17 min-h-[3.5rem] max-h-20 overflow-auto rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none text-[13px] sm:text-sm"
                        />
                    </div>

                    {/* Description  */}
                    <div className='mb-0'>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-gray-300 py-2 pl-2 pr-4 h-32 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none text-[13px] sm:text-sm"
                        />
                    </div>


                    {/* private or public  */}
                    <div className='flex gap-2 mt-0.5 text-[13px] sm:text-sm'>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                value="false"
                                checked={!isPrivate}
                                onChange={() => setIsPrivate(false)}
                            />
                            Public
                        </label>

                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                value="true"
                                checked={isPrivate}
                                onChange={() => setIsPrivate(true)}
                            />
                            Private
                        </label>
                    </div>

                    {/* line  */}
                    <div class="border-t border-gray-700 flex-grow  w-full mt-1 mb-2">
                    </div>

                    {/* cancel and create button  */}
                    <div className='flex justify-between gap-2'>
                        <div
                            className="rounded-lg bg-[#2b2b2b] text-gray-200 px-1 sm:px-2 py-0.5 
                            border border-[#3d3d3d] hover:bg-[#3a3a3a] 
                            hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]">
                            <button
                                type="button"
                                onClick={closePF2Modal}
                                className="p-1.5 text-[13px] sm:text-sm cursor-pointer">
                                <span class="relative">Cancel</span>
                            </button>
                        </div>

                        <div 
                        className={`rounded-lg px-1 sm:px-2 py-0.5 
                                border border-[#3d3d3d] ${(!name || !description) ? "bg-[#363636] text-gray-500" : "bg-[#2b2b2b] text-gray-200 hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d] "}`}>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={(!name || !description)}
                                className={`p-1.5 text-[13px] sm:text-sm ${(!name || !description) ? "" : "cursor-pointer"}`}
                            >
                                {/* Create */}
                                {isLoading ? (
                                    <div
                                        className="flex items-center gap-2"
                                    >
                                        <ClipLoader size={18} color="#fff" />
                                        {/* <span>creating...</span> */}
                                    </div>
                                ) : ("Create")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PF2