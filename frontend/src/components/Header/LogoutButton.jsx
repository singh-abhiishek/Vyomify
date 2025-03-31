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
    className="text-md rounded-lg relative inline-flex items-center justify-center px-4 py-2.5 m-1 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white" >
        <span class="relative">Logout</span>
    </button>
  )
}

export default LogoutButton