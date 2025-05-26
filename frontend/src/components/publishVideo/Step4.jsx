import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import PlaylistForm2 from '../playlist/PlaylistForm2';
import PlaylistForm1 from '../playlist/PlaylistForm1';
import { useGetUserPlaylistsNameQuery, } from '../../store/slices/playlistApiSlice';
import useOutsideClick from '../../hooks/UseOutsideClick';
import { Info, ChevronDown, ListMusic, Clock, ListVideo } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import RightSide from './RightSide';


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

  const { watch } = useFormContext()
  const playlistIds = watch("playlistIds") || [];
  const noOfSelectedPlaylist = playlistIds.length;
  console.log("from step4", noOfSelectedPlaylist)

  return (
    <div className='max-w-5xl mx-auto text-white rounded-3xl  sm:my-8'>
      <div className='flex flex-col md:flex-row gap-6 p-2 '>


        {/* Left Side - Form */}
        <div className='relative md:w-[60%] border border-gray-600 rounded-2xl p-6 md:p-6 flex flex-col gap-1   bg-[#282828] text-white'>

          {/* Heading */}
          <p className='text-red-600 font-amaranth font-bold text-xl sm:text-2xl'>
            Organize Video
          </p>

          {/* Playlist Selection */}
          <div className='flex flex-col gap-3'>
            <p className='text-xs sm:text-[15px] text-gray-400'>
              Add your video to one or more playlists
            </p>

            <button
              onClick={openForm1}
              className='border border-gray-600 w-full h-14 rounded-[10px] flex items-center justify-between px-4 hover:bg-[#1f1f1f] transition cursor-pointer'
            >
              <span className='text-sm sm:text-[16px] font-medium'>Select Playlists</span>
              <ChevronDown className='text-gray-400' size={20} />
            </button>

            {/* Fake selected playlists summary */}
            <div className='flex items-center gap-3 mt-2 text-sm text-gray-300'>
              <ListVideo size={18} className='text-red-400' />
              <span>{noOfSelectedPlaylist} playlists selected</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gray-700 my-2" />

          {/* Info Box */}
          <div className='flex items-start gap-2 bg-[#1e1e1e] border border-gray-600 p-3 rounded-lg text-xs text-gray-400'>
            <Info size={16} className='text-red-500 mt-0.5' />
            <p>Group videos into playlists to help viewers watch similar content easily.</p>
          </div>
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
        {/* <div className='md:w-[40%] border border-gray-600 rounded-2xl flex flex-col items-center justify-center bg-[#282828] p-10 text-center'>
          <p className="text-gray-400">Right section content goes here</p>
        </div> */}
         <RightSide />
      </div>
    </div>
  )
}

export default Step4