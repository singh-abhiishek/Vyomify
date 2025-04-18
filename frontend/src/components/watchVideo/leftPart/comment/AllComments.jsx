import React from 'react'
import CommentItem from './CommentItem.jsx';

const AllComments = ({ comments, onCommentDeleted }) => {

    console.log("all comments", comments)
    // const { totalComments } = comments

    if (comments && comments?.length > 0) {
        return (
            <div className="space-y-4 text-white">
                <ul className="space-y-6">
                    {comments?.map((comment) => (
                        <li
                            key={comment._id}
                            className=""
                        >
                            <CommentItem
                                comment={comment}
                                onCommentDeleted={onCommentDeleted}
                            />
                        </li>
                    ))}
                </ul>
            </div>

        );
    }
    return <div>No comments found.</div>;
}

export default AllComments