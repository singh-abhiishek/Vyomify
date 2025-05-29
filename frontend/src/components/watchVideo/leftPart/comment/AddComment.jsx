import React, { useState } from 'react'
import { useAddCommentMutation } from '../../../../store/slices/commentApiSlice'
import { showToastMessage } from '../../../../utils/showToaster'
import { Link } from 'react-router-dom'

const AddComment = ({ videoId, onCommentAdded }) => {

    const [comment, setComment] = useState("")
    const [addComment,] = useAddCommentMutation()


    const handleComment = async (e) => {
        e.preventDefault();
        try {
            // console.log("Sending to backend",  videoId, comment );

            const response = await addComment({
                comment,
                videoId
            }).unwrap()

            // console.log("response from addcomment", response)
            if (response.success) {
                onCommentAdded();
                showToastMessage("comment added", "success")
                setComment("")
            }
        } catch (error) {
            showToastMessage("Comment not added", "error")
            console.log(error)
        }
    }

    return (

        <form onSubmit={handleComment}>
            <div className="w-full space-y-1 mt-1">
                {/* Input */}

                <div className="border-b border-[#3d3d3d] rounded-lg px-3 py-2 bg-[#121212] focus-within:border-white">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-1">
                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={() => setComment("")}
                        className="text-sm px-3 py-1 rounded-full text-gray-300  transition-all duration-200 
                      hover:bg-[#2f2f2f] hover:text-white"
                    >
                        Cancel
                    </button>

                    {/* Comment Button */}
                    <button
                        type="submit"
                        disabled={!comment.trim()}
                        className={`text-sm px-3 py-1 rounded-full border transition-all duration-200
                        ${!comment.trim()
                                ? "bg-transparent text-gray-500 border-[#3d3d3d] cursor-not-allowed"
                                : "bg-blue-600 text-white border-blue-700 hover:bg-blue-700 shadow-[inset_0_0_0_1px_#3d3d3d]"}`}
                    >
                        Comment
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddComment