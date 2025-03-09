import React from 'react'
import logo from "../assest/logo1.png";

const Logo = () => {
  return (
    <div className="w-32 h-32">
      <img src={logo} alt="Logo" className="w-full h-full object-contain" />
    </div>
  )
}

export default Logo