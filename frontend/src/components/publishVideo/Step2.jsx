import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step2 = () => {

  const { register, formState: { errors } } = useFormContext();

  return (
    <div className='max-w-5xl mx-auto text-white rounded-3xl shadow-xl overflow-hidden my-8'>
      <div className='flex flex-col md:flex-row gap-6 p-2'>

        {/* Left Side - Form */}
        <div className='md:w-[60%] border border-gray-600 rounded-2xl p-6 md:p-10 flex flex-col justify-center bg-[#282828]'>
          <div className="space-y-6">

                {/* Title (auto-resizing textarea) */}
                <div className='relative'>
                <textarea
                    placeholder="Title"
                    rows={1}
                    onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    className="text-gray-300 pl-11 pr-4 py-3 h-24 min-h-[3.5rem] max-h-40 overflow-auto rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none"
                    {...register("title", 
                      { required: "Title is required" },
                    )}
                />

                <svg xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-4 top-4 w-5 h-5 stroke-gray-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M4 6h16"></path>
                    <path d="M4 12h16"></path>
                    <path d="M4 18h16"></path>
                </svg>
                {errors.title && <p class="text-red-600 text-sm italic">
                  {errors.title.message}
                </p>}
                </div>
                


                {/* Description */}
                <div className='relative'>
                <textarea
                    placeholder="Description"
                    className="text-gray-300 py-3 pl-11 pr-4 h-48 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none"
                    {...register("description", { required: "Description is required" })}
                />
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-4 top-4 w-5 h-5 stroke-gray-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 4h14"></path>
                    <path d="M5 8h14"></path>
                    <path d="M5 12h10"></path>
                    <path d="M5 16h7"></path>
                </svg>

                {errors.description && <p class="text-red-600 text-sm italic">
                  {errors.description.message}
                </p>}
                </div>
          </div>
        </div>

        {/* Right Side - You can design this section later */}
        <div className='md:w-[40%] border border-gray-600 rounded-2xl flex flex-col items-center justify-center bg-[#282828] p-10 text-center'>
          <p className="text-gray-400">Right section content goes here</p>
        </div>
      </div>
    </div>
  );
};

export default Step2;
