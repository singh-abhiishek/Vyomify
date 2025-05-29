import React from 'react';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import { MoreVertical, ThumbsUp, ThumbsDown, MessageCircle, Share2, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EditDeletePost from './EditDeletePost';
import { MdOutlineThumbUp, MdThumbUp } from 'react-icons/md';
import { useIsAlreadyLikedQuery, useToggleTweetLikeStatusMutation, useTotalLikesOnTweetQuery } from '../../../store/slices/likeApiSlice';
import { HiLockClosed } from 'react-icons/hi';

const ProfilePostItem = ({
  _id,
  content,
  isPublished,
  tweetFile,
  createdAt,
  updatedAt,
  ownerDetails,
}) => {

  const tweetId = _id
  // console.log("tweetId from profilePostItem", tweetId)
  // console.log(getTimeAgo(createdAt), getTimeAgo(updatedAt))

  // is tweet already liked
  const { data: response, refetch } = useIsAlreadyLikedQuery({
    targetId: tweetId,
    type: "tweet"
  })
  const isTweetAlreadyLiked = response?.data
  // console.log("is tweet already liked from profilePostItem", isTweetAlreadyLiked)

  // total count of likes on tweet
  const { data, refetch: refetchTweetLikesCount } = useTotalLikesOnTweetQuery(tweetId)
  const totalLikesOnTweet = data?.data
  // console.log("total likes on tweet from profilePostItem", totalLikesOnTweet)

  // toggle video like status on hitting like button
  const [toggleTweetLikeStatus] = useToggleTweetLikeStatusMutation()

  const handleTweetLikeToggle = async (e) => {
    e.preventDefault();
    try {
      const response = await toggleTweetLikeStatus(tweetId).unwrap()
      refetch()
      refetchTweetLikesCount()
      // console.log("resposne from toggleTweetlike", reponse)
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()
  return (

    <div className="w-full px-3 sm:px-4">
      <div className="max-w-4xl mx-auto bg-black border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl px-4 py-3 mb-4">
        <div className="flex flex-col sm:flex-row items-start gap-3 relative w-full">

          {/* Top Row for Mobile: Avatar + Username + 3-Dot */}
          <div className="flex items-center justify-between w-full sm:hidden">
            <div className="flex items-center gap-2">
              <img
                src={ownerDetails?.avatar}
                alt="User Avatar"
                onClick={() => navigate(`/explore/profile/${ownerDetails?.username}`)}
                className="w-9 h-9 rounded-full object-cover cursor-pointer"
              />
              <div className="text-sm text-gray-200">
                <span className="font-semibold">{ownerDetails?.username}</span>
                <span className="block text-xs text-gray-500">{getTimeAgo(createdAt)}</span>
                <span className="text-xs text-gray-500 flex">
                  {!isPublished && <HiLockClosed size={13} />}
                  {getTimeAgo(createdAt) === getTimeAgo(updatedAt) ? "" : "(edited)"}
                </span>
              </div>
            </div>

            <EditDeletePost
              ownerId={ownerDetails?._id}
              content={content}
              tweetFile={tweetFile}
              isPublished={isPublished}
              tweetId={tweetId}
            />
          </div>

          {/* Avatar (desktop) */}
          <div
            onClick={() => navigate(`/explore/profile/${ownerDetails?.username}`)}
            className="hidden sm:block flex-shrink-0 cursor-pointer"
          >
            <img
              src={ownerDetails?.avatar}
              alt="User Avatar"
              className="w-11 h-11 rounded-full object-cover"
            />
          </div>

          {/* Post Content */}
          <div className="flex-1 flex flex-col w-full">
            {/* Username and time (desktop) */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
              <span className="font-semibold">{ownerDetails?.username}</span>
              <span className="text-xs text-gray-500">{getTimeAgo(createdAt)}</span>
              <span className="text-xs text-gray-500 flex gap-0.5">
                {!isPublished && <HiLockClosed size={13} />}
                {getTimeAgo(createdAt) === getTimeAgo(updatedAt) ? "" : "(edited)"}
              </span>
            </div>

            {/* Text content */}
            <div className="mt-1 text-gray-700 dark:text-gray-300 text-sm">
              {content}
            </div>

            {/* Optional Media */}
            {tweetFile && (
              <div className="mt-3">
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={tweetFile}
                    alt="Tweet Media"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-gray-500 text-xs sm:text-sm">

              <button
                onClick={(e) => handleTweetLikeToggle(e)}
                className="flex items-center gap-1 cursor-pointer">
                {isTweetAlreadyLiked ?
                  <MdThumbUp size={16} className="text-green-400 " />
                  :
                  <MdOutlineThumbUp size={16} className="text-gray-400" />
                }
                <span>{totalLikesOnTweet}</span>
              </button>

              <button className="flex items-center gap-1">
                <ThumbsDown size={16} />
                <span>Dislike</span>
              </button>
              <button className="flex items-center gap-1">
                <MessageCircle size={16} />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-1 ">
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* 3-dot icon (desktop) */}
          <div className="hidden sm:block">
            <EditDeletePost
              ownerId={ownerDetails?._id}
              content={content}
              tweetFile={tweetFile}
              isPublished={isPublished}
              tweetId={tweetId}
            />
          </div>

        </div>
      </div>
    </div>



  );
};

export default ProfilePostItem;
