import React, { useState } from 'react';
import Logo from './Logo';
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from '../store/userSlice';

const Header = () => {
  const user = useSelector(state => state?.user?.user) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <div className='h-16 shadow-md bg-white'>
      <div className='h-full flex items-center px-4 container mx-auto justify-between'>
        {/* Logo Section */}
        <div>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        {/* Search Bar */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='Search product here...' className='w-full outline-none' />
          <div className='text-lg min-w-[50px] h-8 bg-blue-700 flex items-center justify-center rounded-r-full text-white'>
            <FaSearch />
          </div>
        </div>

        {/* 📌 Icons Group Together */}
        <div className='flex items-center gap-7'>
          {/* Profile Icon */}
          <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setShowMenu(!showMenu)}>
            {user._id ? (
              <img src={user.profilePic} className='w-10 h-10 rounded-full' alt={user.name || "User"} />
            ) : (
              <FaUserCircle />
            )}

            {/* Mini UI Menu */}
            {showMenu && user._id && (
              <div className="absolute top-12 right-0 bg-white shadow-md rounded-lg p-3 w-48">
                <p className="text-sm font-semibold">👤 {user.name || "Guest"}</p>
                <hr className="my-2" />
                <Link to="/admin-panel" className="block text-sm py-2 font-bold hover:bg-gray-200 px-2 rounded-md">Admin Panel</Link>
                <button onClick={handleLogout} className="w-full text-sm font-bold py-2 text-left text-red-600 hover:bg-gray-200 px-2 rounded-md">Logout</button>
              </div>
            )}
          </div>

          {/* Shopping Cart Icon */}
          <div className='text-2xl cursor-pointer relative flex justify-center'>
            <FaShoppingCart />
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>

          {/* Login Button */}
          {!user._id && (
            <Link to={'/login'}  className="px-8 py-2 ml-2 rounded-full text-white bg-[#5755FE] hover:bg-[#8B93FF] transition-all duration-300 shadow-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;