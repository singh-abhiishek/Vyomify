import React from 'react';
import { FileText, Edit, NotebookText } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import RightSide from './RightSide';

const Step2 = () => {

  const { register, formState: { errors }, getValues, watch } = useFormContext();
  const currentValues = getValues()
  const thumbnail = currentValues?.thumbnail[0]
  const videoFile = currentValues?.videoFile[0]
  console.log("from step-2", videoFile)

  const titleValue = watch("title") || "";
  const descriptionValue = watch("description") || "";


  return (
    <div className='max-w-5xl  overflow-hidden '>
      <div className='flex flex-col justify-center items-center md:flex-row gap-2 sm:gap-8 p-6'>

        {/* Left Side - Form */}
        <div className='md:w-[60%] flex flex-col gap-3'>

          {/* Title */}
          <div className='relative'>
            <textarea
              placeholder="Title"
              maxLength={150}
              className="text-gray-300 pl-7 pr-4 py-2.5 h-23 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none text-sm"
              {...register("title", { required: "Title is required" })}
            />
            <FileText className=" absolute left-2 top-3  w-4 h-4 text-red-400" />
            <p className="text-gray-400 text-[11px]  text-right">
              {titleValue.length}/150
            </p>

            {errors.title && <p class="text-red-600 text-sm italic">
              {errors.title.message}
            </p>}
          </div>

          {/* Description */}
          <div className='relative'>
            <textarea
              placeholder="Description"
              maxLength={500}
              className="text-gray-300 pl-7 pr-4 py-2.5 h-30 sm:h-42 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none text-sm"
              {...register("description", { required: "Description is required" })}
            />
            <FileText className=" absolute left-2 top-3 w-4 h-4 text-red-400" />
            <p className="text-gray-400 text-[11px] text-right ">
              {descriptionValue.length}/500
            </p>

            {errors.description && <p class="text-red-600 text-sm italic">
              {errors.description.message}
            </p>}
          </div>

        </div>

        {/* Right Side */}
        <RightSide />

      </div>
    </div>
  );
};

export default Step2;
