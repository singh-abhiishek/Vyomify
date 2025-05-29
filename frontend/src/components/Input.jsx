import React, { useId } from "react";


const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props
    },
    ref 
){
    const id = useId();
    return(
        <div className="">
            { label && <label
                htmlFor={id}
            >
                {label}
                </label>
            }

            <input 
                type={type}
                id = {id}
                ref = { ref }
                className= {className}
                { ... props }
            />
        </div>
    )
})

export default Input