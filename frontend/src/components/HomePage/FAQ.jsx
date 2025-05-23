import { useState } from "react";
import React from "react";

const faqs = [
    {
        question: "How can I upload a video to Video-Hub?",
        answer:
            "You can upload a video by signing in and clicking the 'Upload' button on the dashboard. Make sure your video follows our content guidelines.",
    },
    {
        question: "What video formats are supported?",
        answer:
            "We support MP4, WebM, and MOV formats. Maximum file size is 1GB per upload.",
    },
    {
        question: "Can I edit the video details after uploading?",
        answer:
            "Yes, go to your dashboard, select the video, and click on the edit icon to update the title, description, thumbnail, or visibility.",
    },
    {
        question: "How does the 'Watch Later' feature work?",
        answer:
            "Click the clock icon below any video to add it to your 'Watch Later' list. You can access it anytime from your profile menu.",
    },
    {
        question: "Is there a way to save my favorite videos?",
        answer:
            "Yes, use the 'Like' button to save videos to your Liked list. You can view all liked videos from your profile.",
    },
    {
        question: "Do I need an account to watch videos?",
        answer:
            "No account is needed for public videos, but you'll need to sign in to like, comment, or upload videos.",
    },
    {
        question: "How do I report inappropriate content?",
        answer:
            "Click the three-dot menu on any video and select 'Report'. Our team will review the report promptly.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-black py-10 px-4">
            <div className="mx-auto max-w-3xl text-center mb-10">
                <h1 className="text-[26px] md:text-[50px] text-white font-dmSans font-bold tracking-wide">
                    Frequently Asked Questions
                </h1>
            </div>

            <div className="mx-auto max-w-3xl space-y-4 px-2 md:px-8">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-zinc-700 hover:border-red-500 transition-colors duration-300 pb-3"
                    >
                        <button
                            className="w-full flex justify-between items-center text-left text-lg font-medium text-white cursor-pointer"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className="text-xl">
                                {openIndex === index ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#EF4444"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-circle-minus"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 12h8"></path>
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#EF4444"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 12h8"></path>
                                        <path d="M12 8v8"></path>
                                    </svg>
                                )}
                            </span>
                        </button>
                        <div
                            className={`text-md mt-4 text-zinc-300 transition-all duration-300 ${openIndex === index
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 opacity-0 overflow-hidden"
                                }`}
                        >
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
