import React from "react";
import { LeftSideBarProvider } from "./SideBarContext";
import { StepFormProvider } from "./StepFormContext";
import { TweetFormProvider } from "./TweetFormContext";
import { PlaylistModalProvider } from "./PlaylistModalContext ";

const AppProvider = ({ children }) => {
  return (
    <LeftSideBarProvider>
      <StepFormProvider>
        <TweetFormProvider >
          <PlaylistModalProvider>
            {children}
          </PlaylistModalProvider>
        </TweetFormProvider>
      </StepFormProvider>
    </LeftSideBarProvider>
  );
};

export default AppProvider;
