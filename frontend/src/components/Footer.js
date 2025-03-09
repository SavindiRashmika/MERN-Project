import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-6 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base font-medium">
          © {new Date().getFullYear()} <span className="text-black font-semibold">SAVI</span> | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
