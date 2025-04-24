import React from 'react'
import { useFormContext } from "react-hook-form";

const Step3 = () => {
    const { register, } = useFormContext();

  return (
    <div className='max-w-5xl mx-auto h-[410px] text-white rounded-3xl shadow-xl overflow-hidden my-8'>
        
        <div className='flex flex-col md:flex-row gap-6 p-2'>

        {/* Left Side - Form */}
        <div className='md:w-[60%] border border-gray-600 rounded-2xl p-4 md:p-10 flex flex-col justify-center bg-[#282828]'>
            <p className='p-2'>Choose when to publish and who can see your video</p>
                    
            <div className='relative'>
                <label className="flex items-center gap-1">
                <input
                  type="radio"
                  value="public"
                  {...register("isPublished")}
                />
                    Public
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="private"
                    {...register("isPublished")}
                  />
                    Private
                </label>
            </div>

        </div>

        {/* Right Side - You can design this section later */}
        <div className='md:w-[40%] border border-gray-600 rounded-2xl flex flex-col items-center justify-center bg-[#282828] p-10 text-center'>
            <p className="text-gray-400">Right section content goes here</p>
        </div>
        </div>
  </div>
  )
}

export default Step3







// **************************************************************
// import React from 'react'

// const PublishStatusForm = ({ videoFormData = {}, setVideoFormData }) => {

//     const { isPublished } = videoFormData

//     const handleChange = (e) => {
//         setVideoFormData((prevState) => ({
//             ...prevState,
//             isPublished: e.target.name === "public"
//         }))
//         console.log(videoFormData)
//     }

//   return (
//     <div className='max-w-5xl mx-auto text-white rounded-3xl shadow-xl overflow-hidden my-8'>
        
//         <div className='flex flex-col md:flex-row gap-6 p-2'>

//         {/* Left Side - Form */}
//         <div className='md:w-[60%] border border-gray-600 rounded-2xl p-4 md:p-10 flex flex-col justify-center bg-[#282828]'>
//             <p className='p-2'>Choose when to publish and who can see your video</p>
                    
//             <div className='relative'>
//                 <label className="flex items-center gap-1">
//                     <input
//                     type="radio"
//                     name="public"
//                     checked={isPublished === true}
//                     onChange={handleChange}
//                     />
//                     Public
//                 </label>
                
//                 <label className="flex items-center gap-1">
//                     <input
//                     type="radio"
//                     name="private"
//                     checked={isPublished === false}
//                     onChange={handleChange}
//                     />
//                     Private
//                 </label>
//             </div>

//         </div>

//         {/* Right Side - You can design this section later */}
//         <div className='md:w-[40%] border border-gray-600 rounded-2xl flex flex-col items-center justify-center bg-[#282828] p-10 text-center'>
//             <p className="text-gray-400">Right section content goes here</p>
//         </div>
//         </div>
//   </div>
//   )
// }

// export default PublishStatusForm