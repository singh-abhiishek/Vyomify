import React from 'react'
import CommentItem from './CommentItem.jsx';

const AllComments = ({ comments, onCommentDeleted, onCommentEdited }) => {

    console.log("all comments", comments)
    // const { totalComments } = comments


    if (comments && comments?.length == 0) {
        return (
            <div
                className='text-center'
            > No comments on this Video</div>
        )
    }


    return (
        <div className="space-y-4 text-white mt-1.5">
            <ul className="space-y-1">
                {comments?.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        onCommentDeleted={onCommentDeleted}
                        onCommentEdited ={onCommentEdited}
                    />
                ))}
            </ul>
        </div>

    );
}

export default AllComments