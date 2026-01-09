import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { showToastMessage } from '../utils/showToaster'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../store/slices/authSlice.js'
import { Spinner } from '../utils/loadingIndicator.jsx'
import { useLoginMutation } from '../store/slices/userApiSlice.js'
import { Eye, EyeOff } from "lucide-react";
import TryGuestAsLogin from './TryGuestAsLogin.jsx'


const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()
    const loggedIn = async (data) => {
        try {
            showToastMessage("Let me find you... Stay cool. 😎", "info")
            const userData = await login({
                email: data.email,
                password: data.password
            }).unwrap()

            if (userData.success) {
                // console.log(userData.data)
                dispatch(storeLogin(userData.data))
                showToastMessage("Login successful! Welcome back.", "success")
                setTimeout(() => { // because dispatch take sometime to update the authStatus in store, explore-page required authentication that's why some delay
                    navigate('/explore')
                }, 100);
            }
        } catch (error) {
            console.log(error)
            if (error.status === 401) {
                showToastMessage(error.response?.data?.message || "Request failed!", "error");
            }
            else showToastMessage(error.response?.data?.message || "Request failed!", "error");
        }
    }

    return (

        <div className="bg-[#111111] flex justify-center items-center min-h-screen px-4 sm:px-6">
            <div className="w-full max-w-[320px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[480px] bg-[#191919] dark:bg-dark_50 p-6 sm:p-10 border border-zinc-700 rounded-xl shadow-lg">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white dark:text-light_10 font-dmSans">
                        Welcome back to
                    </h1>
                    <h2 className="text-4xl sm:text-5xl font-bold text-red-600 font-amaranth">
                        Vyomify
                    </h2>
                </div>

                {/* Divider */}
                <div className="flex items-center my-8">
                    <div className="flex-grow border-t border-dotted border-gray-700"></div>
                    <span className="mx-4 text-gray-600 text-sm">sign in with your email</span>
                    <div className="flex-grow border-t border-dotted border-gray-700"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(loggedIn)} className="space-y-5">
                    {/* Email Field */}
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="you@gmail.com"
                            name="email"
                            className="text-gray-300 py-2 pl-10 pr-4 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-400 outline-none transition-all"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email",
                                },
                            })}
                        />
                        <svg className="absolute left-3 top-2.5 w-5 h-5 stroke-gray-300 dark:stroke-zinc-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        {errors.email && <p className="text-red-600 text-sm italic mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            className="text-gray-300 py-2 pl-10 pr-12 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-400 outline-none transition-all"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Must be at least 6 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                    message: "Must include 1 uppercase, 1 number, & 1 special character (@$!%*?&)",
                                },
                            })}
                        />
                        <svg className="absolute left-3 top-2.5 w-5 h-5 stroke-gray-300 dark:stroke-zinc-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="16" r="1" />
                            <rect x="3" y="10" width="18" height="12" rx="2" />
                            <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                        </svg>

                        <span onClick={togglePasswordVisibility} className="absolute right-4 top-3 cursor-pointer">
                            {showPassword ? (
                                <Eye className="w-5 h-5 text-gray-300 dark:text-zinc-600" />
                            ) : (
                                <EyeOff className="w-5 h-5 text-gray-300 dark:text-zinc-600" />
                            )}
                        </span>

                        {errors.password && <p className="text-red-600 text-sm italic mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right text-sm">
                        <Link to="/reset-password" className="text-red-600 hover:text-red-700 font-semibold">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 rounded-lg text-white font-semibold shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 border border-red-700 transition-all duration-150"
                    >
                        {isLoading ? <Spinner name="Logging in..." /> : "Login"}
                    </button>
                </form>

                {/* Signup link */}
                <p className="text-center text-gray-600 text-sm mt-6">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-red-600 hover:text-red-700 font-semibold">
                        Sign up
                    </Link>
                </p>

                

                {/* Divider */}
                <div className="flex items-center mt-3">
                    <div className="flex-grow border-t border-dotted border-gray-700"></div>
                    <span className="mx-4 text-gray-600 text-sm">OR</span>
                    <div className="flex-grow border-t border-dotted border-gray-700"></div>
                </div>

                {/* Try guest login  */}
                <TryGuestAsLogin />

            </div>
        </div>

    )
}

export default Login