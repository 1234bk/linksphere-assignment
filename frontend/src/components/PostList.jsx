import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
// import { useParams } from 'react-router-dom';

const PostList = ({ posts,username ,role  }) => {
  const { token } = useAuth();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [postStates, setPostStates] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({}); // 👈 New state for view more/less
 
  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  

  return (
    <div className="space-y-16  px-2 m-5 p-5 ">
      {posts.map((post) => {
        const isExpanded = expandedPosts[post._id];
        const shouldTruncate = post.description.length > 150;
        const displayText = isExpanded
          ? post.description
          : post.description.slice(0, 150);

        return (
          <div
            key={post._id}
            className="border border-blue-200 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <Link
                to={`/profile/${post.userId._id}`}
                className= "  text-xl font-semibold hover:scale-105 transform transition duration-500  sm:text-base"
              >
                <span className='text-blue-700  md:text-3xl text-2xl'>{ username ? username : post.userId.name}</span>
                {post.userId.role && post.userId.role !== 'undefined' && (
                  <p className="text-xs text-gray-500">{ role ? role : post.userId.role}</p>
                )}
              </Link>
              <p className="text-xs text-gray-400 italic">
                {new Date(post.date).toLocaleDateString('en-GB').replaceAll('/', '-')}
              </p>
            </div>

            {/* Heading */}
            {post.heading && (
              <h2 className="text-md mt-4 font-bold text-gray-800 mb-1 break-words">
                {post.heading}
              </h2>
            )}

            {/* Description */}
            <p className="text-sm text-gray-700 break-words mb-1">
              {displayText}
              {shouldTruncate && (
                <>
                  {!isExpanded && '... '}
                  <button
                    onClick={() => toggleExpand(post._id)}
                    className="text-blue-500 text-xs font-medium hover:underline ml-1"
                  >
                    {isExpanded ? 'View less' : 'View more'}
                  </button>
                </>
              )}
            </p>

            {/* Image */}
           {post.image && (
  <div className="w-full mt-5 mb-5 rounded-md overflow-hidden border border-gray-200">
    <img
      src={`${post.image}`}
      alt="Post image"
      className="w-full object-cover max-h-[280px] sm:max-h-[320px]"
    />
  </div>
)}


            {/* Like Button */}
            {/* <div className="flex items-center gap-2 text-sm text-gray-600">
              <button
                onClick={() => handleLike(post._id)}
                className={`flex flex-col items-center transition duration-200 ${
                  post.liked ? 'text-blue-700 scale-105 font-semibold' : 'text-gray-400'
                }`}
                title={post.liked ? 'Liked' : 'Like'}
              >
                {post.liked ? <FaThumbsUp size={21} /> : <FaRegThumbsUp size={21} />}
                <span className="text-xs mt-1">{post.likeCount}</span>
              </button>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
