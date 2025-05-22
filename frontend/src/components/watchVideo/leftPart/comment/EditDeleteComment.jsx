import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react';
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { useDeleteCommentMutation } from '../../../../store/slices/commentApiSlice';
import { showToastMessage } from '../../../../utils/showToaster';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/slices/authSlice';
import useOutsideClick from '../../../../hooks/UseOutsideClick';

const EditDeleteComment = ({ comment, onCommentDeleted, setCommentId }) => {

    const { user } = useSelector(selectCurrentUser)
    // console.log(user)

    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    // This hook listens for outside click, and close the pop up modal
    const modalRef1 = useRef()
    const modalRef2 = useRef()
    useOutsideClick(modalRef2, () => setIsDeleteOpen(false), isDeleteOpen);
    useOutsideClick(modalRef1, () => setIsOpen(false), isOpen);


    const [deleteComment, { isLoading, }] = useDeleteCommentMutation()
    const handleCommentDelete = async (e) => {
        e.preventDefault()
        try {
            await deleteComment(comment?._id).unwrap();
            showToastMessage("Comment deleted", "success");
            onCommentDeleted()
        } catch (error) {
            showToastMessage("Comment not deleted", "error");
        }
        finally {
            setIsDeleteOpen(false)
        }
    }

    const isOwner = user?._id === comment?.owner;
    return (
        <div className=''>
            <div className=''>
                <div
                    onClick={() => {
                        if (isOwner) { // it ensures that user can only update own comments
                            setIsOpen(prev => !prev)
                        }
                    }}
                    className={isOwner ?  'cursor-pointer' : "cursor-not-allowed"}>
                    <CiMenuKebab />
                </div>

                {isOpen && <div
                    ref={modalRef1}
                    className="absolute right-4 top-0  flex flex-col items-start py-1 px-3 mt-2 rounded-xl mb-2 bg-[#212121] z-40">
                    {/* Edit */}
                    <div
                        onClick={() => {
                            setCommentId(comment?._id)
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
                </div>}
            </div>


            {/* delete popup  */}
            {isDeleteOpen && <div
                ref={modalRef2}
                className="bg-[#212121] absolute left-0 sm:top-1/2 sm:left-1/3 z-40  p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">

                <h2 className="text-white text-md sm:text-lg font-semibold mb-2">Delete Comment</h2>

                <p className="text-gray-400 text-[13px] sm:text-sm mb-4 sm:mb-6">Are you sure you want to permanently delete this comment? This action cannot be undone.</p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setIsDeleteOpen(false)}
                        className="px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCommentDelete}
                        className="px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default EditDeleteComment