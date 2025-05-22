import React from 'react'
import AddComment from './AddComment.jsx'
import AllComments from './AllComments.jsx'
import { useGetAllCommentsQuery } from '../../../../store/slices/commentApiSlice.js'
import CommentItem from './CommentItem.jsx'
import CommentShimmer from '../../../shimmers/WatchVideoShimmer/CommentShimmer.jsx'

const Comment = ({ videoId }) => {

  const { data: response, error, refetch, isLoading } = useGetAllCommentsQuery(videoId, { skip: !videoId })
  const commentsDetails = response?.data
  const comments = commentsDetails?.docs
  const totalComment = comments?.length
  console.log("commentsDetails", commentsDetails)

  const onCommentAdded = () => {
    refetch()
  }

  const onCommentEdited = () => {
    refetch()
  }

  const onCommentDeleted = () => {
    refetch()
  }

  if(isLoading){
    return <CommentShimmer />
  }

  return (

    <div className='p-2'>

      {/* TODO:  add sortBy query newest, oldest*/}
      {/* comments count  */}
      <span
        className='text-gray-300'
      >{totalComment} {totalComment > 1 ? "Comments" : "Comment"}</span>


      {/* input box for comment  */}
      <AddComment videoId={videoId} onCommentAdded={onCommentAdded} />


      {/* show all comment  */}
      <AllComments comments={comments} onCommentDeleted={onCommentDeleted} onCommentEdited ={onCommentEdited}/>
    </div>
  )
}

export default Comment