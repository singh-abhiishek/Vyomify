import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Image, Video } from "lucide-react";

const FileUploadBox = ({ type, name, label, accept }) => {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const file = watch(name)?.[0];

  const validateFileType = (file) => {
    if (!file) return false;
    const acceptedTypes = accept?.split(",").map((t) => t.trim());
    return acceptedTypes.includes(file.type);
  };

  const handleFile = (file) => {
    if (file && validateFileType(file)) {
      setValue(name, [file], { shouldValidate: true });
      trigger(name);
    } else {
      setValue(name, [], { shouldValidate: true });
      trigger(name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  return (
    <div
      className={`w-full  sm:w-3/4 md:w-2/3 lg:w-1/2 border rounded-2xl flex flex-col items-center justify-center 
    border-gray-500 p-4 sm:p-7 text-center cursor-pointer transition-all 
    ${isDragging ? "bg-gray-800" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          fileInputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* Hidden input for manual + drag & drop */}
      <input
        ref={fileInputRef}
        id={`${name}Input`}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {/* Hidden input for RHF validation */}
      <input
        type="hidden"
        {...register(name, {
          required: `${label} is required`,
          validate: (files) =>
            files?.length > 0 && validateFileType(files[0]) || `Please upload a valid ${label}`,
        })}
      />

      {/* Icon */}
      <div
        className={`w-20 h-20 sm:w-24 sm:h-24 md:size-28 rounded-full flex items-center justify-center
      bg-[#1f1f1f] border border-gray-700
      hover:border-red-500 hover:shadow-[0_0_10px_2px_rgba(239,68,68,0.3)]
      transition-all duration-300 ease-in-out
      text-gray-300 hover:text-white`}
      >
        {type === "image" ? (
          <Image className="w-7 h-7 text-red-400" />
        ) : (
          <Video className="w-7 h-7 text-red-400" />
        )}
      </div>

      <p className="text-base sm:text-md font-semibold mt-2">Drag & Drop a {type} to upload</p>
      <p className="text-xs sm:text-xs text-gray-400">
        {type === "image" ? "JPEG, PNG" : "MP4, MOV"} formats only.
      </p>

      {/* Select button */}
      <button
        type="button"
        className="text-sm mt-2 rounded-lg px-4 py-1.5 border border-red-500 bg-[#2c2c2c] 
      hover:bg-[#3a3a3a] text-red-400 shadow-sm
      active:border-red-600 active:text-red-500 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
      >
        Select {label}
      </button>

      {/* File preview */}
      {file && (
        <div className="mt-3 text-xs sm:text-xs text-gray-400">
          <p>
            Selected {label}: <span className="font-semibold">{file.name}</span>
          </p>
        </div>
      )}

      {/* Error */}
      {errors?.[name] && (
        <p className="text-red-600 text-sm italic mt-1">
          {errors[name].message}
        </p>
      )}
    </div>

  );
};

export default FileUploadBox;
