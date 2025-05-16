import React from "react";
import FileUploadBox from "./FileUploadBox";

const Step1 = () => {
  
  return (
    <div className="mx-auto bg-[#282828] text-white rounded-3xl flex flex-col gap-2.5">
      {/* <div className="flex items-center justify-center">
        <p className="text-lg font-semibold">Upload Image & Video</p>
      </div> */}

      <div className="flex flex-col sm:flex-row gap-7 p-12">
        <FileUploadBox type="image" name="thumbnail" label="Thumbnail" accept="image/png,image/jpeg,image/jpg" />
        <FileUploadBox type="video" name="videoFile" label="Video File" accept="video/mp4,video/mov,video/webm" />
      </div>

      {/* <p className="mt-4 text-xs text-left text-gray-400 px-6 pb-4">
        By submitting your video to YouTube, you acknowledge that you agree to YouTube's {" "}
        <a href="https://www.youtube.com/t/terms" target="_blank" className="text-blue-400">Terms of Service</a> and {" "}
        <a href="https://www.youtube.com/yt/about/policies/" target="_blank" className="text-blue-400">Community Guidelines</a>.
      </p> */}
    </div>
  );
};

export default Step1;



























// ******************************************************************************
// import React, { useState } from "react";

// const UploadVideo = ({videoFormData = {}, setVideoFormData, errors }) => {
  
//   const { videoFile, thumbnail } = videoFormData

//   const handleFileChange = (event, type) => {
//     const selectedFile = event.target.files[0];
//     processFile(selectedFile, type);
//   };

//   const handleDrop = (event, type) => {
//     event.preventDefault();
//     event.stopPropagation();

//     const droppedFile = event.dataTransfer.files[0];
//     processFile(droppedFile, type);
//   };

//   const processFile = (selectedFile, type) => {
//     if (!selectedFile) return;

//     if (type === "video") { 
//       console.log("setVideoFormData is:", setVideoFormData);
//       setVideoFormData((prevState) => ({
//         ...prevState, 
//         videoFile: selectedFile
//       }))
//     } else {
//       setVideoFormData((prevState) => ({
//         ...prevState,
//         thumbnail: selectedFile
//       }))
//     }

//   };

//   return (
//     <div className="mx-auto bg-[#282828] text-white rounded-3xl shadow-lg flex flex-col gap-2.5">
//       {/* Header */}
//       <div className="flex items-center justify-center ">
//         <p className="text-lg font-semibold">Upload Image & Video</p>
//       </div>

//       {/* Drag and Drop Areas */}
//       <div className="flex gap-7  p-12">
//         {/* Left Side - Image Upload */}
//         <div
//           className="w-1/2 border-1 rounded-2xl flex flex-col items-center justify-center border-gray-500 p-10 text-center cursor-pointer"
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={(e) => handleDrop(e, "image")}
//         >
//           {/* Clickable SVG Icon */}
//           <label htmlFor="imageInput" className="cursor-pointer">
//             <div className="rounded-full bg-[#1F1F1F] size-28 flex items-center justify-center border-2 border-gray-700 hover:border-green-500 transition-all duration-300">
//               <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image">
//                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//                 <circle cx="8.5" cy="8.5" r="1.5"></circle>
//                 <path d="m21 15-5-5L5 21"></path>
//               </svg>
//             </div>
//           </label>

//           <p className="text-lg font-semibold">Drag & Drop an image to upload</p>
//           <p className="text-sm text-gray-400">JPEG, PNG formats only.</p>

//           <label htmlFor="imageInput" className="bg-green-600 text-center py-2 px-6 mt-4 rounded-3xl cursor-pointer hover:bg-green-700 inline-block">
//             Select Image
//           </label>

//           <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} className="hidden" id="imageInput" />

//           {thumbnail && (
//             <div className="mt-3 text-sm text-gray-300">
//               <p>Selected Image: <span className="font-semibold">{thumbnail.name}</span></p>
//             </div>
//           )}

//           { errors?.thumbnail &&  <div className="mt-3 p-2 bg-red-600 text-white text-sm rounded text-center">⚠ {errors?.thumbnail}</div>} 
//         </div>

//         {/* Right Side - Video Upload */}
//         <div
//           className="w-1/2 border-1 rounded-2xl flex flex-col items-center justify-center border-gray-500 p-10 text-center cursor-pointer"
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={(e) => handleDrop(e, "video")}
//         >
//           {/* Clickable SVG Icon */}
//           <label htmlFor="videoInput" className="cursor-pointer">
//             <div className="rounded-full bg-[#1F1F1F] size-28 flex items-center justify-center border-2 border-gray-700 hover:border-blue-500 transition-all duration-300">
//               <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload">
//                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                 <polyline points="17 8 12 3 7 8"></polyline>
//                 <line x1="12" x2="12" y1="3" y2="15"></line>
//               </svg>
//             </div>
//           </label>

//           <p className="text-lg font-semibold">Drag & Drop a video to upload</p>
//           <p className="text-sm text-gray-400">MP4, MOV formats only.</p>

//           <label htmlFor="videoInput" className="bg-blue-600 text-center py-2 px-6 mt-4 rounded-3xl cursor-pointer hover:bg-blue-700 inline-block">
//             Select Video
//           </label>

//           <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, "video")} className="hidden" id="videoInput" />

//           {videoFile && (
//             <div className="mt-3 text-sm text-gray-300">
//               <p>Selected Video: <span className="font-semibold">{videoFile.name}</span></p>
//             </div>
//           )}

//           { errors?.videoFile &&  <div className="mt-3 p-2 bg-red-600 text-white text-sm rounded text-center">⚠ {errors?.videoFile}</div>} 
//         </div>
//       </div>

//       {/* Error Message */}
//       {/* */}

//       {/* Navigation Buttons
//       <div className="flex items-center gap-7 justify-center mt-4">
//         <button className="border p-2 text-center py-2 px-6 rounded-3xl cursor-pointer hover:bg-gray-700">Back</button>
//         <button className="border p-2 text-center py-2 px-6 rounded-3xl cursor-pointer hover:bg-gray-700">Next</button>
//       </div> */}

//       {/* Disclaimer */}
//       <p className="mt-4 text-xs text-left text-gray-400">
//         By submitting your video to YouTube, you acknowledge that you agree to YouTube's{" "}
//         <a href="https://www.youtube.com/t/terms" target="_blank" className="text-blue-400">Terms of Service</a>{" "}
//         and{" "}
//         <a href="https://www.youtube.com/yt/about/policies/" target="_blank" className="text-blue-400">Community Guidelines</a>.
//       </p>
//     </div>
//   );
// };

// export default UploadVideo;
