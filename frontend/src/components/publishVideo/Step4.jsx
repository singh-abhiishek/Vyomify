import React, { useState, useEffect, useRef } from 'react'
import { useFormContext } from "react-hook-form";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';
import PlaylistForm2 from '../playlist/PlaylistForm2';
import PlaylistForm1 from '../playlist/PlaylistForm1';
import { useGetUserPlaylistsNameQuery, useLazyGetUserPlaylistsNameQuery } from '../../store/slices/playlistApiSlice';
import useOutsideClick from '../../hooks/UseOutsideClick';


const Step4 = () => {

  const [isOpen1, setIsOpen1] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)

  // This hook listens for outside click, and close the pop up modal
  const modalRef1 = useRef()
  const modalRef2 = useRef()
  useOutsideClick(modalRef2, () => setIsOpen2(false), isOpen2);
  useOutsideClick(modalRef1, () => setIsOpen1(false), isOpen1, isOpen2);

  const openForm1 = (e) => {
    e.preventDefault()
    setIsOpen1(true)
  }

  // take user from store and req to backend for user playlists names
  const user = useSelector(state => state?.auth?.userData?.user)
  // console.log("from Step4", user)
  const { data: playlists, refetch } = useGetUserPlaylistsNameQuery(user?._id, { skip: !user?._id })
  // console.log("from Step4 ,,", playlists)

  const [userPlaylistsName, setUserPlaylistsName] = useState([]);
  useEffect(() => {
    setUserPlaylistsName(playlists?.data);
  }, [playlists?.data]);

  const onPlaylistCreated = () => {
    refetch()
  }

  // console.log("from step4", userPlaylistsName)

  return (
    <div className='max-w-5xl h-[410px] mx-auto text-white rounded-3xl shadow-xl  my-8'>
      <div className='flex flex-col md:flex-row gap-6 p-2 h-full'>

        {/* Left Side - Form */}
        <div className='relative md:w-[60%]  border border-gray-600 rounded-2xl p-6 md:p-10 flex flex-col justify-between gap-5 bg-[#282828]'>

          <p className='text-red-600 font-amaranth font-bold text-2xl'>
            Organize Video
          </p>

          <div>
            <p className='text-[15px] text-gray-400'>
              Add your video to one or more playlists
            </p>

            <div className="">
              <button
                onClick={openForm1}
                className='border w-full h-14 rounded-[10px] flex items-center justify-between p-2 cursor-pointer'
              >
                <p className='text-bold text-[17px]'> Select playlists </p>
                <p>icon</p>
              </button>
            </div>
          </div>

          <div></div>
        </div>

        {/* open1 playlist form */}
        {isOpen1 && <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <PlaylistForm1 modalRef1={modalRef1} setIsOpen1={setIsOpen1} setIsOpen2={setIsOpen2} userPlaylistsName={userPlaylistsName} />
        </div>}

        {/* open2 playlist form */}
        {isOpen2 && <div className='absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2'>
          <PlaylistForm2 modalRef2={modalRef2} setIsOpen2={setIsOpen2} onPlaylistCreated={onPlaylistCreated} />
        </div>}

        {/* Right Side - You can design this section later */}
        <div className='md:w-[40%] border border-gray-600 rounded-2xl flex flex-col items-center justify-center bg-[#282828] p-10 text-center'>
          <p className="text-gray-400">Right section content goes here</p>
        </div>
      </div>
    </div>
  )
}

export default Step4