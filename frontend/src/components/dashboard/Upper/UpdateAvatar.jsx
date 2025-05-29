import React, { useEffect, useRef, useState } from 'react'
import { Spinner } from '../../../utils/loadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { login as setCredentialsInStore } from '../../../store/slices/authSlice';
import { Camera } from 'lucide-react';
import { showToastMessage } from '../../../utils/showToaster';
import { useUpdateUserAvatarMutation } from '../../../store/slices/userApiSlice';
import useOutsideClick from '../../../hooks/UseOutsideClick';


const UpdateAvatar = () => {

    const user = useSelector(state => state?.auth?.userData?.user)
    const userId = user?._id
    const currAvatar = user?.avatar

    // console.log("curr thumnail", currThumbnail)
    const [avatar, setAvatar] = useState("")              // ye sirf frontend preview k liye hai
    const [avatarFile, setAvatarFile] = useState(null);   // ye file backend m jayegi

    useEffect(() => {
        if (currAvatar) setAvatar(currAvatar);
    }, [currAvatar]);

    // open form 
    const [isAvatarFormOpen, setIsAvatarFormOpen] = useState(false)
    // This hook listens for outside click, and close the pop up modal
    const modalRef = useRef()
    useOutsideClick(modalRef, () => setIsAvatarFormOpen(false), isAvatarFormOpen);

    // handlel thumnail change
    const handleAvatarChange = (e) => {
        // console.log("avatar change", e.target.files[0])
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setAvatarFile(file); // for backend
            const previewUrl = URL.createObjectURL(file);
            setAvatar(previewUrl); // for preview image at frontend
        } else {
            showToastMessage("choose valid Avatar", "error")
        }
    }

    // handle thumbnail update
    const dispatch = useDispatch()
    const [updateUserAvatar, {isLoading}] = useUpdateUserAvatarMutation()
    const handleAvatarUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        try {
            const response = await updateUserAvatar(formData).unwrap()

            if (response.success) {
                // console.log("response after avatar update", response?.data)
                const data = response?.data
                dispatch(setCredentialsInStore(data))
                showToastMessage("Avatar Updated Successfully", "success")
            }
        } catch (error) {
            console.log("error occured while avatar updation", error);
            showToastMessage("avatar not updated - error", "error")
        } finally {
            setAvatarFile(null)
            setIsAvatarFormOpen(false)
        }
    }

    return (
        <div>

            <div className="mb-1 flex justify-center relative group">
                <button
                    className='cursor-pointer'
                    onClick={() => setIsAvatarFormOpen(true)}
                    title="Change Avatar"
                >
                    <img
                        src={currAvatar}
                        alt="Current Avatar"
                        className="w-24 h-24 md:h-35 md:w-35 md:ml-1 lg:h-40 lg:w-40 object-cover rounded-full border border-gray-700 shadow-md"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Camera className="text-white" size={20} />
                    </div>
                </button>
            </div>

            {isAvatarFormOpen && (
                <form onSubmit={handleAvatarUpdate}
                ref={modalRef}
                >
                    <div className='dark:bg-[#1d1d1d] p-4 py-5 w-[280px] shadow-[0_2px_20px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-300 rounded-lg absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
                        <div className='space-y-3'>

                            {/* Avatar update */}
                            <div>
                                <label className='block text-gray-300 text-sm mb-1'>Current Avatar</label>

                                {/* Show existing thumbnail */}
                                <div className="mb-3 flex justify-center">
                                    <img
                                        src={avatar}
                                        alt="Current Avatar"
                                        className="w-28 h-28 object-cover rounded-full border border-gray-700 shadow-md"
                                    />
                                </div>

                                <label className='block text-gray-300 text-sm mb-1'>Choose New Avatar</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="w-full text-gray-200 file:mr-4 file:py-1.5 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2b2b2b] file:text-white hover:file:bg-[#3a3a3a] transition-all cursor-pointer"
                                />
                            </div>


                            {/* Line */}
                            <div className="border-t border-gray-700 w-full"></div>

                            {/* Buttons */}
                            <div className='flex justify-between gap-1'>
                                <div
                                    className="rounded-lg bg-[#2b2b2b] text-gray-200 px-1 border border-[#3d3d3d] hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAvatar(currAvatar)
                                            setAvatarFile(null)
                                            setIsAvatarFormOpen(false)
                                        }}
                                        className="p-1.5 text-sm cursor-pointer">
                                        <span className="relative">Cancel</span>
                                    </button>
                                </div>

                                <div className={`rounded-lg px-2 py-0.5 border border-[#3d3d3d] ${!avatarFile ? "bg-[#363636] text-gray-500" : "bg-[#2b2b2b] text-gray-200 hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]"}`}>
                                    <button
                                        type="submit"
                                        disabled={!avatarFile}
                                        className={`p-1.5 text-sm ${!avatarFile ? "" : "cursor-pointer"}`}>
                                        {isLoading ? <Spinner /> : "Change"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default UpdateAvatar