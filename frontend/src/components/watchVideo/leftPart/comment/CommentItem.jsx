import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getTimeAgo } from '../../../../utils/getTimeAgo'
import EditDeleteComment from './EditDeleteComment'
import { useUpdateCommentMutation } from '../../../../store/slices/commentApiSlice'
import { showToastMessage } from '../../../../utils/showToaster'


const CommentItem = ({ comment, onCommentDeleted }) => {

    // below are the information about the comment which will be going to update
    const [commentMsg, setCommentMsg] = useState(comment?.content)
    const [commentId, setCommentId] = useState("")

    const [updateComment,] = useUpdateCommentMutation()
    const handleUpdateComment = async (e) => {
        e.preventDefault()
        console.log(commentMsg, commentId)
        try {
            const resposne = await updateComment({
                updatedContent: commentMsg,
                commentId,
            }).unwrap()

            console.log("response after update comment", resposne)
            showToastMessage("comment updated", "success")
        }catch (error) {
            setCommentMsg(comment?.content)
            console.log("error after update comment", error)
            showToastMessage("comment not updated", "error")
        }
        finally{
            setCommentId("")
        }
    }

    return (
        <div className='flex items-start space-x-4 p-4 relative' >
            {/* Avatar */}
            {/* TODO: avatar p hover krne pe uske subscriber dikhe */}
            <div className="flex-shrink-0">
                <Link
                    to={`/explore/profile/${comment?.userDetails?.username}`}
                >
                    <img
                        src={comment?.userDetails?.avatar}
                        alt="user avatar"
                        className="w-10 h-10 rounded-full object-cover border"
                    />
                </Link>
            </div>

            {/* Comment Content */}
            <div className="flex-1">

                <div className="flex items-center gap-1">

                    <Link
                        to={`/explore/profile/${comment?.userDetails?.username}`}
                        className="text-sm font-semibold ">
                        @{comment?.userDetails?.username}
                    </Link>

                    <span className="text-sm text-gray-400">
                        {getTimeAgo(comment?.updatedAt)}
                    </span>

                    {comment?.updatedAt > comment?.createdAt && <span className="text-sm text-gray-400">
                        (edited)
                    </span>}

                </div>

                {/* Comment Text */}
                <div className="w-full  space-y-3">
                    {/* Input */}
                    {commentId === comment?._id ? <div className="border border-[#3d3d3d] rounded-lg px-4 py-2 bg-[#121212] focus-within:ring-1 focus-within:ring-[#3d3d3d]">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                            value={commentMsg}
                            onChange={(e) => setCommentMsg(e.target.value)}
                        />
                    </div> :
                    <p className="mt-1 text-gray-200">{comment?.content}</p>
                    }

                    {/* Buttons */}
                    {commentId === comment?._id && <div className="flex justify-end gap-2">

                        {/* Cancel Button */}
                        <button
                            onClick={() => {
                                setCommentMsg(comment?.content)
                                setCommentId("")
                            }}
                            type="button"
                            className="text-sm px-4 py-1.5 rounded-full text-gray-300  transition-all duration-200 
                          hover:bg-[#2f2f2f] hover:text-white"
                        >
                            Cancel
                        </button>

                        {/* Save Button */}
                        <button
                            type="click"
                            onClick={handleUpdateComment}
                            disabled={!commentMsg.trim()}
                            className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-200
                            ${!commentMsg.trim()
                                    ? "bg-transparent text-gray-500 border-[#3d3d3d] cursor-not-allowed"
                                    : "bg-blue-600 text-white border-blue-700 hover:bg-blue-700 shadow-[inset_0_0_0_1px_#3d3d3d]"}`}
                        >
                            Save
                        </button>
                    </div>}
                </div>
            </div>

            {/* edit and delete button  */}
            <EditDeleteComment 
            comment={comment} 
            onCommentDeleted={onCommentDeleted} 
            setCommentId={setCommentId}
            />
        </div>
    )
}

export default CommentItem