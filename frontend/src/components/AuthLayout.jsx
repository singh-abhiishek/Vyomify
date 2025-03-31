import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, isPageVisible = true, isAuthenticationRequired = true}){

    const authStatus = useSelector(state => state.auth.isUserAuthenticated)
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if(isAuthenticationRequired && authStatus !== isAuthenticationRequired){
            // user login nhi hai to content mt dikhao
           navigate('/login')
        }
        else if(!isAuthenticationRequired && authStatus !== isAuthenticationRequired){
            // user login hai to login, signup page mt dikhao
           navigate('/')
        }
        setLoader(false)
    }, [authStatus, navigate, isAuthenticationRequired])

    // TODO: <>Loading...</> Loading ko text k jgh kuch aur loader dikhao
  return loader ? <>Loading...</> : <>{children}</> 
}
