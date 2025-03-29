import React, {useState} from 'react'
import { Input } from '../components'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { showToastMessage } from '../utils/showToaster'


const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const newPassword = watch("newPassword")
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [step, setStep] = useState(1)
    const [isReadOnly, setIsReadOnly] = useState(false);

    const reset = async(data) => {
        if(step === 1){
            try {
                showToastMessage("checking your email", "info")
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/users/reset-password`, data)
                if(response.status === 200){
                    setEmail(data.email)
                    setStep(2)
                    setIsReadOnly(true)
                    showToastMessage("otp send successfully to your registered email", "success")
                }
            } catch (error) {
                showToastMessage(error.response?.data?.message || "Request failed!", "error");
                // showToastMessage("Request failed!", "error");
            }
        }else if(step === 2){
            console.log(data)
            try {
                showToastMessage("checking your data", "info")
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/users/reset-password`, data)
                if(response.status === 200){
                    showToastMessage("password reset successfully", "success")
                    navigate('/')
                }
            } catch (error) {
                showToastMessage(error.response?.data?.message || "Request failed!", "error");
                // showToastMessage("Request failed!", "error");
                // navigate('/')
            }
        }
    }

  return (
    <div className='bg-[#111111] h-screen flex justify-center items-center'>
        <div class="mx-auto w-full bg-[#191919] md:w-1/2 lg:w-2/5 dark:bg-dark_50 p-12 border border-zinc-300 dark:border-zinc-700 rounded-lg">

            <div class="max-w-3xl mx-auto flex flex-col justify-center items-center text-center pb-8 md:pb-16">

                <div>
                    <img src="data:image/png;base64,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"
                    alt="img" class="w-20 h-20 object-contain "/>
                </div>
                
                <h1 class="text-xl dark:text-zinc-200 mt-4 font-bold leading-tight tracking-tighter">
                    Forgot Password?
                </h1>

                <h1 class="text-lg text-zinc-600 mt-1 font-semibold">
                    {/* "Lost Password? Reset faster than DSA sorting!" */}
                    "No worries, even Batman needs a reset sometimes!"
                </h1>

            </div>

            <div class="max-w-sm mx-auto">
                <form onSubmit={handleSubmit(reset)}>

                    <div class="flex flex-wrap -mx-3 mb-4">
                        <div class="w-full relative px-3">
                            <Input
                                type="email"
                                value = {email}
                                readOnly={isReadOnly}
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

                        {step === 2 ? <div className="w-full relative px-3 mt-4">
                        <Input
                            type="text"
                            placeholder="Enter otp"
                            name="otp"
                            className="text-gray-300 py-2 pl-10 pr-4 rounded-lg w-full border-[0.2px] border-gray-700 bg-transparent focus:border-blue-400 outline-none transition-all duration-100 "
                            {...register("otp", {
                                required: "otp is required",
                                pattern: {
                                    value: /^[0-9]{6}$/,  // Ensures exactly 6 digits (adjust as needed)
                                    message: "Enter a valid 6-digit OTP"
                                }
                            })}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-1 right-auto left-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"></rect><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>

                        {errors.otp && <p class="text-red-600 text-sm italic">
                            {errors.otp.message}
                        </p>}
                        </div> : null}

                        {step === 2 ? <div class="w-full relative px-3 mt-4">
                                <Input
                                    type={showNewPassword ? "text" :"password"}
                                    placeholder="NewPassword"
                                    name="newPassword"
                                    className="text-gray-300 py-2 pl-10 pr-4 rounded-lg w-full border-[0.2px] border-gray-700 bg-transparent focus:border-blue-400 outline-none transition-all duration-100 "
                                    {...register("newPassword", {
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
                                    showNewPassword ? (
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
                                {errors.newPassword && <p class="text-red-600 text-sm italic">
                                    {errors.newPassword.message}
                                </p>}
                        </div> : null}
                                
                        {step === 2 ? <div class="w-full relative px-3 mt-4">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="confirmPassword"
                                name="confirmPassword"
                                className="text-gray-300 py-2 pl-10 pr-4 rounded-lg w-full border-[0.2px] border-gray-700 bg-transparent focus:border-blue-400 outline-none transition-all duration-100 "
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) =>
                                    value === newPassword || "Passwords do not match",
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
                        </div> : null}
                    </div>

                    <div class="flex flex-wrap justify-center -mx-3 mt-6">
                        <div class="w-full px-3">
                            <button class="text-md rounded-lg relative inline-flex items-center justify-center px-5 py-2.5 m-1 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white w-full">
                                Submit
                            </button>
                        </div>

                        <Link 
                            to="/signup">
                            <p className="text-zinc-600 mt-3.5 dark:text-gray-200 flex items-center gap-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" className="lucide lucide-chevron-left">
                                    <path d="m15 18-6-6 6-6">
                                    </path>
                                </svg>
                                Back To Login
                            </p>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword