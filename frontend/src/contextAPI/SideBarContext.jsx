import { createContext, useContext, useState   } from "react";

const LeftSideBarContext = createContext();

export const LeftSideBarProvider = ({children}) => {
    const [isLeftBarOpen, setIsLeftBarOpen] = useState(false)
    const toggleLeftbar = () => setIsLeftBarOpen((prev) => !prev);

    return (
        <LeftSideBarContext.Provider value={{isLeftBarOpen, toggleLeftbar}}>
            {children}
        </LeftSideBarContext.Provider>
    )
}

export const useLeftSideBar = () => {
    const context = useContext(LeftSideBarContext)
    if(!context){
        throw new Error("useLeftSideBar must be used inside a leftSideBarProvider");
    }
    return context
}