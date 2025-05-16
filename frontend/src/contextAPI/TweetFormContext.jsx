
import { createContext, useContext, useState } from "react";

const TweetFormContext = createContext();

export const TweetFormProvider = ({children}) => {
    const [isTweetFormOpen, setIsTweetFormOpen] = useState(false)
    const toggleTweetForm = () => setIsTweetFormOpen((prev) => !prev);
    
    return (
        <TweetFormContext.Provider value={{isTweetFormOpen, toggleTweetForm}}>
            {children}
        </TweetFormContext.Provider>
    )
}

export const useTweetForm = () => {
    const context = useContext(TweetFormContext)
    if(!context){
        throw new Error("useTweetForm must be used inside a TweetFormProvider");
    }
    return context;
}