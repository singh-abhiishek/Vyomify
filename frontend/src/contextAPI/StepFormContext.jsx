// to open step form layout using cross button from uploadPopUp
// sync UploadPopUp.jsx with StepFormLayout.jsx

import { createContext, useContext, useState } from "react";

const StepFormContext = createContext();

export const StepFormProvider = ({children}) => {
    const [isStepFormOpen, setIsStepFormOpen] = useState(false)
    const toggleStepForm = () => setIsStepFormOpen((prev) => !prev);
    
    return (
        <StepFormContext.Provider value={{isStepFormOpen, toggleStepForm}}>
            {children}
        </StepFormContext.Provider>
    )
}

export const useStepForm = () => {
    const context = useContext(StepFormContext)
    if(!context){
        throw new Error("useStepForm must be used inside a StepFormProvider");
    }
    return context;
}