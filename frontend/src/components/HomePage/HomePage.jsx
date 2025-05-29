import React from "react";
import { useSelector } from 'react-redux';
import FAQ from "./FAQ.jsx";
import Footer from "./Footer.jsx";
import JoinCommunitySection from "./JoinCommunitySection,jsx";
import HeroSection from "./HeroSection.jsx";
import StatsSection from "./StatsSection.jsx";
import ScreensCarousel from "./ScreensCarousel.jsx";

export default function Homepage() {

    const isLoggedIn = useSelector(state => state?.auth?.isUserAuthenticated)
    return (
        <div className=" text-white w-full ">
            {/* Hero Section */}
            <HeroSection isLoggedIn={isLoggedIn} />

            <ScreensCarousel />
            
            {/* Call To Action */}
            <JoinCommunitySection />

            {/* Stats Section */}
            <StatsSection />

            {/* FAQs Section */}
            <FAQ />

            {/* Footer */}
            <Footer />
        </div>
    );
}
