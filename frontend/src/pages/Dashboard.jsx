// pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import PostList from '../components/PostList';

const Dashboard = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      // const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "https://linksphere-bk.onrender.com";
      try {
        const res = await axios.get(`${BASE_URL}/data/allposts`);
        setPosts(res.data);
        console.log("Fetched posts:", res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }

    };

    fetchPosts();
  }, []);

  

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-[6px] border-gray-300 rounded-full"></div>
          <div className="absolute inset-0 border-[6px] border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-xl font-bold text-blue-600 animate-pulse tracking-wide">
          Loading LinkSphere...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      {/* Post Rendering via Component */}
      <PostList posts={posts} />

      {/* Creative Ending Block */}
      <div className="text-center text-gray-500 italic mt-10">
        You’ve reached the end... but your ideas don’t have to. 🌱<br />
        <span className="text-blue-600 font-semibold">
          <Link
            to={token ? "/addpost" : "#"}
            onClick={(e) => {
              if (!token) {
                alert("Please login first");
              }
            }}
            className="hover:text-blue-600 font-medium"
          >
            Add Post
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
