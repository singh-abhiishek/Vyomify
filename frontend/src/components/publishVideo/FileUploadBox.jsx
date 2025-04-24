import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

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
      className={`w-1/2 border-1 rounded-2xl flex flex-col items-center justify-center border-gray-500 p-10 text-center cursor-pointer transition-all ${
        isDragging ? "bg-gray-800" : ""
      }`}
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
        className= {`size-28 rounded-full flex items-center justify-center
             bg-[#1f1f1f] border border-gray-700
             hover:border-red-500 hover:shadow-[0_0_10px_2px_rgba(239,68,68,0.3)]
             transition-all duration-300 ease-in-out
             text-gray-300 hover:text-white`}
      >
        {type === "image" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-image"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <path d="m21 15-5-5L5 21"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-upload"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" x2="12" y1="3" y2="15"></line>
          </svg>
        )}
      </div>

      <p className="text-lg font-semibold">Drag & Drop a {type} to upload</p>
      <p className="text-sm text-gray-400">
        {type === "image" ? "JPEG, PNG" : "MP4, MOV"} formats only.
      </p>

      {/* Select button */}
      <button
        type="button"
        className="text-md mt-2 rounded-lg relative inline-flex items-center justify-center px-4 py-1.5 m-1 cursor-pointer
        border border-red-500 bg-[#2c2c2c] hover:bg-[#3a3a3a] text-red-400 shadow-sm
        active:border-red-600 active:text-red-500"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
      >
        Select {label}
      </button>

      {/* File preview */}
      {file && (
        <div className="mt-3 text-sm text-gray-300">
          <p>
            Selected {label}: <span className="font-semibold">{file.name}</span>
          </p>
        </div>
      )}

      {/* Error */}
      {errors?.[name] && <p class="text-red-600 text-sm italic">
          {errors[name].message}
      </p>}
    </div>
  );
};

export default FileUploadBox;
