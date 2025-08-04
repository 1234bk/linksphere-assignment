import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatar2 from "../assets/avatar2.png";
import PostList from "./PostList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    console.log("userprofile");
    console.log("User ID from route param:", userId);
    console.log("User Data:", userData);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchUserAndPosts = async () => {


            try {
                setLoading(true);
                const [userRes, postsRes] = await Promise.all([
                    axios.get(`${BASE_URL}/by/user/${userId}`),
                    axios.get(`${BASE_URL}/by/profile/${userId}`)
                ]);
                console.log("Fetched user data:", userRes.data);
                console.log("Fetched posts data:", postsRes.data);
                setUserData(userRes.data);
                setPosts(postsRes.data);

                // console.log("Fetched user data:", userRes.data);
                setLoading(false);
            } catch (err) {
                console.error("Error loading user profile:", err);
            }
        };

        fetchUserAndPosts();
    }, [userId]);

    // if (!userData && !loading) return <div className="text-center py-10 text-gray-600">User not found.</div>;

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
                <div className="relative w-20 h-20 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
        );
    }



    const {
        name, email, phone, role, college, skills,
        age, gender, description, working,
    } = userData;

    return (
        <div className="max-w-5xl mx-auto min-h-full bg-white shadow-lg rounded-lg h-full overflow-hidden">
            <button
                onClick={() => navigate(-1)}
                className="ml-6 mb-5 mt-6 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
            >
                ← Back
            </button>

            {/* Profile Header */}
            <div className="relative bg-blue-100 h-48 px-6 sm:px-12 flex items-center justify-between">
                <img
                    src={avatar2}
                    alt="avatar"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover bg-white"
                />
                <div className="flex-1 ml-6 hover:scale-105 text-center transform transition duration-500">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">{name || "Unnamed User"}</h1>
                    {role && <p className="text-md sm:text-lg text-gray-600 mt-1 font-medium">{role}</p>}
                </div>

            </div>

            {/* Profile Details */}
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

            {/* User's Posts */}
            <div className="px-6 sm:px-12 py-8 bg-gray-50">
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">{name}'s Posts</h2>
                {posts.length > 0 ? (
                    <PostList posts={posts} username={name} role={role} />
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

export default UserProfile;
