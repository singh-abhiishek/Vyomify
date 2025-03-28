import Input from './Input'
import React, { useRef, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

const OtpInput = ({length = 6, onSubmit}) => {
    length = Number(length)
    const { control, handleSubmit, setValue, getValues } = useForm()
    
    const inputRefs = useRef([])
    
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);


    const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) { 
        setValue(`otp.${index}`, value);
        if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        }
    }
    };

    const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !getValues(`otp.${index}`) && index > 0) {
        inputRefs.current[index - 1]?.focus();
    }
    };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0px 6px"
            }}
        >
            {
                [...Array(length)].map(( _, index) => (
                    <Controller
                        key={index}
                        name={`otp.${index}`}
                        control={control}
                        defaultValue=""
                        render={({field}) => (  
                            <Input 
                                {...field}
                                type="text"
                                inputMode="numeric"
                                placeholder="-" 
                                autocomplete="off"
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-[40px] ml-2 lg:w-[60px] border-0 bg-[#FCDBD5] rounded-full dark:text-gray-300 text-richblack-5 aspect-square text-center focus:border-0 dark:bg-[#1a1a1a] focus:outline-2 focus:outline-red-600"
                                style={{boxShadow: "rgba(255, 255, 255, 0.18) 0px -1px 0px inset"
                            }}
                            />
                        )}
                    />
                ))
            }
        </div>
        <button 
            type="submit" 
            className="text-md rounded-lg relative inline-flex items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white w-full mt-8"
        >
            Sign Up
        </button>
    </form>
  )
}

export default OtpInput