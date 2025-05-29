import React, { useEffect, useRef, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { ClipLoader } from 'react-spinners'
import { useUpdatePlaylistMutation } from '../../../store/slices/playlistApiSlice'
import { showToastMessage } from '../../../utils/showToaster'
import useOutsideClick from '../../../hooks/UseOutsideClick'

const UpdatePlaylist = ({
    playlistId,
    playlist,
    refetchPlaylistById,
    playlistOwnerId,
    loginUserId,
}) => {
    // console.log(loginUserId, playlistOwnerId)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        if (playlist) {
            setName(playlist.name || "");
            setDescription(playlist.description || "");
            setIsPrivate(playlist.isPrivate || false);
        }
    }, [playlist]);

    const [openUpdateForm, setOpenUpdateForm] = useState(false)
    // This hook listens for outside click, and close the pop up modal
    const modalRef = useRef()
    useOutsideClick(modalRef, () => setOpenUpdateForm(false), openUpdateForm);

    // update playlist
    const [updatePlaylist, { isLoading }] = useUpdatePlaylistMutation()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await updatePlaylist({
                playlistId,
                name,
                description,
                isPrivate
            }).unwrap()

            refetchPlaylistById()
            // console.log("response while updating playlist", response)
            showToastMessage("Playlist Updated", "success")
        } catch (error) {
            console.log("error while updating playlist", error)
            showToastMessage("error in updating playlist", "error")
        } finally {
            setOpenUpdateForm(false)
        }
    }

    return (
        <div>
            <FiEdit
                className={` ${playlistOwnerId !== loginUserId ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                onClick={() => {
                    if (playlistOwnerId === loginUserId) {
                        setOpenUpdateForm(true);
                    }
                }}
            />


            {openUpdateForm &&
                <form
                    ref={modalRef}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-[270px] md:w-[300px] max-w-md mx-auto p-5 rounded-lg z-50
    bg-[#212121] dark:bg-[#1d1d1d]
    border border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.6)]
    transition-all duration-300 space-y-2">

                        {/* Name */}
                        <div>
                            <textarea
                                placeholder="Playlist name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-gray-300 pl-2 py-2 h-18 resize-none rounded-lg w-full
          border border-gray-700 bg-transparent focus:border-blue-500 
          hover:border-gray-500 outline-none transition-all duration-200 text-[14px] sm:text-sm"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="text-gray-300 pl-2 py-2 h-26 resize-none rounded-lg w-full
          border border-gray-700 bg-transparent focus:border-blue-500 
          hover:border-gray-500 outline-none transition-all duration-200 text-[14px] sm:text-sm"
                            />
                        </div>

                        {/* Privacy */}
                        <div className='flex gap-3 text-[13px] sm:text-sm text-gray-300 '>
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    value="false"
                                    checked={!isPrivate}
                                    onChange={() => setIsPrivate(false)}
                                    className="accent-red-500 cursor-pointer"
                                />
                                <span className="text-gray-200 hover:text-red-400 cursor-pointer">Public</span>
                            </label>

                            <label className="flex items-center gap-2 ">
                                <input
                                    type="radio"
                                    value="true"
                                    checked={isPrivate}
                                    onChange={() => setIsPrivate(true)}
                                    className="accent-red-500 cursor-pointer"
                                />
                                <span className="text-gray-200 hover:text-red-400 cursor-pointer">Private</span>
                            </label>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-700 my-2" />

                        {/* Buttons */}
                        <div className='flex justify-between gap-2'>
                            {/* Cancel */}
                            <div className="rounded-lg bg-[#2b2b2b] text-gray-200 px-1 sm:px-1.5 py-0.5 
        border border-[#3d3d3d] hover:bg-[#3a3a3a] hover:text-white 
        transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]">
                                <button
                                    type="button"
                                    onClick={() => setOpenUpdateForm(false)}
                                    className="p-1 sm:p-1.5 text-sm cursor-pointer"
                                >
                                    <span className="relative">Cancel</span>
                                </button>
                            </div>

                            {/* Update */}
                            <div className={`rounded-lg px-2 py-0.5 
        border border-[#3d3d3d] ${(!name || !description)
                                    ? "bg-[#363636] text-gray-500"
                                    : "bg-[#2b2b2b] text-gray-200 hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]"}`}>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={!name || !description}
                                    className={`p-1 sm:p-1.5 text-sm ${(!name || !description) ? "" : "cursor-pointer"}`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <ClipLoader size={18} color="#fff" />
                                        </div>
                                    ) : ("Update")}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            }
        </div>
    )
}

export default UpdatePlaylist