import './App.css'
import React from "react"
import { Navbar } from "./components"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div>
      <ToastContainer position="top-center" />
      <Navbar/>
      <Outlet /> 
    </div>
  )
}

export default App
