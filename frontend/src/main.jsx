import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store, {persistor} from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { PersistGate } from "redux-persist/integration/react"

import {
  Header, 
  Signup, 
  Login,
  AuthLayout
} from './components/index.js'

import {
  VerifyEmailWithOtp, 
  ResetPassword, 
  UploadProfileImages, 
  ExplorePage
} from './pages/index.js'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App/>}>
      <Route path='' element={<Header/>}/>

      <Route 
      path='signup' 
      element={<AuthLayout isAuthenticationRequired = {false}> <Signup/> </AuthLayout>}/>

      <Route path='verify-Email' element={<VerifyEmailWithOtp/>}/> 

      <Route 
      path='login' 
      element={<AuthLayout isAuthenticationRequired = {false}> <Login/> </AuthLayout>}/>

      <Route path='upload-Profile-Images' element={<UploadProfileImages/>}/>

      <Route path='explore-Page'
      element={<AuthLayout isAuthenticationRequired> <ExplorePage/> </AuthLayout>}/>

      <Route path='reset-Password' element={<ResetPassword/>}/>
    </Route>
      
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router = {router}/>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
