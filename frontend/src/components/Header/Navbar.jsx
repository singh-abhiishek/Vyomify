import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {LogoutButton} from "../index"

const Navbar = () => {
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.isUserAuthenticated)

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        },
        {
          name: "About",
          slug: "/about",
          active: true,
        },
        {
          name: "Explore",
          slug: "/explore-page",
          active: authStatus,
        }
      ]

  return (
    <nav className="bg-white dark:bg-[#000000] font-dmSans top-0 z-30 mx-0 mt-0 py-2 w-full border-b-2 border-zinc-200 dark:border-none">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                

                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto "
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">

                            {navItems.map((item) => 
                                item.active? (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.slug}
                                                className={({isActive}) =>
                                                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                                }
                                            >
                                                {item.name}
                                        </NavLink>
                                    </li>
                                ) : null
                            )}

                            {/* <li>
                                <NavLink
                                to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/about"
                                    className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>  */}
                        </ul>
                    </div>

                    <div className="flex items-center ">
                        {/* <NavLink
                            to="/signup"
                            className="text-red-400 hover:bg-gray-50 hover: transition-all font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Signup
                        </NavLink> */}
                        
                        {!authStatus ? <button 
                        onClick={() => navigate("/login")}
                        type="button" 
                        className="text-md rounded-lg relative inline-flex items-center justify-center px-4 py-2.5 m-1 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white" >
                            <span class="relative">Login</span>
                        </button> :
                        <button 
                        onClick={() => navigate("/")}
                        type="button" 
                        className="w-14 h-14 rounded-full relative inline-flex items-center justify-center px-4 py-2.5 m-1 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white" >
                            <span class="relative">Profile</span>
                        </button>
                }
               {authStatus && <LogoutButton/>}
                    </div>
                </div>
        </nav>
  )
}

export default Navbar