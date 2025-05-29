import React, { useState, useEffect } from 'react'
import { ClipLoader } from "react-spinners"
import { showToastMessage } from "../../utils/showToaster.jsx"
import { useCreatePlaylistMutation } from '../../store/slices/playlistApiSlice.js'

const PlaylistForm2 = ({ modalRef2, setIsOpen2, onPlaylistCreated }) => {

    const [isPrivate, setIsPrivate] = useState(); // false = public, true = private
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const [createPlaylist, { isLoading }] = useCreatePlaylistMutation({})

    const handleSubmit = async (e) => {
        //api call
        e.preventDefault();
        setLoading(true) // for loader 
        try {
            const response = await createPlaylist({
                name,
                description,
                isPrivate
            }).unwrap()

            // console.log("response after creating playlist", response)
            if (response.success) {
                onPlaylistCreated(); // ✅ refetch playlists 
                showToastMessage("playlist created successfully.", "success")
                setIsOpen2(false)
            }
        } catch (error) {
            console.log("errorr...", error)
            if (error.status === 410) {
                showToastMessage(error.response?.data?.message, "error");
            }
            else showToastMessage("Request failed!", "error");
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}
            ref={modalRef2}
        >
            {/* <div className='dark:bg-[#1d1d1d] p-4 py-5 w-[400px] '> */}
            <div className='dark:bg-[#1d1d1d] p-4 py-3 w-[300px] shadow-[0_2px_20px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-300 rounded-lg'>
                <div className=''>
                    {/* name  */}
                    <div className='mb-1'>
                        <textarea
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-gray-300 pl-2 py-2 h-17 min-h-[3.5rem] max-h-20 overflow-auto rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none text-[13px] sm:text-sm"
                        />
                    </div>

                    {/* Description  */}
                    <div className='mb-1'>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-gray-300 py-2 pl-2 pr-4 h-32 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none text-[13px] sm:text-sm"
                        />
                    </div>


                    {/* private or public  */}

                    <div className="flex gap-4 mt-1 text-[13px] sm:text-sm">
                        <label className="flex items-center gap-1 cursor-pointer hover:text-red-400 transition-colors duration-200">
                            <input
                                type="radio"
                                value="false"
                                checked={!isPrivate}
                                onChange={() => setIsPrivate(false)}
                                className="accent-red-500 cursor-pointer"
                            />
                            <span className="text-gray-200 hover:text-red-400">Public</span>
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer hover:text-red-400 transition-colors duration-200">
                            <input
                                type="radio"
                                value="true"
                                checked={isPrivate}
                                onChange={() => setIsPrivate(true)}
                                className="accent-red-500 cursor-pointer"
                            />
                            <span className="text-gray-200 hover:text-red-400">Private</span>
                        </label>
                    </div>

                    {/* line  */}
                    <div class="border-t border-gray-700 flex-grow  w-full mt-1 mb-2">
                    </div>

                    {/* cancel and create button  */}
                    <div className='flex justify-between gap-2'>
                        <div
                            className="rounded-lg bg-[#2b2b2b] text-gray-200 px-2 py-0.5 
                    border border-[#3d3d3d] hover:bg-[#3a3a3a] 
                    hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]">
                            <button
                                type="button"
                                onClick={() => setIsOpen2(false)}
                                className="p-1.5 text-sm cursor-pointer">
                                <span class="relative">Cancel</span>
                            </button>
                        </div>

                        <div className={`rounded-lg px-2 py-0.5 
                        border border-[#3d3d3d] ${(!name || !description) ? "bg-[#363636] text-gray-500" : "bg-[#2b2b2b] text-gray-200 hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d] "}`}>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={(!name || !description)}
                                className={`p-1.5 text-sm ${(!name || !description) ? "cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                {/* Create */}
                                {loading ? (
                                    <div
                                        className="flex items-center gap-2"
                                    >
                                        <ClipLoader size={18} color="#fff" />
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

export default PlaylistForm2