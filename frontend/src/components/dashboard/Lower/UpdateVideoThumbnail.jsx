import { Pencil } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { Spinner } from '../../../utils/loadingIndicator';
import { showToastMessage } from '../../../utils/showToaster';
import { useUpdateVideoThumbailMutation } from '../../../store/slices/videoApiSlice';
import useOutsideClick from '../../../hooks/UseOutsideClick';

const UpdateVideoThumbnail = ({
    videoId,
    currThumbnail,
    refetchChannelVideos,
}) => {

    // console.log("curr thumnail", currThumbnail)
    const [thumbnail, setThumbnail] = useState("")              // ye sirf frontend preview k liye hai
    const [thumbnailFile, setThumbnailFile] = useState(null);   // ye file backend m jayegi
    useEffect(() => {
        if (currThumbnail) setThumbnail(currThumbnail);
    }, [currThumbnail]);

    // open form 
    const [isThumbnailFormOpen, setIsThumbnailFormOpen] = useState(false)
    // This hook listens for outside click, and close the pop up modal
    const modalRef = useRef()
    useOutsideClick(modalRef, () => setIsThumbnailFormOpen(false), isThumbnailFormOpen);

    // handlel thumnail change
    const handleThumbnailChange = (e) => {
        // console.log("thumbnail change", e.target.files[0])
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setThumbnailFile(file); // for backend
            const previewUrl = URL.createObjectURL(file);
            setThumbnail(previewUrl); // for preview image at frontend
        } else {
            showToastMessage("choose valid Thumbnail", "error")
        }
    }

    // handle thumbnail update
    const [UpdateVideoThumbnail, { isLoading }] = useUpdateVideoThumbailMutation()
    const handleThumbnailUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("thumbnail", thumbnailFile);

        try {
            const response = await UpdateVideoThumbnail({
                videoId,
                formData
            }).unwrap()

            if (response.success) {
                // console.log("response after thumbnail update", response)
                showToastMessage("Thumnail Updated", "success")
                refetchChannelVideos()
            }
        } catch (error) {
            console.log("error occured while Thumbnail updation", error);
            showToastMessage("Thumbnail not updated - error", "error")
        } finally {
            // setThumbnail(null)
            setThumbnailFile(null)
            setIsThumbnailFormOpen(false)
        }
    }

    return (
        <div>
            <div className="relative w-fit">
                <img
                    src={currThumbnail}
                    alt="thumbnail"
                    className="w-18 h-11 object-cover rounded-md border border-gray-600"
                />
                <button
                    onClick={() => setIsThumbnailFormOpen(true)}
                    title="Change thumbnail"
                    className="absolute bottom-0 right-0 bg-black/60 p-1 rounded-full text-blue-400 hover:text-blue-600 cursor-pointer"
                >
                    <Pencil size={14} />
                    {/* <FiEdit size={14} /> */}
                </button>
            </div>

            {isThumbnailFormOpen && (
                <form onSubmit={handleThumbnailUpdate}
                ref={modalRef}
                >
                    <div className='dark:bg-[#1d1d1d] p-4 py-5 w-[300px] md:w-[330px] shadow-[0_2px_20px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-300 rounded-lg absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
                        <div className='space-y-3'>

                            {/* Thumbnail update */}
                            <div>
                                <label className='block text-gray-300 text-sm mb-1'>Current Thumbnail</label>

                                {/* Show existing thumbnail */}
                                <div className="mb-3">
                                    <img
                                        src={thumbnail}
                                        alt="Current Thumbnail"
                                        className="w-full h-40 md:h-44 object-cover rounded-lg border border-gray-700"
                                    />
                                </div>

                                <label className='block text-gray-300 text-sm mb-1'>Choose New Thumbnail</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleThumbnailChange(e)}
                                    className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2b2b2b] file:text-white hover:file:bg-[#3a3a3a] transition-all"
                                />
                            </div>


                            {/* Line */}
                            <div className="border-t border-gray-700 w-full"></div>

                            {/* Buttons */}
                            <div className='flex justify-between gap-2'>
                                <div
                                    className="rounded-lg bg-[#2b2b2b] text-gray-200 px-2 py-0.5 border border-[#3d3d3d] hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setThumbnail(currThumbnail)
                                            setThumbnailFile(null)
                                            setIsThumbnailFormOpen(false)
                                        }}
                                        className="p-1.5 text-sm cursor-pointer">
                                        <span className="relative">Cancel</span>
                                    </button>
                                </div>

                                <div className={`rounded-lg px-2 py-0.5 border border-[#3d3d3d] ${!thumbnailFile ? "bg-[#363636] text-gray-500" : "bg-[#2b2b2b] text-gray-200 hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]"}`}>
                                    <button
                                        type="submit"
                                        disabled={!thumbnailFile}
                                        className={`p-1.5 text-sm ${!thumbnailFile ? "" : "cursor-pointer"}`}>
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

export default UpdateVideoThumbnail