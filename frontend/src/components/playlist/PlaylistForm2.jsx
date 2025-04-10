import React, { useState, useEffect } from 'react'
import { useForm  } from 'react-hook-form'
import { ClipLoader} from "react-spinners"
import axios from 'axios'


const PlaylistForm2 = ({ setIsOpen2 }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        //api call
        console.log(data)
        // setLoading(true) // for loader 
        // try {
        //     const response = await axios.post(
        //         `${import.meta.env.VITE_BACKEND_API}/playlists/`, 
        //         {
        //             title : data.title,
        //             description: data.description
        //         },
        //         { withCredentials: true }
        //     )

        //     if(response.status === 200){
        //         showToastMessage("playlist created successfully.", "success")
        //     }

        // } catch (error) {
        //     console.log(error)
        //     if(error.status === 410){
        //         showToastMessage(error.response?.data?.message, "error");
        //     }
        //     else showToastMessage("Request failed!", "error");
        // }
        // finally{
        //     setLoading(false)
        // }
    }
    useEffect(() => {
        console.log("PlaylistForm2 mounted!");
        return () => {
          console.log("PlaylistForm2 unmounted!");
        };
      }, []);

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <form
  onSubmit={handleSubmit((data) => {
    console.log("Form submitted!");
    onSubmit(data);
  })}
>

        <div className='dark:bg-[#1d1d1d] p-4 py-5 w-[400px]'>
            <div className=''>
                {/* title  */}
                <div className='mb-1'>
                    <textarea
                        placeholder="Title"
                        className="text-gray-300 pl-11 py-3 h-24 min-h-[3.5rem] max-h-40 overflow-auto rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none"
                        {...register("title", 
                            { required: "Title is required" },
                        )}
                    />

                    {errors.title && <p className ="text-red-600 text-sm italic">
                        {errors.title.message}
                    </p>}
                </div>
                
                {/* Description  */}
                <div className='mb-1'>
                    <textarea
                        placeholder="Description"
                        className="text-gray-300 py-3 pl-11 pr-4 h-48 rounded-lg w-full border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200 resize-none"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && <p className ="text-red-600 text-sm italic">
                        {errors.description.message}
                    </p>}
                </div>


                {/* cancel and create button  */}
                <div className='flex justify-between gap-2'>
                    <div
                    className="rounded-xl bg-[#2b2b2b] text-gray-200 px-2 py-0.5 
                    border border-[#3d3d3d] hover:bg-[#3a3a3a] 
                    hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]">
                        <button 
                        type="button"
                        onClick={() => setIsOpen2(false)} 
                        className="p-1.5 text-sm cursor-pointer">
                            <span class="relative">Cancel</span>
                        </button>
                    </div> 

                    <div className="rounded-xl bg-[#2b2b2b] text-gray-200 px-2 py-0.5 
                        border border-[#3d3d3d] hover:bg-[#3a3a3a] 
                        hover:text-white transition-all duration-200 ease-in-out shadow-[inset_0_0_0_1px_#3d3d3d]">
                        <button 
                            type="submit" 
                            // disabled = {loading}
                            className="p-1.5 text-sm cursor-pointer">
                                    create
                            {/* {loading ? (
                                <div 
                                className="flex items-center gap-2"
                                >
                                    <ClipLoader size={18} color="#fff" />
                                    <span>creating...</span>
                                </div>
                            ) : ( "Create" )} */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default PlaylistForm2