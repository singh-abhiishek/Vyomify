import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Header, Signup, Login} from './components/index.js'
import VerifyEmailWithOtp from './pages/VerifyEmailWithOtp.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import UploadProfileImages from './pages/UploadProfileImages.jsx'
import ExplorePage from './pages/ExplorePage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App/>}>
      <Route path='' element={<Header/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='verify-Email' element={<VerifyEmailWithOtp/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='upload-Profile-Images' element={<UploadProfileImages/>}/>
      <Route path='explore-Page' element={<ExplorePage/>}/>
      <Route path='reset-Password' element={<ResetPassword/>}/>
    </Route>
      
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
