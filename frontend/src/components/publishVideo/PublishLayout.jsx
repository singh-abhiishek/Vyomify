import React, { useState, useEffect } from 'react'
import CheckoutStepper from "./stepper/Stepper.jsx";
import UploadVideo from './UploadVideo.jsx';
import VideoDetails from './VideoDetails.jsx';
import PublishStatusForm from './PublishStatusForm.jsx';
import AddToPlaylistForm from './AddToPlaylistForm.jsx';


const PublishLayout = () => {

  const [videoFormData, setVideoFormData] = useState({
    videoFile: null,
    thumbnail: null,
    title: "",
    description: "",
    isPublished: false,
    addToPlaylistName: "",
  });

  const [errors, setErrors] = useState({})

  const CHECKOUT_STEPS = [
    {
      name: "Files",
      // Component: (props) => <div> <UploadVideo {...props} /> </div>,
      Component: UploadVideo,
      validate: () => {
        const err = {};

        if(!videoFormData.videoFile && !videoFormData.thumbnail){
          err.thumbnail = "thumbnail is required"
          err.videoFile = "videoFile is required"
        }
        else if(!videoFormData.videoFile){
          err.videoFile = "videoFile is required"
        }
        else if(!videoFormData.videoFile.type.startsWith("video/")){
          err.videoFile = "please choose a valid video file"
        }
        else if(!videoFormData.thumbnail){
          err.thumbnail = "thumbnail is required"
        }
        else if(!videoFormData.thumbnail.type.startsWith("image/")){
          err.thumbnail = "please choose a valid thumbnail file"
        }
        
        setErrors(err);
        return (err.videoFile || err.thumbnail) ? true : false;
      }
    },
    {
      name: "Details",
      // Component: (props) => <div> <VideoDetails {...props} /> </div>,
      Component: VideoDetails,
      validate: () => {
        const err = {};

        if(!videoFormData.title && !videoFormData.description){
          err.title = "title is required"
          err.description = "description is required"
        }
        else if(!videoFormData.title){
          err.title = "title is required"
        }
        else if(!videoFormData.description){
          err.description = "description is required"
        }
        else if(!videoFormData.title.length > 100){
          err.title = "max 100 char is allowed"
        }
        else if(!videoFormData.description.length > 1000){
          err.description = "max 1000 char is allowed"
        }
        
        setErrors(err);
        return (err.title || err.description) ? true : false;
      }
    },
    {
      name: "Visibility",
      // Component: (props) => <div> <PublishStatusForm {...props} /> </div>,
      Component: PublishStatusForm,
      validate: () => {return false} // visibility is set to false by default
    },
    {
      name: "Playlists",
      // Component: (props) => <div> <AddToPlaylistForm {...props} /> </div>,
      Component: AddToPlaylistForm,
      validate: () => {return false} //TODO:- change it accordingly
    },
  ];
  
  useEffect(() => {
    console.log("Updated Form Data:", videoFormData);
  }, [videoFormData]);


  return (
    <div className='w-[70%] mx-auto p-10 bg-[#282828] text-white rounded-3xl shadow-lg flex flex-col gap-2'>
      {/* stepper */}
      <div className='px-4 py-1'>
        <CheckoutStepper stepsConfig={CHECKOUT_STEPS} videoFormData={videoFormData} setVideoFormData={setVideoFormData} errors={errors} />
      </div>
    </div>
  )
}

export default PublishLayout