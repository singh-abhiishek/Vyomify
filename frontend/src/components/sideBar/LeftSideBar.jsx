import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLeftSideBar } from '../../contextAPI/SideBarContext.jsx';
import CloseSideBarItem from './close/CloseSideBarItem.jsx';
import OpenSideBarItem from './open/OpenSideBarItem.jsx';

const LeftSidebar = () => {
    const { isLeftBarOpen } = useLeftSideBar()
    return (
            <motion.div 
            initial={{width: 63}}
            animate={{width: isLeftBarOpen ? 205 : 63}}
            transition={{duration: 0.3}}
            className={`dark:bg-[#000000] h-screen dark:text-white`}

            style={{
                // overflow: 'hidden',
                // ✅ pointer-events ONLY when open (blocks background)
                pointerEvents: isLeftBarOpen ? 'auto' : 'auto',
              }}
            >
                {isLeftBarOpen ? <OpenSideBarItem /> : <CloseSideBarItem/>}
            </motion.div>
    )
}

export default LeftSidebar





















// ****************************************
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {useSelector, useDispatch} from "react-redux";
// import axios from "axios";
 

// const LeftSidebar = () => {
//     const user = null
//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//     const logoutHandler = async () => {
//         try {
//            console.log("logout")
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (

//         <div className='w-[15%] bg-gray-500'>
//             <div>
//                 <div className='my-4'>

//                     <Link to="/explore" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
//                         <div>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="currentColor"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 width="24"
//                                 aria-hidden="true"
//                                 style={{ pointerEvents: "none", display: "inherit", width: "100%", height: "100%" }}
//                             >
//                                 <path
//                                 clipRule="evenodd"
//                                 d="M22.146 11.146a.5.5 0 01-.353.854H20v7.5a1.5 1.5 0 01-1.5 1.5h-5v-7h-3v7h-5A1.5 1.5 0 014 19.5V12H2.207a.5.5 0 01-.353-.854L12 1l10.146 10.146ZM18.5 9.621l-6.5-6.5-6.5 6.5V19.5H9V13a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v6.5h3.5V9.621Z"
//                                 fillRule="evenodd"
//                                 />
//                             </svg>
//                         </div>
//                         <h1 className='font-bold text-lg ml-2'>Home</h1>
//                     </Link>

//                     <Link to="/explore/likedVideos" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
//                             <div>
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="currentColor"
//                                     height="24"
//                                     viewBox="0 0 24 24"
//                                     width="24"
//                                     focusable="false"
//                                     aria-hidden="true"
//                                     style={{ pointerEvents: "none", display: "inherit", width: "100%", height: "100%" }}
//                                 >
//                                     <path
//                                     clipRule="evenodd"
//                                     fillRule="evenodd"
//                                     d="M14.813 5.018 14.41 6.5 14 8h5.192c.826 0 1.609.376 2.125 1.022.711.888.794 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H5c-1.105 0-2-.895-2-2v-8c0-1.105.895-2 2-2h2v.282c0-.834.26-1.647.745-2.325L12 1l1.1.472c1.376.59 2.107 2.103 1.713 3.546ZM7 10.5H5c-.276 0-.5.224-.5.5v8c0 .276.224.5.5.5h2v-9Zm10.5 9h-9V9.282c0-.521.163-1.03.466-1.453l3.553-4.975c.682.298 1.043 1.051.847 1.77l-.813 2.981c-.123.451-.029.934.255 1.305.284.372.725.59 1.192.59h5.192c.37 0 .722.169.954.459.32.399.357.954.094 1.393l-.526.876c-.241.402-.28.894-.107 1.33l.165.412c.324.81.203 1.73-.32 2.428l-.152.202c-.195.26-.3.575-.3.9v.5c0 .828-.672 1.5-1.5 1.5Z"
//                                     />
//                                 </svg>
//                             </div>
//                             <h1 className='font-bold text-lg ml-2'>Liked Videos</h1>
                        
//                     </Link>

//                     <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
//                         <div>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="currentColor"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 width="24"
//                                 focusable="false"
//                                 aria-hidden="true"
//                                 style={{ pointerEvents: "none", display: "inherit", width: "100%", height: "100%" }}
//                             >
//                                 <path
//                                 clipRule="evenodd"
//                                 fillRule="evenodd"
//                                 d="M14.203 4.83c-1.74-.534-3.614-.418-5.274.327-1.354.608-2.49 1.6-3.273 2.843H8.25c.414 0 .75.336.75.75s-.336.75-.75.75H3V4.25c0-.414.336-.75.75-.75s.75.336.75.75v2.775c.935-1.41 2.254-2.536 3.815-3.236 1.992-.894 4.241-1.033 6.328-.392 2.088.641 3.87 2.02 5.017 3.878 1.146 1.858 1.578 4.07 1.215 6.223-.364 2.153-1.498 4.1-3.19 5.48-1.693 1.379-3.83 2.095-6.012 2.016-2.182-.08-4.26-.949-5.849-2.447-1.588-1.499-2.578-3.523-2.784-5.697-.039-.412.264-.778.676-.817.412-.04.778.263.818.675.171 1.812.996 3.499 2.32 4.748 1.323 1.248 3.055 1.973 4.874 2.04 1.818.065 3.598-.532 5.01-1.681 1.41-1.15 2.355-2.773 2.657-4.567.303-1.794-.056-3.637-1.012-5.186-.955-1.548-2.44-2.697-4.18-3.231ZM12.75 7.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4.886l.314.224 3.5 2.5c.337.241.806.163 1.046-.174.241-.337.163-.806-.174-1.046l-3.186-2.276V7.5Z"
//                                 />
//                             </svg>
//                         </div>
//                         <h1 className='font-bold text-lg ml-2'>History</h1>
//                     </div>

//                     <Link to={/profile/} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
//                         <div>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="currentColor"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 width="24"
//                                 focusable="false"
//                                 aria-hidden="true"
//                                 style={{ pointerEvents: "none", display: "inherit", width: "100%", height: "100%" }}
//                             >
//                                 <path
//                                 clipRule="evenodd"
//                                 fillRule="evenodd"
//                                 d="M3.5 5.5h17v13h-17v-13ZM2 5.5C2 4.672 2.672 4 3.5 4h17c.828 0 1.5.672 1.5 1.5v13c0 .828-.672 1.5-1.5 1.5h-17c-.828 0-1.5-.672-1.5-1.5v-13Zm7.748 2.927c-.333-.19-.748.05-.748.435v6.276c0 .384.415.625.748.434L16 12 9.748 8.427Z"
//                                 />
//                             </svg>
//                         </div>
//                         <h1 className='font-bold text-lg ml-2'>My Content</h1>
//                     </Link>

//                     <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
//                         <div>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="currentColor"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 width="24"
//                                 focusable="false"
//                                 aria-hidden="true"
//                                 style={{ pointerEvents: "none", display: "inherit", width: "100%", height: "100%" }}
//                             >
//                                 <path
//                                 clipRule="evenodd"
//                                 fillRule="evenodd"
//                                 d="M3.75 5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75S20.664 5 20.25 5H3.75Zm0 4c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75S20.664 9 20.25 9H3.75Zm0 4c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-8.5Zm8.5 4c.414 0 .75.336.75.75s-.336.75-.75.75h-8.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h8.5Zm3.498-3.572c-.333-.191-.748.05-.748.434v6.276c0 .384.415.625.748.434L22 17l-6.252-3.572Z"
//                                 />
//                             </svg>
//                         </div>
//                         <h1 className='font-bold text-lg ml-2'>Playlists</h1>
//                     </div>
                    
//                     <div  className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
//                         <div>
//                              <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="currentColor"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 width="24"
//                                 focusable="false"
//                                 aria-hidden="true"
//                                 style={{ pointerEvents: "none", display: "inherit", width: "100%", height: "100%" }}
//                             >
//                                 <path
//                                 clipRule="evenodd"
//                                 fillRule="evenodd"
//                                 d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z"
//                                 />
//                             </svg>
//                         </div>
//                         <h1 className='font-bold text-lg ml-2'>Subscribers</h1>
//                     </div>
                    
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default LeftSidebar