import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useAuth } from '../context/AuthContext'; // or wherever your context is
import axios from 'axios';    
import api from '../api/axios';

const AuthForm = () => {
  const { login, token } = useAuth(); 
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const toggleLogin = () => {
    setIsLogin(prev => !prev);
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

const endpoint = isLogin ? `${BASE_URL}/auth/login` : `${BASE_URL}/auth/register`;

    const body = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          // dummy fields added since your backend expects them in register
          phone: "",
          role: "",
          college: "",
          skills: "",
          age: "",
          gender: "",
          working: false,
          description: "",
        };

    try {
    const res = await api.post(endpoint, body);

    const data = res.data;
    setMessage(isLogin ? `Welcome, ${data.user.name}` : 'Registered successfully!');

    login(data.token, data.user); // ✅ Use your context login function
    navigate("/");
  } catch (err) {
    console.error(err);
    const errorMsg =
      err.response?.data?.message || 'Server error';
    setMessage(errorMsg);
  }
  };



  return (
    <div className="p-4 max-w-md mx-auto">
      <button
        onClick={toggleLogin}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded"
      >
        Switch to {isLogin ? 'Sign Up' : 'Login'}
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        )}
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {!isLogin && (
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
        )}

        {isLogin && (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </div>
  );
};

export default AuthForm;
