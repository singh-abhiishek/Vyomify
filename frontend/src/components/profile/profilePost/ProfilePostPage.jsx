import React from 'react'
import { useGetAllTweetsQuery } from '../../../store/slices/tweetApiSlice'
import ProfilePostItem from './ProfilePostItem'

const ProfilePostPage = ({userId}) => {

  const {data: response} = useGetAllTweetsQuery(userId)
  const tweets = response?.data
  console.log("response from profilePost Page", tweets)
  return (
    <div className='p-5 flex flex-col items-start w-full'>
      {
        tweets?.map((tweet) => (
          <ProfilePostItem 
          key={tweet?._id}
          {...tweet}
          />
        ))
      }
    </div>
  )
}

export default ProfilePostPage