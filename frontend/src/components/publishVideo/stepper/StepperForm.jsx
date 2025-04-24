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

  // for next button
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

  const [publishVideo, { isLoading }] = usePublishVideoMutation()
  const onSubmit = async (data) => {
    console.log("video publish req executed")
    // console.log("All form data:", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("isPublished", data.isPublished);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("playlistIds", JSON.stringify(data.playlistIds || [])); // Converts your array:Into a JSON string:

    for (let pair of formData.entries()) {  //NOTE: direct console.log(formData) gives empty object(don't know why)
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await publishVideo(formData).unwrap();

      console.log("response from stepper form", response)
      console.log("response data from stepper form", response.data)
      if (response.success) {
        showToastMessage("video published Successfully", "success");
      }
    } catch (error) {
      console.log(error)
      showToastMessage(error.response?.data?.message || "Request failed!", "error");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">

          <div className="stepper h-[10%]">
            {stepsConfig.map((step, index) => {
              return (
                <div
                  key={step.name}
                  ref={(el) => (stepRef.current[index] = el)}
                  className={` step ${currentStep > index + 1 || isComplete ? "complete" : ""
                    } ${currentStep === index + 1 ? "active" : ""} `}
                >
                  {console.log(currentStep)}
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

          <div className="h-[80%]"> <ActiveComponent /> </div>

          <div className="h-[10%] flex justify-between">
            <div >
              {!isComplete && currentStep > 1 && (
                <button
                  onClick={handlePrev}
                  type="button"
                  // disabled = {!error} // empty string give - falsy value
                  className="text-md rounded-lg relative inline-flex items-center justify-center px-4 py-1.5 m-1 cursor-pointer
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
                  className="text-md rounded-lg inline-flex items-center justify-center px-4 py-1.5 m-1 cursor-pointer
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
                  className="text-md rounded-lg relative inline-flex items-center justify-center px-4 py-1.5 m-1 cursor-pointer border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white">
                  {isLoading ? <Spinner name='Publishing...' /> : "Publish"}
                </button>
              )}
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default StepperForm;






























// ***********************************************************************************************************************
// import React, {useEffect, useRef, useState} from "react";
// import "./Stepper.css"

// const CheckoutStepper = ({stepsConfig = [], videoFormData = {}, setVideoFormData, errors}) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isComplete, setIsComplete] = useState(false);
//   const [error, setError] = useState("ddd")
//   const [margins, setMargins] = useState({
//     marginLeft: 0,
//     marginRight: 0,
//   });

//   const stepRef = useRef([]);

//   useEffect(() => {
//     setMargins({
//       marginLeft: stepRef.current[0].offsetWidth / 2,
//       marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
//     });
//   }, [stepRef, stepsConfig.length]);


//   if (!stepsConfig.length) {
//     return <></>;
//   }

//   const handlePrev = (e) => {
//     setCurrentStep((prevStep) => {
//       return prevStep - 1;
//     })
//   }

//   const handleNext = (e) => {
//     const isError = stepsConfig[currentStep - 1].validate()
//     console.log(isError)
//     if(!isError){
//       setCurrentStep((prevStep) => {
//         if (prevStep === stepsConfig.length) {
//           setIsComplete(true);
//           return prevStep;
//         } else {
//           return prevStep + 1;
//         }
//       });
//     }
//   };

//   const calculateProgressBarWidth = () => {
//     return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
//   };

//   const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

//   return (
//     <div className="flex flex-col gap-2 h-full">
//         <div className="stepper h-[10%] ">

//             {stepsConfig.map((step, index) => {
//             return (
//                 <div
//                 key={step.name}
//                 ref={(el) => (stepRef.current[index] = el)}
//                 className={`step ${
//                     currentStep > index + 1 || isComplete ? "complete" : ""
//                 } ${currentStep === index + 1 ? "active" : ""} `}
//                 >
//                     {console.log(currentStep)}
//                     <div className="step-number">
//                         {currentStep > index + 1 || isComplete ? (
//                         <span>&#10003;</span>
//                         ) : (
//                         index + 1
//                         )}
//                     </div>
//                     <div className="step-name">{step.name}</div>

//                 </div>
//             );
//             })}

//             <div
//             className="progress-bar"
//             style={{
//                 width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
//                 marginLeft: margins.marginLeft,
//                 marginRight: margins.marginRight,
//             }}
//             >
//             <div
//                 className="progress"
//                 style={{width: `${calculateProgressBarWidth()}%`}}
//             ></div>
//             </div>

//         </div>

//         <div className="h-[80%]"> <ActiveComponent videoFormData={videoFormData} setVideoFormData={setVideoFormData} errors= {errors}/> </div>

//         <div className="h-[10%] ">
//             <div className="h-fit">
//                 {!isComplete && (
//                     <button
//                     type="button"
//                     // disabled = {!error} // empty string give - falsy value
//                     className="border cursor-pointer" onClick={handlePrev}>
//                     {currentStep > 1 ? "Back" : ""}
//                     </button>
//                 )}
//                 {!isComplete && (
//                     <button
//                     type="button"
//                     disabled = {!error} // empty string give - falsy value
//                     className="border cursor-pointer" onClick={handleNext}>
//                     {currentStep === stepsConfig.length ? "Finish" : "Continue"}
//                     </button>
//                 )}
//             </div>
//         </div>
//     </div>
//   );
// };

// export default CheckoutStepper;