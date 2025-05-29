import { MoreVertical, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { MdOutlineEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useDeleteTweetMutation } from '../../../store/slices/tweetApiSlice'
import { showToastMessage } from '../../../utils/showToaster'
import useOutsideClick from '../../../hooks/UseOutsideClick'
import { useRef } from 'react'
import PostEdit from './PostEdit'

const EditDeletePost = ({
    ownerId,
    content,
    tweetFile,
    isPublished,
    tweetId
}) => {

    const user = useSelector(state => state?.auth?.userData?.user)

    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isPostEditFormOpen, setIsPostEditFormOpen] = useState()

    const modalRef1 = useRef()
    const modalRef2 = useRef()
    const modalRef3 = useRef()
    useOutsideClick(modalRef1, () => setIsOpen(false), isOpen);
    useOutsideClick(modalRef2, () => setIsDeleteOpen(false), isDeleteOpen);
    useOutsideClick(modalRef3, () => setIsPostEditFormOpen(false), isPostEditFormOpen);

    // handle delete tweet
    const [deleteTweet, { isLoading }] = useDeleteTweetMutation()
    const handleTweetDelete = async () => {
        try {
            const data = await deleteTweet(tweetId).unwrap(); //unwrap ensures errors are catchable
            // console.log(data)
            showToastMessage("post deleted successfully")
        } catch (error) {
            showToastMessage("error post not deleted", "error")
            console.log(error)
        }
        finally {
            setIsDeleteOpen(false)
        }
    }

    return (
        <>
            <div
                onClick={() => {
                    if (user?._id === ownerId) { // it ensures that only post admin can update own post
                        setIsOpen(prev => !prev)
                    }
                }}
                className={`${user?._id === ownerId ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
                <CiMenuKebab />
            </div>


            {isOpen && <div
                ref={modalRef1}
                className="absolute right-5 flex flex-col items-start py-1 px-1 mt-3 rounded-xl mb-2 bg-[#212121] z-12">
                {/* Edit */}
                <div
                    onClick={() => {
                        // setCommentId(comment?._id)
                        setIsPostEditFormOpen(true)
                        setIsOpen(false)
                    }}
                    className="font-medium flex cursor-pointer items-center px-2 w-full py-2 rounded-lg"
                >
                    <MdOutlineEdit size={18} />
                    <span className="text-sm ml-2">Edit</span>
                </div>

                {/* Delete */}
                <div
                    onClick={() => {
                        setIsDeleteOpen(true)
                        setIsOpen(false)
                    }}
                    className="font-medium cursor-pointer flex items-center px-2 w-full py-2 rounded-lg"
                >
                    <Trash2 size={18} />
                    <span className="text-sm ml-2">Delete</span>
                </div>
            </div>
            }

            {/* delete popup */}
            {isDeleteOpen && <div
                ref={modalRef2}
                className="bg-[#212121] absolute top-0 left-1/4 z-2  p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">

                <h2 className="text-white text-lg font-semibold mb-2">Delete Post</h2>

                <p className="text-gray-400 text-sm mb-6">Are you sure you want to permanently delete this Post? This action cannot be undone.</p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setIsDeleteOpen(false)}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleTweetDelete}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>}

            {/* edit popup  */}
            {isPostEditFormOpen &&
                <PostEdit
                    modalRef3={modalRef3}
                    tweetId={tweetId}
                    content={content}
                    tweetFile={tweetFile}
                    isPublished={isPublished}
                    setIsPostEditFormOpen={setIsPostEditFormOpen}
                />
            }
        </>
    )
}

export default EditDeletePost