import React, { useContext, useState } from "react";
import loginIcon from "../assest/user.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const context = useContext(Context);
  const fetchUserDetails = context?.fetchUserDetails;


  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
  
    // Check if the fields are properly filled out before sending the request
    if (!data.email || !data.password) {
      toast.error("Please provide all required fields.");
      return;
    }
  
    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signUp.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const dataApi = await dataResponse.json();
      console.log(dataApi); 
  
      if (dataApi.success) {
        navigate("/");
        fetchUserDetails();

      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
  
    } catch (error) {
      toast.error("An error occurred: " + error.message);
      console.error("Error: ", error);
    }
  };
  

  return (
    <section id="login" className="mt-10 flex items-center justify-center">
      <div className="p-6 w-full max-w-md mx-auto bg-white shadow-xl rounded-lg">
        {/* Login Icon */}
        <div className="w-20 h-20 mx-auto">
          <img
            src={loginIcon}
            alt="login icon"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Login Form */}
        <form className="pt-6 flex flex-col gap-4" onSubmit={submitForm}>
          {/* Email Field */}
          <div className="grid">
            <label className="text-gray-700 font-medium">Email :</label>
            <div className="bg-gray-100 p-2 rounded-lg">
              <input
                type="email"
                placeholder="Enter email"
                onChange={handleOnChange}
                value={data.email}
                name="email"
                className="w-full h-full outline-none bg-transparent text-gray-800"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-gray-700 font-medium">Password :</label>
            <div className="bg-gray-100 p-2 flex rounded-lg items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                onChange={handleOnChange}
                value={data.password}
                name="password"
                className="w-full h-full outline-none bg-transparent text-gray-800"
              />
              <div
                className="ml-2 cursor-pointer text-gray-600 hover:text-gray-800 transition-all focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span>{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</span>
              </div>
            </div>

            {/* Forgot Password Link */}
            <Link
              to="/forgot-password"
              className="block w-fit mt-3 text-sm text-blue-600 hover:text-red-600 font-semibold transition-all"
            >
              I forgot my password
            </Link>
          </div>

          {/* Login Button */}
          <button
            className="bg-[#872341] hover:bg-[#c7596f] text-white font-medium px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6 shadow-md"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-red-600 hover:text-red-700 hover:underline font-medium ml-1 transition-all"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
