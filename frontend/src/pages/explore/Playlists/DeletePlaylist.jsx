import React, { useRef, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useDeletePlaylistMutation } from '../../../store/slices/playlistApiSlice'
import { showToastMessage } from '../../../utils/showToaster'
import { useNavigate } from 'react-router-dom'
import useOutsideClick from '../../../hooks/UseOutsideClick'

const DeletePlaylist = ({
    playlistId,
    playlistOwnerId,
    loginUserId
}) => {

    const navigate = useNavigate()
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    // This hook listens for outside click, and close the pop up modal
    const modalRef = useRef()
    useOutsideClick(modalRef, () => setIsDeleteOpen(false), isDeleteOpen);

    // delete playlist
    const [deletePlaylist, { isLoading }] = useDeletePlaylistMutation()
    const handlePlaylistDelete = async () => {
        try {
            const response = await deletePlaylist(playlistId).unwrap()

            // console.log("response from delete playlist", response)
            if (response.success) {
                showToastMessage("Playlist Deleted", "success")
                navigate('/explore/playlists')
            }
        } catch (error) {
            console.error("error while deleting playlist", error)
            showToastMessage("Failed to delete playlist", "error")
        }
    }

    return (
        <div>
            <FiTrash2
                className={` ${playlistOwnerId !== loginUserId ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                onClick={() => {
                    if (playlistOwnerId === loginUserId) {
                        setIsDeleteOpen(true);
                    }
                }}
            />

            {/* delete popup  */}
            {isDeleteOpen && <div
                ref={modalRef}
                className="bg-[#212121] absolute left-5  sm:top-1/3 sm:left-1/3 z-40 p-4 sm:p-6 rounded-2xl shadow-lg w-[260px] sm:w-full max-w-md mx-auto">
                <h2 className="text-white text-md sm:text-lg font-semibold mb-2">Delete Playlist</h2>

                <p className="text-gray-400 text-[13px] sm:text-sm mb-4 sm:mb-6">Are you sure you want to permanently delete this Playlist? This action cannot be undone.</p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setIsDeleteOpen(false)}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handlePlaylistDelete}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default DeletePlaylist