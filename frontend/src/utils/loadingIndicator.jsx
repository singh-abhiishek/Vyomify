// Spinner.js
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { BeatLoader } from 'react-spinners';  // Example of another spinner
import { PuffLoader } from 'react-spinners';  // Another example

export const Spinner = ({ type = 'clip', name = "", size = 18, color = "#fff" }) => {
  // Decide which spinner to render based on the 'type' prop
  let SpinnerComponent;

  switch (type) {
    case 'beat':
      SpinnerComponent = BeatLoader;
      break;
    case 'puff':
      SpinnerComponent = PuffLoader;
      break;
    case 'clip':
    default:
      SpinnerComponent = ClipLoader;
      break;
  }

  return (
    <div className="flex justify-center items-center">
      <SpinnerComponent size={size} color={color} />
      {/* <SpinnerComponent loading={loading} size={30} color="#000" /> */}
      <span>{name}</span>
    </div>
  );
};

// export default Spinner;
