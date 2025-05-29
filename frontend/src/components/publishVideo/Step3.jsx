import React from 'react'
import { useFormContext } from "react-hook-form";
import { Globe, Lock, Info, Image as ImageIcon } from "lucide-react"
import RightSide from './RightSide';

const Step3 = () => {

  const { register, getValues } = useFormContext();
  const currentValues = getValues(); // Get all current values of stepper form
  // console.log("from Step3 form checking curr values", currentValues)
  // console.log('Thumbnail:', currentValues.title);
  // console.log('Type:', typeof currentValues.title);

  return (
    <div className='max-w-5xl mx-auto  text-white rounded-3xl overflow-hidden sm:my-8'>

      <div className='flex flex-col md:flex-row gap-2 sm:gap-6 p-2'>

        {/* Left Side - Form */}
        <div className="md:w-[60%] p-4 md:p-4 bg-[#282828] text-white rounded-2xl border border-gray-700">
          <p className='text-red-600 font-amaranth font-bold text-2xl'>
            Video Visibility
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Choose when to publish and who can see your video
          </p>

          {/* Visibility Options */}
          <div className="flex flex-col gap-2">
            {/* Public Option */}
            <label className="flex items-center gap-3 p-2 border border-gray-700 rounded-lg cursor-pointer hover:bg-[#212121] transition text-sm">
              <input
                type="radio"
                value="public"
                {...register("isPublished")}
                className="form-radio accent-red-500 cursor-pointer"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <p className="font-medium text-md text-white">Public</p>
                  <Globe size={15} className="text-red-400" />
                </div>
                <p className="text-gray-400 text-xs">Anyone can view</p>
              </div>
            </label>

            {/* Private Option */}
            <label className="flex items-center gap-3 p-2 border border-gray-700 rounded-lg cursor-pointer hover:bg-[#212121] transition text-sm">
              <input
                type="radio"
                value="private"
                {...register("isPublished")}
                className="form-radio accent-red-500 cursor-pointer"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <p className="font-medium text-md text-white">Private</p>
                  <Lock size={15} className="text-red-400" />
                </div>
                <p className="text-gray-400 text-xs">Only you can view</p>
              </div>
            </label>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gray-700 my-3" />

          {/* Tip Box */}
          <div className="flex items-start gap-2 bg-[#282828] border border-gray-600 p-3 rounded-lg text-xs text-gray-400">
            <Info size={16} className="text-red-500 mt-0.5" />
            <p>
              You can change visibility settings anytime later in the dashboard.
            </p>
          </div>

        </div>


        {/* Right Side - You can design this section later */}
        {/* <div className='md:w-[40%] border border-gray-600 rounded-2xl flex flex-col items-center justify-center bg-[#282828] p-10 text-center'>
          <p className="text-gray-400">Right section content goes here</p>
        </div> */}

        <RightSide />
      </div>
    </div>
  )
}

export default Step3



