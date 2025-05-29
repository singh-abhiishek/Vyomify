import React, { useEffect } from 'react'
import OtpInput from '../components/OtpInput.jsx'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { showToastMessage } from '../utils/showToaster.jsx';
import { useNavigate } from 'react-router-dom';
import { login as storeLogin } from "../store/slices/authSlice.js"
import { useDispatch, useSelector } from 'react-redux';
import { showVerifyEmailPage as storeShowVerifyEmailPage } from '../store/slices/authSlice.js'
import { showUploadProfileImagePage as storeShowUploadProfileImagePage } from '../store/slices/authSlice.js'
import { useResendOTPMutation, useVerifyEmailWithOtpMutation } from '../store/slices/userApiSlice.js';
import { ChevronLeft } from 'lucide-react';

const VerifyEmailWithOtp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const verifyEmailPageVisibStatus = useSelector(state => state.auth.isVerifyEmailPageVisible)

    const [VerifyEmailWithOtp, { isLoading }] = useVerifyEmailWithOtpMutation()
    const [resendOTP] = useResendOTPMutation()

    useEffect(() => {
        if (!verifyEmailPageVisibStatus) {
              navigate("/"); // Agar showOtpPage false hai to home pe bhejo
        }
    }, [verifyEmailPageVisibStatus]);

    const handleOtpSubmit = async (data) => {
        try {
            const otp = Number(Object.values(data.otp).join(""))
            const userData = await VerifyEmailWithOtp({
                otpFilledByUser: otp,
            }).unwrap()

            if (userData.success) {
                showToastMessage("Account created Successfully", "success")

                dispatch(storeLogin(userData.data))
                dispatch(storeShowVerifyEmailPage(false))
                dispatch(storeShowUploadProfileImagePage(true))

                setTimeout(() => {
                    navigate("/upload-Profile-Images");
                }, 100);
            }
        } catch (error) {
            if (error.status === 409) {
                showToastMessage(error.response?.data?.message || "Request failed!", "error");
            } else {
                console.log("error", error)
                showToastMessage("Try again after sometime", "error")
                // navigate('/')
            }
        }
    };

    // console.log("after dispathching from verifyemail", useSelector(state => state.auth))


    const handleResendOtp = async () => {
        try {
            const response = await resendOTP().unwrap()
            if (response.status === 200) {
                showToastMessage("otp send successfully", "success")
            }
        } catch (error) {
            showToastMessage("Try again after sometime", "error")
        }
    }

    return (
        <div className=' h-screen flex  justify-center items-center'>
            <div className="max-w-[500px] bg-[#191919] p-4  md:w-full lg:p-10 dark:bg-dark_50 border border-zinc-300 dark:border-zinc-700 rounded-lg flex flex-col justify-center items-center ">
                <div className="bg-red-700  p-4 rounded-full border-4 border-[#FCEDEF]">
                    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 15.0703V34.0003C44.0001 35.5307 43.4153 37.0033 42.3654 38.1168C41.3155 39.2303 39.8798 39.9005 38.352 39.9903L38 40.0003H10C8.46958 40.0004 6.99697 39.4157 5.88348 38.3657C4.76999 37.3158 4.09978 35.8801 4.01 34.3523L4 34.0003V15.0703L22.89 27.6643L23.122 27.7963C23.3954 27.9299 23.6957 27.9993 24 27.9993C24.3043 27.9993 24.6046 27.9299 24.878 27.7963L25.11 27.6643L44 15.0703Z"
                            fill="white">
                        </path>
                        <path d="M38 8C40.16 8 42.054 9.14 43.11 10.854L24 23.594L4.89001 10.854C5.39147 10.0395 6.08044 9.3568 6.89943 8.86277C7.71842 8.36873 8.64368 8.07771 9.59801 8.014L10 8H38Z"
                            fill="white">
                        </path>
                        <path d="M44 15.0703V34.0003C44.0001 35.5307 43.4153 37.0033 42.3654 38.1168C41.3155 39.2303 39.8798 39.9005 38.352 39.9903L38 40.0003H10C8.46958 40.0004 6.99697 39.4157 5.88348 38.3657C4.76999 37.3158 4.09978 35.8801 4.01 34.3523L4 34.0003V15.0703L22.89 27.6643L23.122 27.7963C23.3954 27.9299 23.6957 27.9993 24 27.9993C24.3043 27.9993 24.6046 27.9299 24.878 27.7963L25.11 27.6643L44 15.0703Z"
                            stroke="white">
                        </path>
                        <path d="M38 8C40.16 8 42.054 9.14 43.11 10.854L24 23.594L4.89001 10.854C5.39147 10.0395 6.08044 9.3568 6.89943 8.86277C7.71842 8.36873 8.64368 8.07771 9.59801 8.014L10 8H38Z"
                            stroke="white">
                        </path>
                    </svg>
                </div>

                <h1 className="font-primary dark:text-zinc-200 text-center mt-2 font-bold text-[1.875rem] leading-[2.375rem]">
                    Verify OTP
                </h1>

                <p className="text-[1rem] lg:text-[1.125rem] text-zinc-200 text-center  leading-[1.625rem] my-6 text-richblack-100">
                    {/* Enter the OTP sent to your registered mail to ensure a secure and smooth access to your account. */}
                    {/* Check your inbox! Your OTP is waiting—faster than your crush’s reply. */}
                    One-Time Password, lifetime access! Enter it before it self-destructs
                </p>

                <OtpInput
                    length={6}
                    onSubmit={handleOtpSubmit}
                    isLoading={isLoading}
                />

                <div className="mt-8 flex flex-col items-center gap-y-8 justify-center">
                    <div className="flex flex-row gap-x-2 text-gray-500">
                        <span>
                            Didn't receive the email?
                        </span>
                        <button
                            onClick={handleResendOtp}
                            className="flex items-center text-red-600 hover:text-red-700 font-semibold gap-x-2"
                        >
                            Click to resend
                        </button>
                    </div>

                    <Link to="/signup">
                        <p className="text-zinc-800 dark:text-gray-300 flex items-center gap-x-0.5">
                            <ChevronLeft className="w-5 h-5 text-white" />
                            Back To Signup
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailWithOtp