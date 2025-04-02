import React, {useState} from 'react'
import ProfilePopUp from './ProfilePopUp';

const ProfilePopUpButton = () => {

  const [isOpen, setIsOpen] = useState(false);
  const handleProfilePopUpData = (data) => {
    setIsOpen(false)
  }
  return (
    <div className="relative">
        <button
            className="inline-flex justify-center rounded-3xl bg-white items-center group h-12 w-12 cursor-pointer"
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
        >
            <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://media.istockphoto.com/id/2149922267/vector/user-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=eftd9nEYQYSWX_yZsHtkoo47x5l_Jp_2b-J4iD1pGPY="
            width="32"
            height="32"
            alt="User"
            />
        </button>

        {isOpen && <ProfilePopUp sendDataToProfileButton = {handleProfilePopUpData}/>} 
    </div>
  )
}

export default ProfilePopUpButton