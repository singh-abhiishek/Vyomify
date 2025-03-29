import React from 'react'
import OtpInput from '../components/OtpInput.jsx'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { showToastMessage } from '../utils/showToaster.jsx';
import { useNavigate } from 'react-router-dom';


const VerifyEmailWithOtp = () => {
    const navigate = useNavigate()

    const handleOtpSubmit = async (data) => {
        try {
            const otp = Number(Object.values(data.otp).join(""))
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/users/verify-Email`, {
                otpFilledByUser: otp
            }, { withCredentials: true })
            showToastMessage("Account created Successfully", "success")
            navigate('/upload-Profile-Images')
        } catch (error) {
            if(error.status === 409){
                showToastMessage(error.response?.data?.message || "Request failed!", "error");
            }else{
                showToastMessage("Try again after sometime", "error")
                // navigate('/')
            }
        }
    };

    const resendOtp = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/users/resend-otp`, 
                {},
                { withCredentials: true }
            )
            if(response.status === 200){
                showToastMessage("otp send successfully", "success")
            }
        } catch (error) {
            showToastMessage("Try again after sometime", "error")
        }
    }

    return (
        <div className=' bg-[#111111] h-screen flex  justify-center items-center'>
            <div className="max-w-[500px] bg-[#191919] p-4 w-11/12 md:w-full lg:p-10 mx-auto  dark:bg-dark_50 border border-zinc-300 dark:border-zinc-700 rounded-lg flex flex-col justify-center items-center ">
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

                <p className="text-[1.125rem] dark:text-zinc-200 text-center  leading-[1.625rem] my-6 text-richblack-100">
                    {/* Enter the OTP sent to your registered mail to ensure a secure and smooth access to your account. */}
                    {/* Check your inbox! Your OTP is waiting—faster than your crush’s reply. */}
                    One-Time Password, lifetime access! Enter it before it self-destructs
                </p>

                <OtpInput 
                    length = {6}
                    onSubmit={handleOtpSubmit}
                />

                <div className="mt-8 flex flex-col items-center gap-y-8 justify-center">
                    <div className="flex flex-row gap-x-2 text-gray-500">
                        <span>
                            Didn't receive the email?
                        </span>
                        <button
                        onClick={resendOtp} 
                        className="flex items-center text-red-600 hover:text-red-700 font-semibold gap-x-2"
                        >
                            Click to resend
                        </button>
                    </div>

                    <Link to="/signup">
                        <p className="text-zinc-800 dark:text-gray-300 flex items-center gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="lucide lucide-chevron-left">
                                <path d="m15 18-6-6 6-6">
                                </path>
                            </svg>
                            Back To Signup
                        </p>
                    </Link>
                </div>
            </div>





            {/* <div className="w-full flex flex-col gap-y-10">
                <div className="w-full flex flex-col items-center justify-center gap-8">

                </div>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="flex gap-2 items-center justify-center flex-wrap">
                        <button className="font-normal text-base text-pictonBlue-500 hover:underline"
                            fdprocessedid="5jji76">
                            Resend Code
                        </button>
                    </div>
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"
                            className="w-5 h-5 stroke-pictonBlue-500 stroke-2">
                            <path d="M7.064 14.146 2.25 15.75l1.604-4.813m3.21 3.209 8.025-8.025a2.27 2.27 0 0 0-3.21-3.21l-8.025 8.026m3.21 3.209-3.21-3.21m1.604 1.606 5.884-5.883m-1.07-2.14 3.21 3.21">
                            </path>
                        </svg>
                        <a className="text-base text-pictonBlue-500 font-medium" href="/login">
                            Edit Email
                        </a>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 px-4 py-2 !p-3 !rounded-btn text-white h-auto bg-indigo-600 hover:bg-indigo-700 w-full md:w-1/2"
                        fdprocessedid="9g6fh9">
                        <p className="flex items-center justify-center gap-x-2 text-xs font-medium px-2 undefined">
                            Continue
                        </p>
                    </button>


                    <p className=" bg-black text-base text-pictonBlue-500 font-medium flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 stroke-pictonBlue-500 stroke-2"><path fill="#fff" fill-opacity="0.4" d="M9 3V1h6v2zm2 11h2V8h-2zm1 8a8.65 8.65 0 0 1-3.488-.712A9.2 9.2 0 0 1 5.65 19.35a9.2 9.2 0 0 1-1.938-2.863A8.65 8.65 0 0 1 3 13q0-1.85.712-3.488A9.2 9.2 0 0 1 5.65 6.65a9.2 9.2 0 0 1 2.862-1.937A8.65 8.65 0 0 1 12 4a8.9 8.9 0 0 1 2.975.5Q16.4 5 17.65 5.95l1.4-1.4 1.4 1.4-1.4 1.4a9.7 9.7 0 0 1 1.45 2.675Q21 11.45 21 13a8.65 8.65 0 0 1-.712 3.488 9.2 9.2 0 0 1-1.938 2.862 9.2 9.2 0 0 1-2.863 1.938A8.65 8.65 0 0 1 12 22m0-2q2.9 0 4.95-2.05T19 13t-2.05-4.95T12 6 7.05 8.05 5 13t2.05 4.95T12 20"></path></svg> <span>6 Sec</span></p>
                </div>
            </div> */}
        </div>
    )
}

export default VerifyEmailWithOtp