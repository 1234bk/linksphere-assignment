import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import avatar2 from "../assets/avatar2.png";
import { FaEdit } from "react-icons/fa"; // Edit icon
import axios from "axios";
import { useEffect, useState } from "react";
import PostList from "./PostList"; // Assuming you have a PostList component to show user's posts
const MyProfile = () => {
  const { user } = useAuth();

  if (!user) return <div className="text-center py-10 text-gray-600">User not found.</div>;

  const {
    name, email, phone, role, college, skills,
    age, gender, description, working,
  } = user;
  
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      const fetchPosts = async () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
  
        try {
          const res = await axios.get(`${BASE_URL}/myprofile/${user.id}`);
          console.log("Fetched posts for user:", res.data);
          setPosts(res.data);
        } catch (err) {
          console.error('Error fetching posts:', err);
        }
  
      };
  
      fetchPosts();
    }, []);



  return (
    <div className="max-w-5xl mx-auto min-h-full bg-white shadow-lg rounded-lg h-full overflow-hidden">

      <div className="relative bg-blue-100 h-48 px-6 sm:px-12 flex items-center justify-between">
       <img
          src={avatar2}
          alt="avatar"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover bg-white"
        />

        <div
  className="flex-1 ml-6 hover:scale-105 text-center transform transition duration-500 "
>
  <h1 className=" text-3xl sm:text-4xl font-bold text-blue-700">{name || "Unnamed User"}</h1>
  {role && <p className="text-md  sm:text-lg text-gray-600 mt-1 font-medium">{role}</p>}
</div>


         <Link
          to="/editprofile"
          className="absolute bottom-3 right-4 sm:right-6 text-blue-600 hover:text-blue-800"
          title="Edit Profile"
        >
          <FaEdit size={22} />
        </Link>
      </div>

       <div className="pt-8 px-6 sm:px-12 pb-10 text-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 text-sm sm:text-base">
          <ProfileItem label="Email" value={email} />
          <ProfileItem label="Phone" value={phone} />
          <ProfileItem label="College" value={college} />
          <ProfileItem label="Age" value={age} />
          <ProfileItem label="Gender" value={gender} />
          <ProfileItem label="Working" value={working ? "Yes" : "No"} />
          {skills && skills.length > 0 && (
            <ProfileItem label="Skills" value={skills.join(", ")} />
          )}
          {description && (
            <div className="sm:col-span-2">
              <span className="font-medium">Description:</span>
              <p className="mt-1 text-gray-700">{description}</p>
            </div>
          )}
        </div>
      </div>
      

      {/* User's Posts Section */}
      <div className="px-6 sm:px-12 py-8 bg-gray-50">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">My Posts</h2>
        {posts.length > 0 ? (    
          <PostList posts={posts} username={user.name} role={user.role}  />
        ) : (
          <p className="text-gray-600">No posts found.</p>
        )}
      </div>


    </div>
    
  );
};


const ProfileItem = ({ label, value }) => (
  <div>
    <span className="font-semibold text-gray-600">{label}:</span>{" "}
    <span className="ml-1">{value || "—"}</span>
  </div>
);




export default MyProfile;
