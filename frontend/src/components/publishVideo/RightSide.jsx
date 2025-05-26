import React from 'react'
import { useFormContext } from 'react-hook-form';

const RightSide = () => {

    const { getValues } = useFormContext();
    const currentValues = getValues()
    const thumbnail = currentValues?.thumbnail[0]
    const videoFile = currentValues?.videoFile[0]
    console.log("from step-2", videoFile)

    

    
    return (
        <div className='md:w-[40%] flex flex-col   bg-[#282828]  text-center space-y-4 '>
            {/* Thumbnail Preview */}
            {thumbnail instanceof File && (
                <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Thumbnail Preview"
                    className="w-full sm:h-[140px] max-w-xs rounded-lg border border-gray-500"
                />
            )}

            {/* Video Preview */}
            {videoFile instanceof File && (
                <video
                    controls
                    src={URL.createObjectURL(videoFile)}
                    className="w-full sm:h-[140px] max-w-xs rounded-lg border border-gray-500"
                />
            )}

            {!thumbnail?.[0] && !(videoFile instanceof File) && (
                <p className="text-sm text-gray-500">No preview available yet</p>
            )}
        </div>
    )
}

export default RightSide