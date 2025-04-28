import React from 'react';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import { MoreVertical, ThumbsUp, ThumbsDown, MessageCircle, Share2, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EditDeletePost from './EditDeletePost';

const ProfilePostItem = ({
  content,
  isPublished,
  tweetFile,
  createdAt,
  ownerDetails,
}) => {

  const navigate = useNavigate()
  return (

    <div className="w-full max-w-2xl mx-auto bg-black border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl px-4 py-3 mb-4">

      <div className="flex items-start gap-3 relative">
        {/* Avatar */}
        <div
          onClick={() => navigate(`/explore/profile/${ownerDetails?.username}`)}
          className="flex-shrink-0 cursor-pointer">
          <img
            src={ownerDetails?.avatar}
            alt="User Avatar"
            className="w-11 h-11 rounded-full object-cover"
          />
        </div>

        {/* Post Content */}
        <div className="flex-1 flex flex-col">
          {/* Username and time */}
          <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
            <span className="font-semibold">{ownerDetails?.username}</span>
            <span className="text-xs text-gray-500">{getTimeAgo(createdAt)}</span>
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
                  className="w-full max-h-80 object-cover"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-6 mt-4 text-gray-600 dark:text-gray-400 text-sm">
            <button className="flex items-center gap-1 hover:text-blue-500 transition cursor-pointer">
              <ThumbsUp size={18} />
              <span>Like</span>
            </button>
            <button className="flex items-center gap-1 hover:text-red-500 transition">
              <ThumbsDown size={18} />
              <span>Dislike</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-500 transition">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="flex items-center gap-1 hover:text-purple-500 transition">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* 3-dot icon */}
        <EditDeletePost
          ownerId={ownerDetails?._id}
          content={content}
          tweetFile={tweetFile}
          isPublished={isPublished}
        />

      </div>
    </div>
  );
};

export default ProfilePostItem;
