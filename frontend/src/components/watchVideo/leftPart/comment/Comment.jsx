import React from 'react'
import AddComment from './AddComment.jsx'
import AllComments from './AllComments.jsx'
import { useGetAllCommentsQuery } from '../../../../store/slices/commentApiSlice.js'

const Comment = ({videoId}) => {

  const { data: response, error, refetch } = useGetAllCommentsQuery(videoId, { skip: !videoId })
  const commentsDetails = response?.data
  const comments = commentsDetails?.docs
  // console.log(commentsDetails)

  const onCommentAdded = () => {
    refetch()
  }
  const onCommentDeleted = () => {
    refetch()
  }

  return (  

    <div>

        {/* TODO:  add sortBy query newest, oldest*/}
        {/* show total comments count  */}
        <div>
          <span>{comments?.length} Comments</span>
        </div>

        {/* input box for comment  */}
        <div>
            <AddComment videoId = {videoId} onCommentAdded={onCommentAdded}/>
        </div>

        {/* show all comment  */}
        <div>
          <AllComments  comments={comments} onCommentDeleted={onCommentDeleted}/>
        </div>
        
    </div>
  )
}

export default Comment