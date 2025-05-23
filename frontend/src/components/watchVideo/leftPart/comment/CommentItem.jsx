import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTimeAgo } from '../../../../utils/getTimeAgo'
import EditDeleteComment from './EditDeleteComment'
import { useUpdateCommentMutation } from '../../../../store/slices/commentApiSlice'
import { showToastMessage } from '../../../../utils/showToaster'
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useIsAlreadyLikedQuery, useToggleCommentLikeStatusMutation, useTotalLikesOnCommentQuery } from '../../../../store/slices/likeApiSlice'
import { MdOutlineThumbUp, MdThumbUp } from 'react-icons/md'


const CommentItem = ({ comment, onCommentDeleted, onCommentEdited }) => {

    // is video already liked
    const { data: response, refetch } = useIsAlreadyLikedQuery({
        targetId: comment?._id,
        type: "comments"
    })
    const isCommentAlreadyLiked = response?.data
    // console.log("is comment already liked from CommentItem", isCommentAlreadyLiked)

    // handle toggle comment like on comment using id
    const [toggleCommentLike] = useToggleCommentLikeStatusMutation()
    const handleCommentLikeToggle = async (commentId) => {
        const response = await toggleCommentLike(commentId).unwrap()
        refetch()
        // console.log(response)
    }

    // get total likes on the comment
    const { data } = useTotalLikesOnCommentQuery(comment?._id)
    const totalLikesOnComment = data?.data
    // console.log(totalLikesOnComment)

    // below are the information about the comment which will be going to update
    const [commentMsg, setCommentMsg] = useState(comment?.content)
    const [commentId, setCommentId] = useState("")

    // when user click on edit, input box will be auto focus
    const inputRef = useRef(null);
    useEffect(() => {
        if (commentId === comment?._id && inputRef.current) {
            inputRef.current.focus();
        }
    }, [commentId, comment?._id]);

    const [updateComment,] = useUpdateCommentMutation()
    const handleUpdateComment = async (e) => {
        e.preventDefault()
        // console.log(commentMsg, commentId)
        try {
            const resposne = await updateComment({
                updatedContent: commentMsg,
                commentId,
            }).unwrap()

            onCommentEdited();
            // console.log("response after update comment", resposne)
            showToastMessage("comment updated", "success")
        } catch (error) {
            setCommentMsg(comment?.content)
            // console.log("error after update comment", error)
            showToastMessage("comment not updated", "error")
        }
        finally {
            setCommentId("")
        }
    }

    return (
        <div className='flex space-x-1.5 p-1 ' >
            {/* Avatar */}
            {/* TODO: avatar p hover krne pe uske subscriber dikhe */}
            <div className="flex-shrink-0 w-7 h-7">
                <Link
                    to={`/explore/profile/${comment?.userDetails?.username}`}
                >
                    <img
                        src={comment?.userDetails?.avatar}
                        alt="user avatar"
                        className="w-full h-full rounded-full object-cover border"
                    />
                </Link>
            </div>

            <div className='relative flex justify-evenly w-full'>
                {/* Comment Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-1">
                        <Link
                            to={`/explore/profile/${comment?.userDetails?.username}`}
                            className="text-blue-400 text-sm font-sm"
                        >
                            @{comment?.userDetails?.username}
                        </Link>

                        <span className="text-[12px] text-gray-400">
                            {getTimeAgo(comment?.updatedAt)}
                        </span>

                        {comment?.updatedAt > comment?.createdAt && <span className="text-[12px] text-gray-400">
                            (edited)
                        </span>}

                    </div>

                    {/* Comment Text */}
                    <div className="w-full mt-1">
                        {commentId === comment?._id ? <div className="border-b border-[#3d3d3d] rounded-lg px-3 py-2 bg-[#121212] focus-within:border-white">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Add a comment..."
                                className="w-full bg-transparent focus text-white placeholder-gray-500 focus:outline-none"
                                value={commentMsg}
                                onChange={(e) => setCommentMsg(e.target.value)}

                            />
                        </div> :
                            <p className="text-sm text-gray-200">{comment?.content}</p>
                        }

                        {/* Buttons */}
                        {commentId === comment?._id && <div className="flex justify-end gap-2 mt-2">
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

                    {/* like dislike button  */}
                    <div className="flex gap-2">
                        <button
                            type='button'
                            onClick={() => handleCommentLikeToggle(comment?._id)}
                            className="cursor-pointer flex items-center gap-1 px-1.5 py-1 rounded-lg text-gray-300 text-sm font-medium">
                            {isCommentAlreadyLiked ?
                                <MdThumbUp size={14} className="text-green-400 " />
                                :
                                <MdOutlineThumbUp size={14} className="text-gray-400 " />
                            }
                            <span>
                                {totalLikesOnComment}
                            </span>
                        </button>
                    </div>
                </div>

                {/* edit and delete button  */}
                <EditDeleteComment
                    comment={comment}
                    onCommentDeleted={onCommentDeleted}
                    setCommentId={setCommentId}
                />
            </div>
        </div>
    )
}

export default CommentItem