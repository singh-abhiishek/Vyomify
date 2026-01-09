import React from 'react'
import { showToastMessage } from '../utils/showToaster.jsx'
import { useLoginMutation } from '../store/slices/userApiSlice.js'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../store/slices/authSlice.js'
import { Link, useNavigate } from 'react-router-dom'


const TryGuestAsLogin = () => {

    const [login] = useLoginMutation()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // guest login
    const handleGuestLogin = async (e) => {
        e.preventDefault();
        try {
            showToastMessage("Let me find you... Stay cool. 😎", "info")
            const userData = await login({
                email: "abhi.project.showcase@gmail.com",
                password: "Project!1"
            }).unwrap()

            if (userData.success) {
                // console.log(userData.data)
                dispatch(storeLogin(userData.data))
                showToastMessage("Logged in as Guest! Enjoy exploring Vyomify", "success")
                setTimeout(() => { // because dispatch take sometime to update the authStatus in store, explore-page required authentication that's why some delay
                    navigate('/explore')
                }, 100);
            }
        } catch (error) {
            console.log(error)
            if (error.status === 401) {
                showToastMessage(error.response?.data?.message || "Request failed!", "error");
            }
            else showToastMessage(error.response?.data?.message || "Request failed!", "error");
        }
    }

  return (
    <div className='mt-3 sm:mt-4 text-center'>
        <button
            onClick={(e) => handleGuestLogin(e)}
            type='button'
            className="bg-neutral-900 border border-red-400 text-red-400 px-1.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium hover:border-red-500 hover:text-red-400 transition-colors duration-200 cursor-pointer animate-pulse">
            Try as Guest Login
        </button>
    </div>
  )
}

export default TryGuestAsLogin;