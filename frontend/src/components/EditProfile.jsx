import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from 'axios';
import api from '../api/axios';
import { useEffect } from "react";
const EditProfile = () => {
  const { user, token, login, setUser } = useAuth();
  const navigate = useNavigate();

  const [userdata, setuserdata] = useState(null); // start as null
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    college: "",
    skills: "",
    age: "",
    gender: "",
    description: "",
    working: false,
  });

  // Fetch latest user data
  useEffect(() => {
    if (!user || !user.id) return; // wait until user is available

    const fetchUser = async () => {
      const BASE_URL = "https://linksphere-bk.onrender.com";
      // const BASE_URL = import.meta.env.VITE_BASE_URL;
      try {
        const res = await axios.get(`${BASE_URL}/by/user/${user.id}`);
        setuserdata(res.data);

        // Update formData with fetched user
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          role: res.data.role || "",
          college: res.data.college || "",
          skills: res.data.skills?.join(", ") || "",
          age: res.data.age || "",
          gender: res.data.gender || "",
          description: res.data.description || "",
          working: res.data.working || false,
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };

    const BASE_URL = "https://linksphere-bk.onrender.com";
    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const { data } = await axios.put(
        `${BASE_URL}/auth/updateprofile`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update AuthContext with new user
      setUser(data.updatedUser);
      localStorage.setItem("user", JSON.stringify(data.updatedUser));

      alert("Profile updated!");
      navigate("/myprofile");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!userdata) return <div>Loading...</div>; // wait until user is fetched

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-lg animate-fade-in border border-blue-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Text Fields */}
        {["name", "phone", "role", "college", "age", "description"].map((field) => (
          <div key={field}>
            <label className="block mb-1 text-sm font-medium text-blue-600 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        ))}

        {/* Gender Dropdown */}
        <div>
          <label className="block mb-1 text-sm font-medium text-blue-600">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-1 text-sm font-medium text-blue-600">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Currently Working Switch */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-blue-600">Currently Working</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="working"
              checked={formData.working}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-full transition-transform"></div>
          </label>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
