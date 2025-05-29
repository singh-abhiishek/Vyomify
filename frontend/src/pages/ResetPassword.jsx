import React, { useState } from 'react'
import { Input } from '../components'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { showToastMessage } from '../utils/showToaster'
import { login as storeLogin } from "../store/slices/authSlice.js"
import { useDispatch, useSelector } from 'react-redux';
import { useResetPasswordMutation } from '../store/slices/userApiSlice.js'
import { Spinner } from '../utils/loadingIndicator.jsx'
import resetIcon from "../assets/resetIcon.jpg"


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

    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const dispatch = useDispatch()
    const reset = async (data) => {
        // console.log(data)
        if (step === 1) {
            try {
                showToastMessage("checking your email", "info")
                const response = await resetPassword({
                    email: data.email,
                }).unwrap()

                // console.log("response",response)

                if (response.success) {
                    setEmail(data.email)
                    setStep(2)
                    setIsReadOnly(true)
                    showToastMessage("otp send successfully to your registered email", "success")
                }
            } catch (error) {
                console.log(error)
                showToastMessage("Request failed!", "error");
            }
        } else if (step === 2) {
            try {
                showToastMessage("checking your data", "info")
                const userData = await resetPassword({
                    email: data.email,
                    otp: data.otp,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword,
                }).unwrap()

                if (userData.success) {
                    showToastMessage("password reset successfully", "success")
                    dispatch(storeLogin(userData.data))
                    navigate('/explore')
                }
            } catch (error) {
                console.log(error)
                showToastMessage(error.response?.data?.message || "Request failed!", "error");
                // showToastMessage("Request failed!", "error");
                // navigate('/')
            }
        }
    }

    return (
        <div className='bg-[#111111] h-screen flex justify-center items-center m-2 sm:m-0'>
            <div className=" w-full bg-[#191919]  md:w-1/2 lg:w-2/5 dark:bg-dark_50 p-10 border border-zinc-300 dark:border-zinc-700 rounded-lg">

                <div className="max-w-3xl mx-auto flex flex-col justify-center items-center text-center pb-8 md:pb-10">
                    <div>
                        <img
                            className="w-20 h-20 object-contain rounded-full"
                            src={resetIcon} alt="reset-icon" />
                    </div>

                    <h1 className="text-xl dark:text-zinc-200 mt-4 font-bold leading-tight tracking-tighter">
                        Forgot Password?
                    </h1>

                    <h1 className="text-lg text-zinc-600 mt-1 font-semibold">
                        {/* "Lost Password? Reset faster than DSA sorting!" */}
                        "No worries, even Batman needs a reset sometimes!"
                    </h1>

                </div>

                <div className="max-w-sm mx-auto">
                    <form onSubmit={handleSubmit(reset)}>

                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full relative px-3">
                                <Input
                                    type="email"
                                    value={email}
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute inset-1 right-auto left-[22px] top-[12px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="M22 7L13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>

                                {errors.email && <p className="text-red-600 text-sm italic">
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute inset-1 right-auto left-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect width="20" height="12" x="2" y="6" rx="2" />
                                    <path d="M12 12h.01" />
                                    <path d="M17 12h.01" />
                                    <path d="M7 12h.01" />
                                </svg>

                                {errors.otp && <p className="text-red-600 text-sm italic">
                                    {errors.otp.message}
                                </p>}
                            </div> : null}

                            {step === 2 ? <div className="w-full relative px-3 mt-4">
                                <Input
                                    type={showNewPassword ? "text" : "password"}
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute inset-1 right-auto left-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="16" r="1" />
                                    <rect x="3" y="10" width="18" height="12" rx="2" />
                                    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                                </svg>

                                <span
                                    className='cursor-pointer'
                                    onClick={togglePasswordVisibility}
                                >
                                    {
                                        showNewPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-eye absolute inset-1 left-auto right-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                                            >
                                                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>

                                        ) :
                                            (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-eye-off absolute inset-1 left-auto right-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                                                >
                                                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                                                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                                                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                                                    <path d="M2 2l20 20" />
                                                </svg>
                                            )
                                    }
                                </span>
                                {errors.newPassword && <p className="text-red-600 text-sm italic">
                                    {errors.newPassword.message}
                                </p>}
                            </div> : null}

                            {step === 2 ? <div className="w-full relative px-3 mt-4">
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-lock-keyhole absolute inset-1 right-auto left-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                                >
                                    <circle cx="12" cy="16" r="1" />
                                    <rect x="3" y="10" width="18" height="12" rx="2" />
                                    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                                </svg>


                                <span
                                    onClick={toggleConfirmPasswordVisibility}
                                    className='cursor-pointer'
                                >
                                    {
                                        showConfirmPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-eye absolute inset-1 left-auto right-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                                            >
                                                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>


                                        ) :
                                            (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-eye-off absolute inset-1 left-auto right-[22px] top-[10px] w-[20px] h-[20px] stroke-gray-300 dark:stroke-zinc-600"
                                                >
                                                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                                                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                                                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                                                    <path d="M2 2l20 20" />
                                                </svg>
                                            )
                                    }
                                </span>
                                {errors.confirmPassword && <p className="text-red-600 text-sm italic">
                                    {errors.confirmPassword.message}
                                </p>}
                            </div> : null}
                        </div>

                        <div className="flex flex-wrap justify-center -mx-3 mt-6">
                            <div className="w-full px-3">
                                <button
                                    type='submit'
                                    disabled={isLoading}
                                    className="text-md rounded-lg relative inline-flex items-center justify-center px-5 py-2.5 m-1 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white w-full">
                                    {/* Submit */}
                                    {isLoading ? (
                                        <Spinner />
                                    ) : step === 1 ? (
                                        "Submit"
                                    ) : step === 2 ? (
                                        "Reset"
                                    ) : null}
                                </button>
                            </div>

                            <Link
                                to="/signup">
                                <p className="text-zinc-600 mt-3.5 dark:text-gray-200 flex items-center gap-x-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-chevron-left"
                                    >
                                        <path d="M15 18L9 12l6-6" />
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