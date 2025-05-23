import React from 'react';
import FAQ from './Faq';
import HeroSection from './HeroSection';
import Footer from './Footer';

const HomePage = () => {
    return (
        <>
            <HeroSection />

            {/* Hero Section */}
            <section className="relative bg-[#0d0d0d] text-gray-100 min-h-[80vh] flex items-center justify-center px-8 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-rose-600 opacity-20 rounded-full blur-3xl z-0"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-700 opacity-10 rounded-full blur-2xl z-0"></div>

                <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 items-center gap-12">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl md:text-6xl font-bold text-rose-500 mb-6">Welcome to Video-Hub</h1>
                        <p className="text-lg text-gray-400 mb-8 max-w-md">
                            Stream. Upload. Connect. <span className="text-rose-400">Your world of videos</span> starts here.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="/signup" className="bg-rose-600 hover:bg-rose-500 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">Get Started</a>
                            <a href="/explore" className="bg-transparent border border-rose-600 hover:bg-rose-600 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">Explore</a>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <img src="/video-illustration.svg" alt="Video illustration" className="w-full max-w-md mx-auto drop-shadow-xl" />
                    </div>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                    Empowering creators • Lightning-fast uploads • Global audience
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-[#121212] text-gray-100 py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-500">Everything You Need</h2>
                    <p className="text-gray-400 mb-12">Our powerful tools help creators thrive.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 hover:border-rose-600 transition cursor-pointer">
                            <h3 className="text-xl font-semibold mb-2">🚀 Fast Streaming</h3>
                            <p className="text-sm text-gray-400">Enjoy ultra-fast video delivery powered by global CDN.</p>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 hover:border-rose-600 transition cursor-pointer">
                            <h3 className="text-xl font-semibold mb-2">🔐 Privacy First</h3>
                            <p className="text-sm text-gray-400">Complete control over visibility & privacy of your content.</p>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 hover:border-rose-600 transition cursor-pointer">
                            <h3 className="text-xl font-semibold mb-2">📈 Creator Analytics</h3>
                            <p className="text-sm text-gray-400">Understand your audience and grow faster with detailed insights.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="bg-[#0d0d0d] text-gray-100 py-20 px-6 text-center">
                <h2 className="text-3xl font-bold mb-6 text-rose-500">What Creators Say</h2>
                <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8">
                    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 hover:border-rose-600 transition cursor-pointer">
                        <p className="text-sm text-gray-300 italic">"Video-Hub changed my career. Uploads are fast and it’s just smooth!"</p>
                        <p className="mt-4 text-rose-500 font-semibold">— Arjun, Tech Creator</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 hover:border-rose-600 transition cursor-pointer">
                        <p className="text-sm text-gray-300 italic">"I finally found a platform that supports global creators equally."</p>
                        <p className="mt-4 text-rose-500 font-semibold">— Mia, Travel Vlogger</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-[#1a1a1a] text-gray-200 py-16 px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-rose-500 mb-4">Why Video-Hub?</h2>
                    <p className="text-lg mb-6">We empower creators and viewers with a seamless platform designed to inspire and connect. Built for speed, security, and style.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        <div>
                            <h3 className="text-xl font-bold text-gray-100 mb-2">🎥 Ultra-Fast Uploads</h3>
                            <p className="text-sm text-gray-300">Upload your videos in seconds, no lag, no limits.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-100 mb-2">🔒 Secure Platform</h3>
                            <p className="text-sm text-gray-300">Your content, fully protected with top-grade encryption.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-100 mb-2">🌍 Global Reach</h3>
                            <p className="text-sm text-gray-300">Reach an audience from every corner of the world.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mid Quote */}
            <section className="bg-[#0d0d0d] text-gray-100 py-20 px-8 text-center">
                <blockquote className="text-xl md:text-2xl max-w-4xl mx-auto font-semibold text-rose-500 italic">
                    “Creativity belongs to everyone. Video-Hub makes sure your voice is heard, loud and clear.”
                </blockquote>
            </section>

            {/* CTA Section */}
            <section className="bg-rose-600 text-white py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Go Viral?</h2>
                <p className="mb-6 text-lg">Join thousands of creators making waves every day.</p>
                <a href="/signup" className="bg-white text-rose-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition duration-300 shadow-lg">Sign Up Free</a>
            </section>

            {/* Stats Banner */}
            <div className="w-full bg-[#121212] flex flex-col sm:py-14 py-8 items-center justify-center">
                <p className="text-rose-500 font-bold md:text-[50px] text-[26px] text-center">Connect your thoughts</p>
                <p className="text-gray-100 font-bold sm:text-[18px] text-[12px] text-center capitalize mt-4">people have ALREADY signed up across the globe</p>
                <button className="bg-rose-600 hover:bg-rose-700 text-white sm:px-12 sm:py-4 px-10 py-4 mt-8 rounded-lg font-medium transition duration-300 shadow-lg">Get Started Now</button>
            </div>

            {/* Newsletter Signup */}
            <section className="bg-[#0d0d0d] py-12 px-6 text-center text-gray-100">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-gray-400 mb-6">Join our newsletter and get the latest updates in your inbox.</p>
                <form className="max-w-md mx-auto flex gap-2">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] text-gray-100 border border-gray-700 focus:border-rose-600 outline-none"
                    />
                    <button type="submit" className="bg-rose-600 hover:bg-rose-700 px-6 rounded-lg text-white font-medium transition duration-300 shadow-md">Subscribe</button>
                </form>
            </section>

            {/* FAQ Section */}
            <FAQ />

            {/* Footer */}
            <Footer />
            <footer className="bg-[#121212] text-gray-400 py-10 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h4 className="text-rose-500 font-bold text-xl mb-2">Video-Hub</h4>
                        <p className="text-sm">© 2025 Video-Hub, Inc. All rights reserved.</p>
                    </div>
                    <nav className="flex gap-8">
                        <a href="/about" className="hover:text-rose-400 cursor-pointer">About</a>
                        <a href="/contact" className="hover:text-rose-400 cursor-pointer">Contact</a>
                        <a href="/terms" className="hover:text-rose-400 cursor-pointer">Terms</a>
                        <a href="/privacy" className="hover:text-rose-400 cursor-pointer">Privacy</a>
                    </nav>
                </div>
            </footer>
        </>
    );
};

export default HomePage;
