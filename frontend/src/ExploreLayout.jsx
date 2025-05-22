import React, { useEffect } from "react";
import { LeftSidebar } from "../src/components/index.js";
import { Outlet, } from "react-router-dom";
import { useStepForm } from "./contextAPI/StepFormContext.jsx";
import StepFormLayout from "./components/publishVideo/StepFormLayout.jsx";
import { useTweetForm } from "./contextAPI/TweetFormContext.jsx";
import TweetForm from "./components/tweet/TweetForm.jsx";
import { useLeftSideBar } from "./contextAPI/SideBarContext.jsx";
import ScrollToTop from "./utils/scrollToTop.jsx";

const ExploreLayout = () => {


    const { isStepFormOpen } = useStepForm()
    const { isTweetFormOpen } = useTweetForm()

    const { isLeftBarOpen } = useLeftSideBar()
    return (
        // bg-[#0F0F0F]
        <div className="flex h-full bg-black text-white">

            {/* Sidebar - already working fine */}
            <div className="w-[250px] shrink-0 fixed top-13 left-0 h-[calc(100vh-4rem)] z-40"
                style={{ pointerEvents: isLeftBarOpen ? 'auto' : 'none' }}
            >
                <LeftSidebar />
            </div>

            {/* Main content wrapper */}
            {isStepFormOpen && <StepFormLayout />}
            {isTweetFormOpen && <TweetForm />}
            
            <div className="ml-[63px] flex-1 flex flex-col overflow-hidden h-[calc(100vh-4rem)] ">
                {/* Scrollable content area */}
                <div className="scrollable-content flex-1 overflow-y-auto w-full p-2 ">
                    <ScrollToTop />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ExploreLayout