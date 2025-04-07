import React from 'react';
import { useForm } from 'react-hook-form';

const VideoDetails = ({videoFormData = {}, setVideoFormData, errors}) => {

  const { title, description } = videoFormData
  // const { register, formState: { errors },} = useForm();

  const handleChange = (e, item) => {
    setVideoFormData((prevState) => ({
      ...prevState,
      [item]: e.target.value
    }))
    console.log("Updated Form Data:", videoFormData);
  }

  return (
    <div className='max-w-5xl mx-auto text-white rounded-3xl shadow-xl overflow-hidden my-8'>
      <div className='flex flex-col md:flex-row gap-6 p-2'>

        {/* Left Side - Form */}
        <div className='md:w-[60%] border border-gray-600 rounded-2xl p-6 md:p-10 flex flex-col justify-center bg-[#282828]'>
          <form className="space-y-6">

                {/* Title (auto-resizing textarea) */}
                <div className='relative'>
                <textarea
                    placeholder="Title"
                    rows={1}
                    value={title}
                    onChange={(e) => handleChange(e, "title")}
                    onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    className="text-gray-300 pl-11 pr-4 py-3 h-24 min-h-[3.5rem] max-h-40 overflow-auto rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none"
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
                {errors.title && <p className="text-red-500 text-sm italic mt-1">{errors.title}</p>}
                </div>


                {/* Description */}
                <div className='relative'>
                <textarea
                    placeholder="Description"
                    onChange={(e) => handleChange(e, "description")}
                    value={description}
                    className="text-gray-300 py-3 pl-11 pr-4 h-48 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none"
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
                {errors.description && <p className="text-red-500 text-sm italic mt-1">{errors.description}</p>}
                </div>

          </form>
        </div>

        {/* Right Side - You can design this section later */}
        <div className='md:w-[40%] border border-gray-600 rounded-2xl flex flex-col items-center justify-center bg-[#282828] p-10 text-center'>
          <p className="text-gray-400">Right section content goes here</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
