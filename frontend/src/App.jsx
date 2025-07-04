import './App.css'
import React from "react"
import { Navbar } from "./components"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <ToastContainer />
      <Navbar /> {/* fixed navbar */}

      <div className="pt-13">
        <Outlet />
      </div>
    </>
  )
}

export default App
