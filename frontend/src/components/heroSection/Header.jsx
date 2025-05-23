import React from 'react'

const Header = () => {
    return (
        <>
            <section class="bg-black text-white min-h-screen flex items-center justify-center px-8">
                <div class="max-w-4xl text-center">
                    <h1 class="text-5xl font-bold text-red-600 mb-6">Welcome to Video-Hub</h1>
                    <p class="text-lg text-gray-300 mb-8">
                        Stream. Upload. Connect. <span class="text-red-500">Your world of videos</span> starts here.
                    </p>
                    <div class="flex justify-center gap-4">
                        <a href="/signup" class="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition">Get Started</a>
                        <a href="/explore" class="border border-red-600 hover:bg-red-600 hover:text-white text-red-600 py-3 px-6 rounded-lg transition">Explore</a>
                    </div>
                </div>
            </section>


            <section class="bg-gray-900 text-gray-200 py-16 px-8">
                <div class="max-w-5xl mx-auto text-center">
                    <h2 class="text-3xl font-semibold text-red-500 mb-4">Why Video-Hub?</h2>
                    <p class="text-lg mb-6">We empower creators and viewers with a seamless platform designed to inspire and connect. Built for speed, security, and style.</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">🎥 Ultra-Fast Uploads</h3>
                            <p class="text-sm">Upload your videos in seconds, no lag, no limits.</p>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">🔒 Secure Platform</h3>
                            <p class="text-sm">Your content, fully protected with top-grade encryption.</p>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">🌍 Global Reach</h3>
                            <p class="text-sm">Reach an audience from every corner of the world.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section class="bg-red-600 text-white py-12 text-center">
                <h2 class="text-3xl font-bold mb-4">Ready to Go Viral?</h2>
                <p class="mb-6 text-lg">Join thousands of creators making waves every day.</p>
                <a href="/signup" class="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition">Sign Up Free</a>
            </section>


            {/* ************************************************ */}
            
            <div className="w-full bg-dark dark:bg-[#0F0F0F] flex flex-col sm:py-14 py-8 items-center justify-center sm:mt-10 mt-10">
                <p class="text-red-600 font-bold md:text-[50px]  text-[26px] text-center xs:text-[26px] mt-4">Connect your thoughts</p>
                <p class="text-white font-bold sm:text-[18px] text-[12px] text-center capitalize mt-4">people have ALREADY signed up across the globe</p>
                <button class="bg-red-600 rounded-lg text-white sm:px-12 sm:py-4 px-10 py-4 mt-8 cursor-pointer">Get Started Now</button>
            </div>

            {/* ************************************************ */}

        </>
    )
}

export default Header