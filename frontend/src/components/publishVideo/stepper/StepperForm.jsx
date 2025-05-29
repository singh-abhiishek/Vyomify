import "./StepperForm.css"
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Button from "../../ui/button.jsx";
import Step1 from "../Step1.jsx";
import Step2 from '../Step2.jsx';
import Step3 from '../Step3.jsx';
import Step4 from '../Step4.jsx';
import { usePublishVideoMutation } from "../../../store/slices/videoApiSlice.js";
import { Spinner } from "../../../utils/loadingIndicator.jsx";
import { showToastMessage } from "../../../utils/showToaster.jsx";
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCog, FaCloudUploadAlt, FaVideo, FaClock, FaStar } from "react-icons/fa";
import { FaUserCircle, FaHourglassHalf } from "react-icons/fa";
import { useStepForm } from "../../../contextAPI/StepFormContext.jsx";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { RiDashboardHorizontalLine } from "react-icons/ri";


const stepsConfig = [
  {
    name: "Files",
    Component: Step1,
    fields: ["videoFile", "thumbnail"],
    optional: false
  },
  {
    name: "Details",
    Component: Step2,
    fields: ["title", "description"],
    optional: false
  },
  {
    name: "Visibility",
    Component: Step3,
    fields: ["isPublished"],
    optional: true
  },
  {
    name: "Playlists",
    Component: Step4,
    fields: ["playlistIds"],
    optional: true
  },
];



const StepperForm = () => {

  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  // handle validation with react hook form
  const methods = useFormContext();
  const { trigger, handleSubmit } = methods;

  const ActiveStep = stepsConfig[currentStep - 1]
  const ActiveComponent = ActiveStep.Component;

  // for previous button
  const handlePrev = (e) => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => {
        return prevStep - 1;
      })
    }
  }

  // for next button, ensure validation also
  const handleNext = async (e) => {
    if (ActiveStep.optional || ActiveStep.fields.length === 0) {
      setStep()
    } else {
      const isValid = await trigger(ActiveStep.fields);
      if (isValid) setStep()
    }
  };

  const setStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  }

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  // upload progess bar
  const { getValues } = useFormContext();
  const currentValues = getValues(); // Get all current values of stepper form
  // console.log("from stepper form checking curr values", currentValues)

  const navigate = useNavigate()
  const [uploadProgressBar, setUploadProgressBar] = useState(0);
  const [showUploadProgessBar, setShowUploadProgressBar] = useState(false);
  const [isResponseSuccess, setIsResponseSuccess] = useState(false);

  const [publishVideo, { isLoading }] = usePublishVideoMutation()

  const [uploadTimeTaken, setUploadTimeTaken] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  const user = useSelector(state => state.auth?.userData?.user)
  const { toggleStepForm } = useStepForm() // from contextApi


  // form submit
  const onSubmit = async (data) => {
    // console.log("video publish req executed")
    // console.log("All form data:", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("isPublished", data.isPublished);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("playlistIds", JSON.stringify(data.playlistIds || [])); // Converts your array:Into a JSON string:

    // for (let pair of formData.entries()) {  //NOTE: direct console.log(formData) gives empty object(don't know why)
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    // Get file size
    const file = data.videoFile[0];
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    setFileSize(sizeInMB);

    // Start time
    const startTime = Date.now();

    setShowUploadProgressBar(true);
    try {
      const response = await publishVideo({
        formData,
        onProgress: (progressPercent) => setUploadProgressBar(progressPercent),  // come from the fetchBaseQueryWithProgress (from apislice)
      }).unwrap();

      // console.log("response from stepper form", response)
      // console.log("response data from stepper form", response.data)
      if (response.success) {
        setIsResponseSuccess(true)
        setUploadProgressBar(100);
        showToastMessage("video published Successfully", "success");

        const endTime = Date.now();
        const timeInSeconds = ((endTime - startTime) / 1000).toFixed(1);
        setUploadTimeTaken(timeInSeconds);
      }
    } catch (error) {
      console.log(error)
      showToastMessage(error.response?.data?.message || "Request failed!", "error");
      setShowUploadProgressBar(false)
    }
  };



  return (
    <>
      {showUploadProgessBar ?
        <div className="flex flex-col items-center justify-center w-full max-w-3xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 space-y-5 rounded-2xl mx-auto">
          {!isResponseSuccess ? (
            <>
              {/* Upload In Progress */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-1 sm:gap-2 text-rose-600">
                  <FaCloudUploadAlt className="text-2xl sm:text-4xl animate-bounce" />
                  <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 font-amaranth font-bold text-2xl sm:text-3xl drop-shadow whitespace-nowrap">
                    Upload in Progress
                  </h1>
                </div>
                <span className="h-1 w-24 sm:w-36 bg-gradient-to-r from-red-600 to-pink-500 rounded-full animate-pulse mt-1" />
              </div>

              {/* Progress Bar */}
              <div className="relative w-full max-w-xl h-5 sm:h-6 bg-gray-900 rounded-full overflow-hidden mt-4 shadow-inner border border-gray-700 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse opacity-30 rounded-full" />
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-green-600 to-green-700 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgressBar}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs sm:text-sm font-semibold tracking-wide select-none">
                  {uploadProgressBar}%
                </div>
              </div>

              {/* Status Text */}
              <div className="flex flex-col items-center text-center text-gray-300 mt-3 space-y-2 sm:space-y-2  text-xs sm:text-sm px-2">
                <div className="flex items-center gap-1 sm:gap-2 text-gray-400 font-medium whitespace-nowrap ">
                  <FaCog className="animate-spin text-base sm:text-lg" />
                  <span>{uploadProgressBar}% complete</span>
                </div>


                <p className="italic text-gray-500 flex items-center gap-1 whitespace-nowrap">
                  <FaHourglassHalf className="text-orange-600" size={12} />
                  “Good things take time. Almost there!”
                </p>
                <span className="text-gray-500 whitespace-nowrap">
                  Estimated time left: ~{Math.max(5, 100 - uploadProgressBar)} seconds
                </span>

                <p className="flex flex-col items-center text-center text-red-400 animate-pulse text-sm sm:text-base bg-red-900/20 border border-red-400 px-4 py-2 rounded-lg shadow-inner space-y-1">
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Your video is being processed.
                  </span>
                  <span>
                    This may take a moment — <span className="italic">please stay on this page.</span>
                  </span>
                </p>
              </div>
            </>


          ) : (
            // Upload Success Message
            <div className="relative p-5 sm:p-6 md:p-7 bg-gradient-to-br from-green-700 via-emerald-800 to-green-900 rounded-xl text-white shadow-2xl text-center w-full border border-green-600 overflow-hidden">

              {/* Decorative Sparkles */}
              <div className="absolute -top-2 -left-2 w-full h-full pointer-events-none animate-pulse opacity-10">
                <div className="w-2 h-2 bg-white rounded-full absolute top-10 left-10 animate-ping" />
                <div className="w-2 h-2 bg-white rounded-full absolute top-4 right-20 animate-ping" />
                <div className="w-2 h-2 bg-white rounded-full absolute bottom-10 left-24 animate-ping" />
              </div>

              {/* Icons */}
              <div className="flex justify-center mb-3 gap-2 items-center">
                <FaCheckCircle className="text-3xl sm:text-4xl text-green-400 animate-bounce drop-shadow-lg" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl animate-ping" />
                <FaStar className="text-yellow-300 text-sm animate-pulse" />
              </div>

              {/* Headline */}
              <p className="text-xl sm:text-2xl font-bold text-green-300 animate-pulse tracking-wide">
                🎉 Upload Complete!
              </p>
              <p className="text-sm text-gray-200 mt-1">Your video has been successfully uploaded.</p>
              <p className="text-xs text-emerald-300 mt-2 italic">“Lights, Camera, Success!” 🌟</p>

              {/* Stats */}
              {fileSize && uploadTimeTaken && (
                <div className="text-sm text-gray-300 space-y-1 mt-2">
                  <div className="flex items-center justify-center gap-2">
                    <FaVideo /> File size: <span className="font-medium">{fileSize} MB</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <FaClock /> Time taken: <span className="font-medium">{uploadTimeTaken} s</span>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-3 w-full">
                <Link
                  to={`/explore/dashboard`}
                  onClick={toggleStepForm}
                  className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg transition duration-200 flex items-center justify-center gap-1 w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
                >
                  <RiDashboardHorizontalLine
                    className="text-base sm:text-lg"
                    aria-hidden="true"
                  />
                  Go to Dashboard
                </Link>


                <Link
                  to={`/explore/profile/${user?.username}`}
                  onClick={toggleStepForm}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg transition duration-200 flex items-center justify-center gap-1 w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
                >
                  <FaUserCircle
                    className="text-base sm:text-lg"
                    aria-hidden="true" />
                  Go to Profile
                  <FaStar className="text-yellow-400 text-xs  animate-ping" />
                </Link>
              </div>



            </div>
          )}
        </div>

        :
        (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>

              <div className="stepper">
                {stepsConfig.map((step, index) => {
                  return (
                    <div
                      key={step.name}
                      ref={(el) => (stepRef.current[index] = el)}
                      className={` step ${currentStep > index + 1 || isComplete ? "complete" : ""
                        } ${currentStep === index + 1 ? "active" : ""} `}
                    >
                      <div className="step-number">
                        {currentStep > index + 1 || isComplete ? (
                          <span>&#10003;</span>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="step-name">{step.name}</div>
                    </div>
                  );
                })}

                <div
                  className="progress-bar"
                  style={{
                    width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
                    marginLeft: margins.marginLeft,
                    marginRight: margins.marginRight,
                  }}
                >
                  <div
                    className="progress"
                    style={{ width: `${calculateProgressBarWidth()}%` }}
                  ></div>
                </div>
              </div>

              <ActiveComponent />

              <div className="flex justify-between">
                <div >
                  {!isComplete && currentStep > 1 && (
                    <button
                      onClick={handlePrev}
                      type="button"
                      // disabled = {!error} // empty string give - falsy value
                      className="text-sm rounded-lg relative inline-flex items-center justify-center px-2 py-1.5 sm:px-4 sm:py-1.5 mt-1 sm:mt-0 cursor-pointer
                border border-red-500 bg-[#2c2c2c] hover:bg-[#3a3a3a] text-red-400 shadow-sm
                active:border-red-600 active:text-red-500"
                    >

                      <span class="relative">Back</span>
                    </button>

                  )}
                </div>

                <div>
                  {!isComplete && currentStep < stepsConfig.length && (
                    <button
                      onClick={handleNext}
                      type="button"
                      className="text-sm sm:text-md rounded-lg inline-flex items-center justify-center  px-2 py-1.5 sm:px-4 sm:py-1.5 mt-1 sm:mt-0 cursor-pointer
              bg-gradient-to-tr from-red-600 to-red-500 text-white border border-red-700
              hover:from-red-500 hover:to-red-600 hover:shadow-md
              transition-all duration-200 ease-in-out shadow-sm"
                    >
                      <span class="relative">Continue</span>
                    </button>
                  )}

                  {!isComplete && currentStep === stepsConfig.length && (
                    <button
                      type="submit"
                      //disabled = {!error} // empty string give - falsy value
                      className="text-sm rounded-lg relative inline-flex items-center justify-center px-2 py-1.5 sm:px-4 sm:py-1.5mt-1 sm:mt-0 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white">
                      {isLoading ? <Spinner name='Publishing...' /> : "Publish"}
                    </button>
                  )}
                </div>
              </div>

            </div>
          </form>
        )
      }
    </>
  );
};

export default StepperForm;
