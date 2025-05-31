import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeExplore from "../../assets/screens/HomeExplore.png"
import searchedChannel from "../../assets/screens/searchedChannel.png"
import watchVideo from "../../assets/screens/watchVideo.png"
import profile from "../../assets/screens/profile.png"
import dashboard from "../../assets/screens/dashboard.png"
import singlePlaylist from "../../assets/screens/singlePlaylist.png"
import stepperForm from "../../assets/screens/stepperForm.png"
import post from "../../assets/screens/post.png"
import watchHistory from "../../assets/screens/watchHistory.png"
import likedVideos from "../../assets/screens/likedVideos.png"
import watchLater from "../../assets/screens/watchLater.png"
import subscriptions from "../../assets/screens/subscriptions.png"
import playlists from "../../assets/screens/playlists.png"
import profilePlaylist from "../../assets/screens/profilePlaylist.png"
import comment from "../../assets/screens/comment.png"
import searchedItem from "../../assets/screens/searchedItem.png"
import postForm from "../../assets/screens/postForm.png"

const screens = [
    { title: "HomePage", img: HomeExplore },
    { title: "SearchedChannel", img: searchedChannel },
    { title: "searchedItem", img: searchedItem },
    { title: "WatchVideo", img: watchVideo },
    { title: "Comment", img: comment },
    { title: "Dashboard", img: dashboard },
    { title: "PlaylistPage", img: singlePlaylist },
    { title: "UploadVideo", img: stepperForm },
    { title: "WatchHistory", img: watchHistory },
    { title: "LikedVideos", img: likedVideos },
    { title: "watchLater", img: watchLater },
    { title: "subscriptions", img: subscriptions },
    { title: "AllPlaylists", img: playlists },
    { title: "ProfilePage", img: profile },
    { title: "ProfilePost", img: post },
    { title: "profilePlaylist", img: profilePlaylist },
    { title: "createPost", img: postForm },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    appendDots: (dots) => (
        <div>
            <ul className="flex justify-center gap-0.5 overflow-x-auto scrollbar-hide px-1">
                {dots}
            </ul>
        </div>
    ),
    customPaging: () => (
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5  bg-white rounded-full opacity-50 hover:opacity-100 transition"></div>
    ),
};

export default function ScreensCarousel() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto mt-15 sm:mt-20  px-4 sm:px-0.5 md:px-16 lg:px-0.5"
        >

            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center"
            >
                Take a Visual Tour of  <span className="animate-pulse">Vyomify ...</span>
                
            </motion.h3>

            {/* bg-[#191b1f] bg-[#252629]*/}
            <div className="flex flex-col lg:flex-row gap-8 p-6 sm:p-8 bg-[#191b1f] rounded-md min-h-[400px]">
                {/* Left Info */}
                <div className="lg:w-1/3 w-full flex flex-col justify-center text-white">
                    <h3 className="text-xl sm:text-3xl font-extrabold text-gray-400 mb-1 sm:mb-6 text-center">
                        Explore Our Features
                    </h3>
                    <p className="text-gray-400 mb-3 sm:mb-6 leading-relaxed text-[13px] sm:text-lg text-center "
                    >
                        "Get a sneak peek at the different sections of our website — from your profile and dashboard to uploading and managing videos with ease."
                    </p>

                    <div className="bg-black/20 p-5 rounded-lg font-mono text-sm shadow-inner whitespace-pre-wrap border border-gray-800 overflow-x-auto">
                        <pre className="text-red-400">
                            <code>
                                import <span className="text-white">React</span> from <span className="text-green-400">"react"</span>;
                                {"\n\n"}
                                <span className="text-red-400">function</span> <span className="text-white">Features</span>() {"{"}
                                {"\n  "}
                                <span className="text-red-400">return</span> (
                                {"\n    "}
                                <span className="text-gray-300">&lt;MadeWithLove❤️&gt;</span>
                                {"\n      "}
                                <span className="text-orange-400">&lt;UploadVideo /&gt;</span>
                                {"\n      "}
                                <span className="text-orange-400">&lt;YourDashboard /&gt;</span>
                                {"\n      "}
                                <span className="text-orange-400">&lt;CreatePlaylist /&gt;</span>
                                {"\n      "}
                                <span className="text-orange-400">&lt;WatchLater /&gt;</span>
                                {"\n    "}
                                <span className="text-gray-300">&lt;/MadeWithLove❤️&gt;</span>
                                {"\n  "});
                                {"\n"}
                                {"}"}
                            </code>
                        </pre>
                    </div>

                </div>

                {/* bg-black/40 bg-black/30 */}
                <div className="lg:w-2/3 w-full rounded-lg p-4 sm:p-6.5 shadow-lg bg-black/20 backdrop-blur-sm border border-gray-800 flex flex-col">
                    {/* Code heading*/}
                    <pre className="font-mono text-sm text-red-400 sm:mb-3 select-none truncate">
                        {`const renderScreens = () => {`}
                    </pre>

                    {/* Carousel */}
                    <Slider {...settings}>
                        {screens.map(({ title, img }) => (
                            <motion.div
                                key={title}
                                className="text-center rounded-lg"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h3 className="font-mono text-sm sm:text-lg text-white sm:mb-1 tracking-wide truncate">
                                    <span className="text-orange-400">&lt;</span>
                                    <span className="text-orange-400">{title}</span>
                                    <span className="text-orange-400">/&gt;</span>
                                </h3>
                                <img
                                    src={img}
                                    alt={title}
                                    className="mx-auto rounded-lg w-full max-h-[200px] sm:max-h-[350px] object-contain shadow-xl border border-gray-800"
                                    style={{ filter: "brightness(98%)" }}
                                />
                            </motion.div>
                        ))}
                    </Slider>

                    <pre className="font-mono text-sm text-red-400 mt-6 sm:mt-3 select-none">
                        {"}"}
                    </pre>
                </div>


            </div>
        </motion.section>
    );
}
