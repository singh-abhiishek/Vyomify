import React, {useEffect, useRef, useState} from "react";
import "./Stepper.css"

const CheckoutStepper = ({stepsConfig = [], videoFormData = {}, setVideoFormData, errors}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("ddd")
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

  const handlePrev = (e) => {
    setCurrentStep((prevStep) => {
      return prevStep - 1;
    })
  }

  const handleNext = (e) => {
    const isError = stepsConfig[currentStep - 1].validate()
    console.log(isError)
    if(!isError){
      setCurrentStep((prevStep) => {
        if (prevStep === stepsConfig.length) {
          setIsComplete(true);
          return prevStep;
        } else {
          return prevStep + 1;
        }
      });
    }
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <div className="flex flex-col gap-2 h-full">
        <div className="stepper h-[10%] ">

            {stepsConfig.map((step, index) => {
            return (
                <div
                key={step.name}
                ref={(el) => (stepRef.current[index] = el)}
                className={`step ${
                    currentStep > index + 1 || isComplete ? "complete" : ""
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
                style={{width: `${calculateProgressBarWidth()}%`}}
            ></div>
            </div>

        </div>

        <div className="h-[80%]"> <ActiveComponent videoFormData={videoFormData} setVideoFormData={setVideoFormData} errors= {errors}/> </div>

        <div className="h-[10%] ">
            <div className="h-fit">
                {!isComplete && (
                    <button 
                    type="button"
                    // disabled = {!error} // empty string give - falsy value
                    className="border cursor-pointer" onClick={handlePrev}>
                    {currentStep > 1 ? "Back" : ""}
                    </button>
                )}
                {!isComplete && (
                    <button 
                    type="button"
                    disabled = {!error} // empty string give - falsy value
                    className="border cursor-pointer" onClick={handleNext}>
                    {currentStep === stepsConfig.length ? "Finish" : "Continue"}
                    </button>
                )}
            </div>
        </div>
    </div>
  );
};

export default CheckoutStepper;