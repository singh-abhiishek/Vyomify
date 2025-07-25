import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStepForm } from "../../contextAPI/StepFormContext";
import { useTweetForm } from "../../contextAPI/TweetFormContext.jsx";

const UploadPopUp = ({ modalRef, sendDataToUploadButton }) => {

    const { toggleStepForm } = useStepForm() // come from contextapi
    const { toggleTweetForm } = useTweetForm()

    return (
        <div className="relative ">
            {/* Dropdown */}
            <div className="origin-top-right z-10 rounded-[8px] absolute top-full min-w-38 bg-[#191919] text-white dark:bg-dark_50 dark:border-zinc-800 border border-gray-200  shadow-lg overflow-hidden mt-1 right-0"
                ref={modalRef}
            >

                {/* Dropdown Links */}
                <div className="flex flex-col items-start px-2 mt-2 space-y-0.5 mb-1">
                    {/* video upload Link */}
                    <div
                        onClick={() => {
                            sendDataToUploadButton(false)
                            toggleStepForm(); // toggles the form open/close
                        }}
                        className="font-medium flex cursor-pointer items-center px-2 hover:bg-[#212121] hover:dark:bg-dark_40 w-full py-2 rounded-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="22"
                            width="22"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                            fill="white"
                        >
                            <path d="M10 8l6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z"></path>
                        </svg>
                        <span className="text-sm ml-2">Publish video</span>
                    </div>

                    {/* tweet post Link */}
                    <div
                        onClick={() => {
                            sendDataToUploadButton(false)
                            toggleTweetForm(); // toggles the form open/close
                        }}
                        className="font-medium flex items-center cursor-pointer px-2 hover:bg-[#212121] hover:dark:bg-dark_40 w-full py-2 rounded-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="22"
                            width="22"
                            viewBox="0 0 24 24"
                            focusable="false"
                            aria-hidden="true"
                            fill="white"
                        >
                            <path d="M15.01,7.34l1.64,1.64L8.64,17H6.99v-1.64L15.01,7.34 M15.01,5.92l-9.02,9.02V18h3.06l9.02-9.02L15.01,5.92L15.01,5.92z M17.91,4.43l1.67,1.67l-0.67,0.67L17.24,5.1L17.91,4.43 M17.91,3.02L15.83,5.1l3.09,3.09L21,6.11L17.91,3.02L17.91,3.02z M21,10h-1 v10H4V4h10V3H3v18h18V10z"></path>
                        </svg>

                        <span className="text-sm ml-2">New Post</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UploadPopUp;
