import React, { useState, useEffect } from 'react'
import { ClipLoader} from "react-spinners"
import {showToastMessage} from "../../utils/showToaster.jsx"
import { useCreatePlaylistMutation } from '../../store/slices/playlistApiSlice.js'

const PlaylistForm2 = ({modalRef2, setIsOpen2, onPlaylistCreated  }) => {

    const [isPrivate, setIsPrivate] = useState(); // false = public, true = private
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const [ createPlaylist , {isLoading}] = useCreatePlaylistMutation({})

    const handleSubmit = async (e) => {
        //api call
        e.preventDefault();
        setLoading(true) // for loader 
        try {
            const response = await createPlaylist({
                name,
                description,
                isPrivate
            }).unwrap()
            
            console.log("response after creating playlist", response)
            if(response.success){
                onPlaylistCreated(); // ✅ refetch playlists 
                showToastMessage("playlist created successfully.", "success")
                setIsOpen2(false)
            }
        } catch (error) {
            console.log("errorr...",error)
            if(error.status === 410){
                showToastMessage(error.response?.data?.message, "error");
            }
            else showToastMessage("Request failed!", "error");
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <form onSubmit={handleSubmit}
    ref={modalRef2}
    >
        {/* <div className='dark:bg-[#1d1d1d] p-4 py-5 w-[400px] '> */}
        <div className='dark:bg-[#1d1d1d] p-4 py-5 w-[400px] shadow-[0_2px_20px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-300 rounded-lg'>
            <div className=''>
                {/* name  */}
                <div className='mb-1'>
                    <textarea
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-gray-300 pl-11 py-3 h-24 min-h-[3.5rem] max-h-40 overflow-auto rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none"
                    />
                </div>
                
                {/* Description  */}
                <div className='mb-1'>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-gray-300 py-3 pl-11 pr-4 h-48 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none"
                    />
                </div>


                {/* private or public  */}
                <div className='flex gap-2 p-2'>
                    <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    value="false"
                    checked={!isPrivate}
                    onChange={() => setIsPrivate(false)}
                    />
                        Public
                    </label>

                    <label className="flex items-center gap-1">
                    <input
                        type="radio"
                        value="true"
                        checked={isPrivate}
                        onChange={() => setIsPrivate(true)}
                    />
                        Private
                    </label>
                </div>

                {/* line  */}
                <div class="border-t border-gray-700 flex-grow  w-full mt-1 mb-2">
                </div>

                {/* cancel and create button  */}
                <div className='flex justify-between gap-2'>
                    <div
                    className="rounded-lg bg-[#2b2b2b] text-gray-200 px-2 py-0.5 
                    border border-[#3d3d3d] hover:bg-[#3a3a3a] 
                    hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]">
                        <button 
                        type="button"
                        onClick={() => setIsOpen2(false)} 
                        className="p-1.5 text-sm cursor-pointer">
                            <span class="relative">Cancel</span>
                        </button>
                    </div> 

                    <div className={`rounded-lg px-2 py-0.5 
                        border border-[#3d3d3d] ${(!name || !description) ? "bg-[#363636] text-gray-500" : "bg-[#2b2b2b] text-gray-200 hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d] "}`}>
                        <button 
                            type="submit" 
                            onClick={handleSubmit}
                            disabled={(!name || !description)}
                            className={`p-1.5 text-sm ${(!name || !description) ?  "" :"cursor-pointer"}`}
                            >
                                    {/* Create */}
                            {loading ? (
                                <div 
                                className="flex items-center gap-2"
                                >
                                    <ClipLoader size={18} color="#fff" />
                                    {/* <span>creating...</span> */}
                                </div>
                            ) : ( "Create" )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>    
  )
}

export default PlaylistForm2