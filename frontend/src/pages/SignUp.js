import React, { useState } from "react";
import loginIcon from "../assest/user.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import base64Image from "../util/base64Image";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
    });

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            alert("Invalid file type. Only JPG and PNG allowed.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // Limit 2MB
            alert("File is too large! Max size: 2MB");
            return;
        }

        const image = await base64Image(file);
        setData((prev) => ({ ...prev, profilePic: image }));
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Signup failed");
                return;
            }

            toast.success("Signup successful!");
            navigate("/login");
        } catch (error) {
            toast.error("An error occurred during signup");
        }
    };

    return (
        <section id="signup" className="mt-10 flex items-center justify-center">
            <div className="p-6 w-full max-w-md mx-auto bg-white shadow-xl rounded-lg">
                {/* Login Icon */}
                <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
                    <div>
                        <img src={data.profilePic || loginIcon} alt="login icon" />
                    </div>
                    <form>
                        <label>
                            <div className="text-xs bg-slate-200 bg-opacity-75 pb-4 pt-2 cursor-pointer py-4 text-center absolute bottom-0 w-full ">
                                Upload Image
                            </div>
                            <input type="file" className="hidden" onChange={uploadImage} />
                        </label>
                    </form>
                </div>

                {/* Login Form */}
                <form className="pt-6 flex flex-col gap-4" onSubmit={submitForm}>
                    {/* Name Field */}
                    <div className="grid">
                        <label className="text-gray-700 font-medium">Name : </label>
                        <div className="bg-gray-100 p-2 rounded-lg">
                            <input
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={data.name}
                                onChange={handleOnChange}
                                required
                                className="w-full h-full outline-none bg-transparent text-gray-800"
                            />
                        </div>
                    </div>

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
                                required
                                className="w-full h-full outline-none bg-transparent text-gray-800"
                            />
                            <div
                                className="ml-2 cursor-pointer text-gray-600 hover:text-gray-800 transition-all focus:outline-none"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                <span>{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</span>
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="text-gray-700 font-medium">Confirm Password :</label>
                        <div className="bg-gray-100 p-2 flex rounded-lg items-center">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Enter confirm password"
                                onChange={handleOnChange}
                                value={data.confirmPassword}
                                name="confirmPassword"
                                required
                                className="w-full h-full outline-none bg-transparent text-gray-800"
                            />
                            <div
                                className="ml-2 cursor-pointer text-gray-600 hover:text-gray-800 transition-all focus:outline-none"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                <span>{showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="bg-[#872341] hover:bg-[#c7596f] text-white font-medium px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6 shadow-md"
                    >
                        SignUp
                    </button>
                </form>

                {/* Signup Link */}
                <p className="mt-6 text-center text-gray-700">
                    Already have an account?
                    <Link to="/login" className="text-red-600 hover:text-red-700 hover:underline font-medium ml-1 transition-all">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default SignUp;
