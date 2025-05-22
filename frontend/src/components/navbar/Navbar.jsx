import React from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SearchInput } from "../index"
import ProfilePopUpButton from './ProfilePopUpButton'
import UploadButton from './UploadButton'
import ThemeButton from './ThemeButton'
import HamBurger from '../sideBar/HamBurger.jsx'


const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const authStatus = useSelector(state => state.auth.isUserAuthenticated)

    const navItems = [
        {
            name: "Explore",
            slug: "/explore",
            active: authStatus,
        }
    ]

    return (
        // <nav className="bg-white dark:bg-[#000000] dark py-0.5 sm:py-1 dark:text-white relative font-dmSans w-full border-zinc-200 dark:border-none  ">
        <nav className="fixed top-0 left-0 right-0 h-13 z-50 bg-black text-white flex items-center xl:px-8">

            <div className="flex justify-between items-center w-full">
                <div className='absolute left-5.5'>
                    {authStatus && location.pathname.startsWith("/explore") && <HamBurger />}
                </div>

                {/* Logo  */}
                <div>
                    <button
                        onClick={() => navigate('/')}
                        className='p-1.5 ml-0.5 md:ml-1 text-white text-[0px]'>logo</button>
                    {/* <Link to="/" className="flex items-center md:w-2.5">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-3 h-4"
                            alt="Logo"
                        />
                    </Link> */}
                </div>

                <div>
                    {authStatus && location.pathname.startsWith("/explore") && <SearchInput />}
                </div>

                <div className='flex lg:gap-5'>
                    <div
                        className="md:flex lg:w-auto"
                    >
                        <ul className="mt-2.5 md:mt-4 text-sm md:font-medium md:flex-row lg:text-[16px]">
                            {authStatus && location.pathname === "/" && navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.slug}
                                            className={({ isActive }) =>
                                                `py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} hover:border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent hover:text-orange-700 lg:p-0`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ) : null
                            )}
                        </ul>
                    </div>

                    <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2.5 ">
                        {/* <ThemeButton/> */}


                        {authStatus && location.pathname.startsWith("/explore") && <UploadButton />}

                        {/* Login button  */}
                        {!authStatus ? <button
                            onClick={() => navigate("/login")}
                            type="button"
                            className="text-md rounded-lg relative inline-flex items-center justify-center px-4 py-2.5 m-1 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white" >
                            <span class="relative">Login</span>
                        </button> :

                            // Profile Pop up button 
                            <ProfilePopUpButton />
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar