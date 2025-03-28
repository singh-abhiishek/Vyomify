import {Input} from './index.js'
import React  from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { showToastMessage } from '../utils/showToaster.jsx'

const Signup = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const password = watch("password")
    const navigate = useNavigate()
    const create = async(data) => {
        try {
            showToastMessage("checking your data", "info");
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/users/Sign-Up`, data,  { withCredentials: true })
            if(response.status === 200){
                showToastMessage("OTP send Successfully", "success");
                navigate('/verify-Email')
            }
        } catch (error) {
            showToastMessage(error.response?.data?.message || "Request failed!", "error");
        }
    }
    // bg-[#111111]
  return (
 <div className='bg-[#111111]'>
    <div className=' flex justify-center h-screen items-center'>
    <div class="mx-auto bg-[#191919]  md:w-1/2 lg:w-2/5 dark:bg-dark_50 p-12 border border-zinc-300 dark:border-zinc-700 rounded-lg ">
        <div class=" mx-auto text-center pb-3">
            <h1 class=" text-white font-bold text-2xl dark:text-light_10">
                Ready to Begin Your Journey with
            </h1>
            <h1 class="text-red-600 font-amaranth font-bold text-5xl mt-2">
                Video-Hub
            </h1>
        </div>
        <div class="flex items-center my-4">
            <div class="border-t border-gray-700 border-dotted flex-grow mr-3" aria-hidden="true">
            </div>
            <div class="text-gray-600">
                sign up with
            </div>
            <div class="border-t border-gray-700 border-dotted flex-grow ml-3" aria-hidden="true">
            </div>
        </div>

        
        {/* ********************************************* */}

        <form onSubmit={handleSubmit(create)}>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full relative px-3 ">
                    <Input
                        type="text"
                        placeholder="Username*"
                        name="userName"
                        className="w-full text-gray-300 py-2 pl-10 pr-4 rounded-lg border-[0.2px] border-gray-700 bg-transparent focus:border-blue-400 outline-none transition-all duration-100 "
                        {...register("username", {
                            required:  "Username is required",
                            minLength: { value: 3, message: "Must be at least 3 characters" },
                            pattern: {
                                value: /^[a-zA-Z0-9_]+$/, // Only allows letters (a-z, A-Z) and numbers (0-9)
                                message: "No spaces or special characters allowed",
                            },
                        })}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-1 right-auto left-[22px] top-[12px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                    viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2">
                        </rect>
                        <circle cx="12" cy="10" r="3">
                        </circle>
                        <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2">
                        </path>
                    </svg>
                    {errors.username && <p class="text-red-600 text-sm italic">
                        {errors.username.message}
                    </p>}
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full relative px-3">
                    <Input
                        type="text"
                        placeholder="FullName"
                        name="fullName"
                        className="text-gray-300 py-2 pl-10 pr-4 rounded-lg w-full border-[0.2px] border-gray-700 bg-transparent focus:border-blue-400 outline-none transition-all duration-100 "
                        {...register("fullName", {
                            required:  "fullName is required",
                        })}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-1 right-auto left-[22px] top-[12px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                    viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2">
                        </path>
                        <circle cx="12" cy="7" r="4">
                        </circle>
                    </svg>
                    {errors.fullName && <p class="text-red-600 text-sm italic">
                        {errors.fullName.message}
                    </p>}
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full relative px-3">
                    <Input
                        type="email"
                        placeholder="you@gmail.com"
                        name="email"
                        className="text-gray-300 py-2 pl-10 pr-4 rounded-lg w-full border-[0.2px] border-gray-700 bg-transparent focus:border-blue-400 outline-none transition-all duration-100 "
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Enter a valid email",
                            },
                        })}
                    />
                    {/* <input type="email" name="email" class="form-input w-full text-gray-300 py-2 pl-10 pr-4"
                    placeholder="john@gmail.com" value="" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-1 right-auto left-[22px] top-[12px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                    viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2">
                        </rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7">
                        </path>
                    </svg>
                    {errors.email && <p class="text-red-600 text-sm italic">
                        {errors.email.message}
                    </p>}
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full relative px-3">
                    <Input
                        type={showPassword ? "text" :"password"}
                        placeholder="Password"
                        name="Password"
                        className="text-gray-300 py-2 pl-10 pr-4 rounded-lg w-full border-[0.2px] border-gray-700 bg-transparent focus:border-blue-400 outline-none transition-all duration-100 "
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Must be at least 6 characters",
                            },
                            pattern: {
                              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                              message: "Must include 1 uppercase, 1 number, & 1 special character only from @$!%*?&",
                            },
                        })}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-lock-keyhole absolute inset-1 right-auto left-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600">
                        <circle cx="12" cy="16" r="1">
                        </circle>
                        <rect x="3" y="10" width="18" height="12" rx="2">
                        </rect>
                        <path d="M7 10V7a5 5 0 0 1 10 0v3">
                        </path>
                    </svg>

                    <span
                        className='cursor-pointer'
                        onClick={togglePasswordVisibility}
                    >
                    {
                        showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-eye absolute inset-1 left-auto right-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600">
                                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                        ) : 
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-eye-off absolute inset-1 left-auto right-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600">
                                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49">
                                </path>
                                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242">
                                </path>
                                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143">
                                </path>
                                <path d="m2 2 20 20">
                                </path>
                            </svg>
                        )
                    }
                    </span>
                    {errors.password && <p class="text-red-600 text-sm italic">
                        {errors.password.message}
                    </p>}
                </div>
            </div>
            
            <div class="flex flex-wrap -mx-3  mb-4">
                <div class="w-full px-3 relative">
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="confirmPassword"
                        name="confirmPassword"
                        className="text-gray-300 py-2 pl-10 pr-4 rounded-lg w-full border-[0.2px] border-gray-700 bg-transparent focus:border-blue-400 outline-none transition-all duration-100 "
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        
                    />
                    {/* <input type="password" name="confirmPassword" class="form-input w-full text-gray-300 py-2 pl-10 pr-4"
                    placeholder="Confirm Password" value="" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-lock-keyhole absolute inset-1 right-auto left-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600">
                        <circle cx="12" cy="16" r="1">
                        </circle>
                        <rect x="3" y="10" width="18" height="12" rx="2">
                        </rect>
                        <path d="M7 10V7a5 5 0 0 1 10 0v3">
                        </path>
                    </svg>

                    <span
                        onClick={toggleConfirmPasswordVisibility}
                        className='cursor-pointer' 
                    >
                    {
                        showConfirmPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-eye absolute inset-1 left-auto right-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600">
                                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                        ) : 
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-eye-off absolute inset-1 left-auto right-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600">
                                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49">
                                </path>
                                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242">
                                </path>
                                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143">
                                </path>
                                <path d="m2 2 20 20">
                                </path>
                            </svg>
                        )
                    }
                    </span>
                    {errors.confirmPassword && <p class="text-red-600 text-sm italic">
                        {errors.confirmPassword.message}
                    </p>}
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mt-6">
                <div class="w-full px-3">
                    <button 
                    
                    type="submit" class="text-md rounded-lg relative inline-flex items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white w-full">
                        Verify and Sign up
                    </button>
                </div>
            </div>
        </form>
        <div class="text-gray-600 text-center mt-6">
            Already have an account?
            <a class="text-red-600 hover:text-red-700 font-semibold  transition duration-150 ease-in-out"
            href="/login">
                Sign in
            </a>
        </div>
    </div>
    </div>
</div>
  )
}

export default Signup