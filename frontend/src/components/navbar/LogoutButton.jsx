import React from 'react'
import {useDispatch} from 'react-redux'
import {logout as storeLogout} from '../../store/slices/authSlice.js'
import axios from 'axios'
import Button from '../ui/button.jsx'

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
    
    const btnName = "Logout"
   
  return (

    <Button 
    onClick={logoutHandler}
    btnName = {btnName}
    />
  )
}

export default LogoutButton