import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeImg from "../../assets/screens/Home.png"
const imgLink =
    "https://images.unsplash.com/photo-1533167649158-6d508895b680?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BsYXNofGVufDB8fDB8fHww";

const screens = [
    { title: "HomePage", img: HomeImg },
    { title: "SearchedItem", img: HomeImg },
    { title: "ProfilePage", img: HomeImg },
    { title: "ProfilePost", img: HomeImg },
    { title: "Dashboard", img: imgLink },
    { title: "WatchVideo", img: HomeImg },
    { title: "PlaylistPage", img: imgLink },
    { title: "UploadVideo", img: imgLink },
    { title: "SavedVideos", img: imgLink },
    { title: "CreatePlaylist", img: imgLink },
    { title: "WatchHistory", img: imgLink },
    { title: "Comment", img: imgLink },
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
        <section className="max-w-6xl mx-auto mt-9 px-4 sm:px-0.5 md:px-16 lg:px-0.5">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-white md:mt-20 lg:mt-30 mb-3 lg:mb-8 text-center">
                <span className="text-red-500">Experience </span>
                <span>the </span>
                <span>Screens in Action...</span>
            </h2>

            {/* bg-[#191b1f] bg-[#252629]*/}
            <div className="flex flex-col lg:flex-row gap-8 p-6 sm:p-8 bg-[#191b1f] rounded-md min-h-[400px]">
                {/* Left Info */}
                <div className="lg:w-1/3 w-full flex flex-col justify-center text-white">
                    <h3 className="text-xl sm:text-3xl font-extrabold text-gray-200 mb-1 sm:mb-6">
                        Explore Our Features
                    </h3>
                    <p className="text-gray-400 mb-3 sm:mb-6 leading-relaxed text-[13px] sm:text-lg "
                    >
                        "Get a sneak peek at the different sections of our website — from your profile and dashboard to uploading and managing videos with ease."
                    </p>
                    {/* <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-lg sm:hidden"
                    >
                        "A glimpse into your creator journey — from uploads to insights."
                    </p> */}

                    <div className="bg-black/50 p-5 rounded-lg font-mono text-sm shadow-inner whitespace-pre-wrap border border-gray-800 overflow-x-auto">
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
                <div className="lg:w-2/3 w-full rounded-lg p-4 sm:p-6.5 shadow-lg bg-black/50 backdrop-blur-sm border border-gray-800 flex flex-col">
                    {/* Code heading*/}
                    <pre className="font-mono text-xs sm:text-sm text-red-400 mb-3 select-none truncate">
                        {`const renderScreens = () => {`}
                    </pre>

                    {/* Carousel */}
                    <Slider {...settings}>
                        {screens.map(({ title, img }) => (
                            <div key={title} className="text-center rounded-lg px-2">
                                <h3 className="font-mono text-base sm:text-lg text-white mb-2 sm:mb-2.5 tracking-wide truncate">
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
                            </div>
                        ))}
                    </Slider>

                    <pre className="font-mono text-xs sm:text-sm text-red-400 mt-6 sm:mt-3 select-none">
                        {"}"}
                    </pre>
                </div>


            </div>
        </section>
    );
}
