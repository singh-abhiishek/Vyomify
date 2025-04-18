import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react';
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { useDeleteCommentMutation } from '../../../../store/slices/commentApiSlice';
import { showToastMessage } from '../../../../utils/showToaster';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/slices/authSlice';

const EditDeleteComment = ({ comment, onCommentDeleted, setCommentId }) => {

    const {user} = useSelector(selectCurrentUser)
    // console.log(user)

    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)


    const [deleteComment, { isLoading,}] = useDeleteCommentMutation()
    const handleCommentDelete = async (e) => {
        e.preventDefault()
        try {
            await deleteComment(comment?._id).unwrap();
            showToastMessage("Comment deleted", "success");
            onCommentDeleted()
        } catch (error) {
            showToastMessage("Comment not deleted", "error");
        }
        finally{
            setIsDeleteOpen(false)
        }
    }

    return (
        <div className=''>
            <div className='relative'>
                <div  
                    onClick={() => {
                        if(user?._id === comment?.owner){ // it ensures that user can only update own comments
                            setIsOpen(prev => !prev)
                        }
                    }}
                    className='cursor-pointer'>
                    <CiMenuKebab />
                </div>

                {isOpen && <div className="absolute right-0 top-1 flex flex-col items-start py-0.5 px-5 mt-3 rounded-xl mb-2 bg-[#212121]">
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
            {isDeleteOpen && <div className="bg-[#212121] absolute top-1/2 left-1/3 z-2  p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
                
                <h2 className="text-white text-lg font-semibold mb-2">Delete Comment</h2>

                <p className="text-gray-400 text-sm mb-6">Are you sure you want to permanently delete this comment? This action cannot be undone.</p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setIsDeleteOpen(false)}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCommentDelete}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default EditDeleteComment