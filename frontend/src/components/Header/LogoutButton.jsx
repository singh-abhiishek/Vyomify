import React from 'react'
import {useDispatch} from 'react-redux'
// import authService from '../../appwrite/auth.js'
import {logout as storeLogout} from '../../store/slice/authSlice.js'
import axios from 'axios'

function LogoutButton() {
    
    const dispatch = useDispatch()
    const logoutHandler = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/users/logout`,
                {},
                { withCredentials: true }  // Cookies backend tak jayengi
            );
            dispatch(storeLogout()); // Logout Redux state update karega
          } catch (error) {
            console.error("Logout failed:", error);
          }
    }

   
  return (
    <button 
      onClick={logoutHandler}
      type='button' 
      className="font-medium flex items-center px-2 hover:bg-[#212121] hover:dark:bg-dark_40 w-full py-2 rounded-lg" >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-log-out stroke-gray-400 flex-shrink-0 h-5 w-5"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" x2="9" y1="12" y2="12"></line>
      </svg>
      <span className="text-sm ml-2">Log Out</span>
    </button>

  )
}

export default LogoutButton