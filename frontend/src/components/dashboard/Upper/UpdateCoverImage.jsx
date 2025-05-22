import React, { useEffect, useRef, useState } from 'react'
import { Spinner } from '../../../utils/loadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { login as setCredentialsInStore } from '../../../store/slices/authSlice';
import { Camera } from 'lucide-react';
import { showToastMessage } from '../../../utils/showToaster';
import { useUpdateUserCoverImageMutation } from '../../../store/slices/userApiSlice'
import useOutsideClick from '../../../hooks/UseOutsideClick';

const UpdateCoverImage = () => {

    const user = useSelector(state => state?.auth?.userData?.user)
    const userId = user?._id
    const currCoverImage = user?.coverImage

    // console.log("curr coverImage", currCoverImage)
    const [coverImage, setCoverImage] = useState("")              // ye sirf frontend preview k liye hai
    const [coverImageFile, setCoverImageFile] = useState(null);   // ye file backend m jayegi

    useEffect(() => {
        if (currCoverImage) setCoverImage(currCoverImage);
    }, [currCoverImage]);

    // open form 
    const [isCoverImageFormOpen, setIsCoverImageFormOpen] = useState(false)

    // This hook listens for outside click, and close the pop up modal
    const modalRef = useRef()
    useOutsideClick(modalRef, () => setIsCoverImageFormOpen(false), isCoverImageFormOpen);

    // handlel coverImage change
    const handleCoverImageChange = (e) => {
        console.log("coverImage change", e.target.files[0])
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setCoverImageFile(file); // for backend
            const previewUrl = URL.createObjectURL(file);
            setCoverImage(previewUrl); // for preview image at frontend
        } else {
            showToastMessage("choose valid Avatar", "error")
        }
    }

    // handle coverImage update
    const dispatch = useDispatch()
    const [updateUserCoverImage, { isLoading }] = useUpdateUserCoverImageMutation()
    const handleCoverImageUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("coverImage", coverImageFile);
        try {
            const response = await updateUserCoverImage(formData).unwrap()

            if (response.success) {
                // console.log("response after avatar update", response?.data)
                const data = response?.data
                dispatch(setCredentialsInStore(data))
                showToastMessage("coverImage Updated Successfully", "success")
            }
        } catch (error) {
            console.log("error occured while coverImage updation", error);
            showToastMessage("coverImage not updated - error", "error")
        } finally {
            setCoverImageFile(null)
            setIsCoverImageFormOpen(false)
        }
    }

    return (
        <div>
            <div className="mb-2 flex relative group">
                <button
                    className='cursor-pointer w-full h-25 sm:h-40 lg:h-44 object-cover'
                    onClick={() => setIsCoverImageFormOpen(true)}
                    title="Change coverImage"
                >
                    <img
                        src={currCoverImage}
                        alt="Current coverImage"
                        className="w-full h-30 sm:h-40 lg:h-44 rounded-sm object-cover border-gray-700 shadow-md"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Camera className="text-white" size={20} />
                    </div>
                </button>
            </div>

            {isCoverImageFormOpen && (
                <form onSubmit={handleCoverImageUpdate}
                    ref={modalRef}
                >
                    <div className='dark:bg-[#1d1d1d] p-4 py-5 w-[280px] shadow-[0_2px_20px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-300 rounded-lg absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
                        <div className='space-y-2'>

                            {/* coverImage update */}
                            <div>
                                <label className='block text-gray-300 text-sm mb-1'>Current coverImage</label>

                                {/* Show existing coverImage */}
                                <div className=" flex justify-center w-full h-40">
                                    <img
                                        src={coverImage}
                                        alt="Current Avatar"
                                        className="w-full h-35 object-cover border rounded-lg border-gray-700 shadow-md"
                                    />
                                </div>

                                <label className='block text-gray-300 text-sm mb-1'>Choose New coverImage</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCoverImageChange}
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
                                            setCoverImage(currCoverImage)
                                            setCoverImageFile(null)
                                            setIsCoverImageFormOpen(false)
                                        }}
                                        className="p-1.5 text-sm cursor-pointer">
                                        <span className="relative">Cancel</span>
                                    </button>
                                </div>

                                <div className={`rounded-lg px-2 py-0.5 border border-[#3d3d3d] ${!coverImageFile ? "bg-[#363636] text-gray-500" : "bg-[#2b2b2b] text-gray-200 hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]"}`}>
                                    <button
                                        type="submit"
                                        disabled={!coverImageFile}
                                        className={`p-1.5 text-sm ${!coverImageFile ? "" : "cursor-pointer"}`}>
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

export default UpdateCoverImage