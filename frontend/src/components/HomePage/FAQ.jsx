import { useState } from "react";
import React from "react";

const faqs = [
    {
        question: "Can I publish posts other than videos on this website?",
        answer:
            "Yes! Besides uploading videos, you can create posts with text and photos. Just use the 'Create' option in the navbar to choose between uploading a video or creating a post.",
    },
    {
        question: "Can I edit my video details and personal profile after uploading?",
        answer:
            "Yes, in your dashboard you can update video details like title, description, thumbnail, and visibility. You can also update your personal profile by changing your cover image and avatar.",
    },
    {
        question: "How does the 'Watch Later' feature work?",
        answer:
            "Click the clock icon below any video to add it to your 'Watch Later' list. You can access it anytime from your watchLater list.",
    },
    {
        question: "Is there a way to save my favorite videos?",
        answer:
            "Yes, use the 'Like' button to save videos to your Liked list. You can view all liked videos from your sidebar.",
    },
    {
        question: "How do subscriptions work on Video-Hub?",
        answer:
            "Your subscribed channels are listed at the bottom of the sidebar. When you click the 'Subscription' button in the sidebar, you’ll see the latest videos from those channels in a separate list.",
    },
    {
        question: "How does the search functionality work?",
        answer:
            "You can use the search bar at the top of the navbar to search for any channel or any content like songs by typing exact keywords.",
    },
    {
        question: "Do I need an account to watch videos?",
        answer:
            "No account is needed for public videos, but you'll need to sign in to like, comment, or upload videos.",
    },
    {
        question: "Can I create private playlists?",
        answer:
            "Yes, you can organize videos into playlists and mark them as private or public based on your preference.",
    },
    {
        question: "How do I reset my password?",
        answer:
            "Click on 'Forgot Password' on the login screen and follow the instructions to reset it via email.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-black py-16 px-4 md:px-10">
            <div className="mx-auto max-w-3xl text-center mb-10">
                <h1 className="text-[26px] md:text-[50px] text-white font-bold tracking-wide">
                    Frequently Asked Questions
                </h1>
            </div>

            <div className="mx-auto max-w-3xl">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div
                            key={index}
                            onClick={() => toggleFAQ(index)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") toggleFAQ(index);
                            }}
                            className={`flex flex-col border-b border-zinc-700 py-4 cursor-pointer select-none transition-colors duration-300 ${isOpen ? "border-red-500" : "hover:border-red-500"
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <h4
                                    className={`text-base md:text-lg font-medium transition-colors ${isOpen ? "text-red-500" : "text-white"
                                        }`}
                                >
                                    {faq.question}
                                </h4>
                                <span className="ml-4 flex-shrink-0">
                                    {isOpen ? (
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
                            </div>
                            <div
                                className={`text-zinc-300 text-sm md:text-base mt-3 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FAQ;
