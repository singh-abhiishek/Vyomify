import React, { useRef, useState } from 'react'
import UploadPopUp from './UploadPopUp';
import useOutsideClick from '../../hooks/UseOutsideClick';
import { FiPlus } from "react-icons/fi";

const UploadButton = () => {

  const [isOpen, setIsOpen] = useState(false);   // for upload video pop up
  // This hook listens for outside click, and close the pop up modal
  const modalRef = useRef()
  useOutsideClick(modalRef, () => setIsOpen(false), isOpen);

  const handleUploadPopUpData = () => {
    setIsOpen(false)
  }
  return (
    <div className="relative">
      <button
        className="inline-flex items-center gap-x-0.5 px-2 py-2 md:px-2  text-sm rounded-[50%] md:rounded-full bg-[#212121] cursor-pointer"
        // className="text-md rounded-3xl relative inline-flex items-center justify-center px-4 py-2.5 m-1 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white" 
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiPlus size={20}/>
        <span className="text-white text-[0px] sm:text-[13px] md:text-[15px] font-medium">Create</span>
      </button>

      {isOpen && <UploadPopUp modalRef={modalRef} sendDataToUploadButton={handleUploadPopUpData} />}

      
    </div>
  )
}

export default UploadButton