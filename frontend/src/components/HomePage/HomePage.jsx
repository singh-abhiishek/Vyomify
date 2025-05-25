import React from "react";
import { useSelector } from 'react-redux';
import FAQ from "./Faq";
import Footer from "./Footer";
import JoinCommunitySection from "./JoinCommunitySection";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import ScreensCarousel from "./ScreensCarousel ";

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
