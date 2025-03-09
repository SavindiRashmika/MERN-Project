import React from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className='h-16 shadow-md bg-white'>
      <div className='h-full flex items-center px-4 container mx-auto justify-between'>
        <div>
          <Link to={"/"}>
            <Logo />
          </Link> 
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search product here...' className='w-full outline-none'/>
          <div className='text-lg min-w-[50px] h-8 bg-blue-700 flex items-center justify-center rounded-r-full text-white'>
            <FaSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>
          <div className='text-3xl cursor-pointer relative flex justify-center'>
            <FaUserCircle />
          </div>
          <div className='text-2xl cursor-pointer relative flex justify-center'>
            <span><FaShoppingCart /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>0</p>
            </div>
          </div>
        </div>

        <div>
          <Link to={'login'} className='px-4 py-2 rounded-xl text-white bg-rose-700 hover:bg-red-700'>LogIn</Link>                    
        </div>

      </div>
    </div>
  )
}

export default Header