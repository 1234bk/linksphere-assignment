import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const { user ,token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    image: null, // file
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("addpsot mein handleSubmit called");
    console.log("token:", token); // Check if token is available
    console.log("user:", user); // Check if user is defined
    console.log("Form Data:", formData); // Check form data before submission
    console.log("User ID:", user.id);  // Check this shows up correctly before submit
    console.log("User role:", user.role); // Check this shows up correctly before submit

    if (!user || !user.id) {
      alert('Please log in to create a post.');
      return;
    }

    const data = new FormData();
    data.append('heading', formData.heading);
    data.append('description', formData.description);
    data.append('username', user.name);
    
    data.append('userId', user.id);
    data.append('role', user.role);
    if (formData.image) data.append('image', formData.image);


      //  const BASE_URL = import.meta.env.VITE_BASE_URL;
   const BASE_URL = "https://linksphere-bk.onrender.com";
    try {
      await axios.post(`${BASE_URL}/data/addpost`, data, {
       headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`, // ✅ Add this if route is protected
  },  
      });

      // ✅ Custom toast-like success message for 2.5 sec
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 2500);
    } catch (err) {
      alert('Post creation failed');
      console.error(err);
    }
  };

  // ⛔ Block page if user is not logged in
  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Please <span className="text-blue-600 font-semibold">log in</span> to create a post.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow mt-10 rounded-md relative">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Create New Post</h2>

      {showSuccess && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-700 px-4 py-2 rounded shadow transition duration-300 animate-bounce">
          🎉 Post created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="heading"
          placeholder="Heading / Topic"
          value={formData.heading}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          placeholder="What's on your mind?"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
        />
        <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:border-blue-600 transition relative">
  <span className="text-sm text-blue-700 font-medium">
    Upload Image
  </span>
  <span className="text-xs text-gray-500">
    Images only (Max 5MB)
  </span>

  <input
    type="file"
    accept="image/*"
    name="image"
    onChange={(e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
    }}
    className="hidden"
  />

  {/* ✅ Show image name or thumbnail preview */}
  {formData.image && (
    <div className="mt-2 text-xs text-green-600 text-center">
      ✅ {formData.image.name}
    </div>
  )}
</label>


        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
