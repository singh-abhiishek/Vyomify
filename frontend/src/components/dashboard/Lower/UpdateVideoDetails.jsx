import React, { useEffect, useRef, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { ClipLoader } from 'react-spinners'
import { Spinner } from '../../../utils/loadingIndicator'
import { useUpdateVideoDetailsMutation } from '../../../store/slices/videoApiSlice'
import { showToastMessage } from '../../../utils/showToaster'
import useOutsideClick from '../../../hooks/UseOutsideClick'

const UpdateVideoDetails = ({
    videoId,
    currTitle,
    currDescription,
    refetchChannelVideos,
}) => {

    // console.log("currTitle", currTitle);

    // set initial values
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    useEffect(() => {
        if (currTitle) setTitle(currTitle);
        if (currDescription) setDescription(currDescription);
    }, [currTitle, currDescription]);


    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
    // This hook listens for outside click, and close the pop up modal
    const modalRef = useRef()
    useOutsideClick(modalRef, () => setIsUpdateFormOpen(false), isUpdateFormOpen);

    // handle form
    const [updateVideoDetails, { isLoading }] = useUpdateVideoDetailsMutation()
    const handleFormSumbit = async (e) => {
        e.preventDefault();
        // console.log("after form submission", updateVideoId, title, description)

        try {
            const response = await updateVideoDetails({
                videoId,
                title,
                description
            }).unwrap()

            if (response.success) {
                // console.log("response after updating video details", response);
                showToastMessage("Details Updated", "success")
            }
        } catch (error) {
            console.log("error occured while video details updation", error);
            showToastMessage("details not updated - error", "error")
        } finally {
            setIsUpdateFormOpen(false)
        }
    }

    return (
        <div className="w-fit max-w-[120px] truncate">
            <button
                onClick={() => setIsUpdateFormOpen(true)}
                title="Update title / description"
                className=" bg-black/60 p-1 rounded-full text-blue-400 hover:text-blue-600 cursor-pointer"
            >
                <FiEdit size={17} />
            </button>

            {/* form  */}
            {isUpdateFormOpen && <form onSubmit={(e) => handleFormSumbit(e)}
            ref={modalRef}
                >
                {/* <div className='dark:bg-[#1d1d1d] p-4 py-5 w-[400px] '> */}
                <div className='dark:bg-[#1d1d1d] p-4 py-5 w-[290px] md:w-[330px] shadow-[0_2px_20px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-300 rounded-lg absolute left-1/2 top-1/2  z-5 -translate-x-1/2 -translate-y-1/2'>
                    <div className=''>
                        {/* name  */}
                        <label class="text-gray-500 text-sm italic">
                            title
                        </label>
                        <div className='mb-1'>
                            <textarea
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-gray-300 pl-4 py-3 h-24 min-h-[3.5rem] max-h-40 overflow-auto rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none"
                            />
                        </div>

                        {/* Description  */}

                        <label class="text-gray-500 text-sm italic">
                            description
                        </label>
                        <div className='mb-1'>

                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="text-gray-300 py-3 pl-4 pr-4 h-48 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none"
                            />
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
                                    onClick={() => setIsUpdateFormOpen(false)}
                                    className="p-1.5 text-sm cursor-pointer">
                                    <span class="relative">Cancel</span>
                                </button>
                            </div>

                            <div className={`rounded-lg px-2 py-0.5 
                                            border border-[#3d3d3d] ${(!title || !description) ? "bg-[#363636] text-gray-500" : "bg-[#2b2b2b] text-gray-200 hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d] "}`}>
                                <button
                                    type="submit"
                                    disabled={(!title || !description)}
                                    className={`p-1.5 text-sm ${(!title || !description) ? "" : "cursor-pointer"}`}
                                >
                                    {/* Update  */}
                                    {isLoading ? <Spinner /> : "Update"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>}

        </div>
    )
}

export default UpdateVideoDetails