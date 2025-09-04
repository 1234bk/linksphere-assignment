import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { FaSearch, FaPlus, FaUserShield } from 'react-icons/fa';

import avatar from '../assets/avatar.png';
import avatar2 from '../assets/avatar2.png';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const Navbar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log("i came")
    const fetchUsers = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
 const BASE_URL = "https://linksphere-bk.onrender.com";
      try {
        const res = await axios.get(`${BASE_URL}/by/search-users/${searchQuery}`);
        console.log("Search results:", res.data);
        setSearchResults(res.data);
      } catch (err) {
        console.error('Search error:', err);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 300);

    return () => clearTimeout(delayDebounce); // ✅ Cleanup added
  }, [searchQuery]);


  const [anchorEl, setAnchorEl] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  

  //   if (loading) {
  //   return (
  //     <div className="w-full py-3 flex justify-center items-center bg-white shadow-md">
  //       <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  //       <span className="ml-2 text-blue-600 font-semibold">Loading Navbar...</span>
  //     </div>
  //   );
  // }

  return (
    <nav className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md sticky top-0 z-50">
      {/* Left - Logo */}
      <div className="text-xl font-bold hover:text-blue-800 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-out transform text-blue-500">
        <Link to="/">LinkSphere</Link>
      </div>

      {/* Center - Search */}
      <div className="flex-1 relative max-w-md mx-4 hidden sm:flex">
        <input
          type="text"
          name="search"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      {searchResults.length > 0 && (
  <ul className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
    {searchResults.map((user) => (
  <li
    key={user._id}
    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
    onClick={() => {
      setSearchQuery('');
      setSearchResults([]);
    }}
  >
    <Link to={`/profile/${user._id}`} className="block">
      <span className="font-semibold text-blue-700">{user.name}</span>
      <span className="text-sm text-gray-500 ml-2">({user.role})</span>
    </Link>
  </li>
))}

  </ul>
)}

      </div>


      {/* Right - Controls */}
      <div className="flex items-center gap-4">

        {/* Admin (text on large, icon on small) */}
        {token && user?.isAdmin && (
          <>
            <Link
              to="/admin"
              className=" text-blue-600 hover:text-blue-800 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-out transform font-medium hidden sm:block"
            >
              Admin Page
            </Link>
            <Link
              to="/admin"
              className=" text-blue-600 hover:text-blue-800 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-out transform sm:hidden text-xl"
              title="Admin"
            >
              <FaUserShield />
            </Link>
          </>
        )}

        {/* Add Post (text on large, icon on small) */}
        <Link
          to={token ? "/addpost" : "#"}
          onClick={(e) => {
            if (!token) {
              e.preventDefault();
              alert("Please login first");
            }
          }}
          className="hover:text-blue-800 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-out transform text-blue-600 font-medium hidden sm:block"
        >
          Add Post
        </Link>
        <Link
          to={token ? "/addpost" : "#"}
          onClick={(e) => {
            if (!token) {
              e.preventDefault();
              alert("Please login first");
            }
          }}
          className=" hover:text-blue-800 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-out transform hover:text-blue-800 hover:cursor-pointer hover:scale-105 text-blue-600 sm:hidden text-xl"
          title="Add Post"
        >
          <FaPlus />
        </Link>

        {/* Search Icon - Small screen */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="sm:hidden hover:text-blue-800 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-out transform text-xl text-blue-600"
          title="Search"
        >
          <FaSearch />
        </button>

        {/* Avatar */}
        <img
          {...token ? { src: avatar2 } : { src: avatar }}
          alt="User"
          onClick={handleOpenMenu}
          className="w-10 h-10 rounded-full cursor-pointer"
        />

        {/* Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          {token ? (
            [
              <MenuItem key="myprofile" onClick={() => { navigate("/myprofile"); handleCloseMenu(); }}>
                <span className='text-blue-600'> My Profile</span>
              </MenuItem>,
              <MenuItem key="logout" onClick={() => { logout(); navigate("/"); }}>
                <span className='text-blue-600'>Logout</span>
              </MenuItem>
            ]
          ) : (
            <MenuItem onClick={() => { navigate("/auth"); handleCloseMenu(); }}>
              <span className='text-blue-600'> Login / Sign Up </span>
            </MenuItem>
          )}
        </Menu>
      </div>

      {/* Hidden Search Input on Small Screens */}
      {showSearch && (
        <div className="absolute top-full left-0 w-full bg-white p-3 sm:hidden shadow-md border-t z-40">
          <input
            type="text"
            placeholder="Search users ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchResults.length > 0 && (
  <ul className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
    {searchResults.map((user) => (
      <li
        key={user._id}
        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
        onClick={() => {
          setSearchQuery('');
          setSearchResults([]);
        }}
      >
        <Link to={`/profile/${user._id}`} className="block">
          <span className="font-semibold text-blue-700">{user.name}</span>
          <span className="text-sm text-gray-500 ml-2">({user.role})</span>
        </Link>
      </li>
    ))}
  </ul>
)}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
