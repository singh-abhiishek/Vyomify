import React from 'react'
import { useGetAllTweetsQuery } from '../../../store/slices/tweetApiSlice'
import ProfilePostItem from './ProfilePostItem'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfilePostPage = ({ userId }) => {

  const { data: response } = useGetAllTweetsQuery(userId)
  const tweets = response?.data
  // console.log("response from profilePost Page", tweets)

  // user = current logged-in user
  const user = useSelector((state) => state?.auth?.userData?.user?.username)
  // console.log("user", user)

  // profileUserName = user whose profile is being viewed
  const { username: profileUserName } = useParams();
  // console.log(profileUserName)

  const isOwner = user === profileUserName;
  // console.log("isOwner", isOwner)

  const visiblePosts = isOwner
    ? tweets // owner sees all
    : tweets?.filter(post => post?.isPublished); // others see only public


  if (visiblePosts?.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 text-md sm:text-lg font-medium mt-30">
        This profile has no Posts yet.
      </div>
    )
  }

  return (
    <div className='p-5 flex flex-col items-start w-full'>
      {
        visiblePosts?.map((visiblePost) => (
          <ProfilePostItem
            key={visiblePost?._id}
            {...visiblePost}
          />
        ))
      }
    </div>
  )
}

export default ProfilePostPage