import React, { useRef, useState } from 'react'
import ProfilePopUp from './ProfilePopUp';
import { useSelector } from "react-redux";
import useOutsideClick from '../../hooks/UseOutsideClick';

const ProfilePopUpButton = () => {

  const data = useSelector(state => state.auth?.userData?.user)
  const [isOpen, setIsOpen] = useState(false);
  // This hook listens for outside click, and close the pop up modal
  const modalRef = useRef()
  useOutsideClick(modalRef, () => setIsOpen(false), isOpen);

  return (
    <div className="relative">
      <button
        className="mr-1 md:mr-1.5 mt-1 justify-center rounded-3xl bg-white items-center h-8 w-8 sm:h-10 md:w-9 md:h-9 sm:w-10 cursor-pointer lg:h-12 lg:w-12"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <img
          className="w-8 h-8 sm:h-8 sm:w-8 md:w-9 md:h-9 rounded-full object-cover lg:h-12 lg:w-12"
          // src='https://media.istockphoto.com/id/2149922267/vector/user-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=eftd9nEYQYSWX_yZsHtkoo47x5l_Jp_2b-J4iD1pGPY='
          src={data?.avatar || `https://media.istockphoto.com/id/2149922267/vector/user-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=eftd9nEYQYSWX_yZsHtkoo47x5l_Jp_2b-J4iD1pGPY=`}
          width="32"
          height="32"
          alt="User"
        />
      </button>

      {isOpen && <ProfilePopUp
        modalRef={modalRef}
        setIsOpen={setIsOpen}
      />}
    </div>
  )
}

export default ProfilePopUpButton