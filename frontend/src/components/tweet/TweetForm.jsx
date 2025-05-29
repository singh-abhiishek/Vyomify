import React, { useRef, useState } from "react";
import { useTweetForm } from "../../contextAPI/TweetFormContext";
import useOutsideClick from "../../hooks/UseOutsideClick";
import { showToastMessage } from "../../utils/showToaster";
import { useCreateTweetMutation } from "../../store/slices/tweetApiSlice";
import { Spinner } from "../../utils/loadingIndicator";
import { FaImage, FaGlobeAmericas, FaLock, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { FiImage, FiSend, FiXCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { Globe, Lock } from "lucide-react";


const TweetForm = () => {

  // handle outside click
  const { isTweetFormOpen, toggleTweetForm } = useTweetForm() // from contextApi
  const modalRef = useRef();
  useOutsideClick(modalRef, () => {
    if (isTweetFormOpen) toggleTweetForm(); // close modal on outside click
  }, isTweetFormOpen);

  const [tweet, setTweet] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [visibility, setVisibility] = useState("public");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      showToastMessage("Please choose a valid Image file", "info")
    }
  };


  const handleCancel = () => {
    setTweet("");
    setImageFile(null);
    setImagePreview(null);
    setVisibility("public");
    toggleTweetForm()
  };

  const [createTweet, { isLoading }] = useCreateTweetMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tweet.trim()) return showToastMessage("Tweet text is required!", "info");

    const formData = new FormData();
    formData.append("tweet", tweet.trim());
    formData.append("visibility", visibility);
    if (imageFile) formData.append("tweetFile", imageFile);

    // for (let pair of formData.entries()) {  //NOTE: direct console.log(formData) gives empty object(don't know why)
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    try {
      const response = await createTweet(formData).unwrap()

      if (response.success) {
        showToastMessage("Tweet Posted Successfully", "success")
      }
    } catch (error) {
      console.log("error while posting tweet", error)
      showToastMessage("Tweet not Posted", "error")
    }
    finally {
      toggleTweetForm(false)
    }

  };

  return (


    <form
      onSubmit={handleSubmit}
      ref={modalRef}
      className="w-[90%] max-w-md md:w-[45%] bg-[#282828] text-white rounded-2xl shadow-lg z-50 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 p-7 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 justify-center mb-4">
        <FiSend className="text-red-600 text-3xl" />
        <h1 className="text-red-600 font-amaranth font-bold text-3xl leading-none">
          Create Post
        </h1>
      </div>

      {/* Tweet Input */}
      <div>
        <div>
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's happening?"
            maxLength={250}  // your max length
            className="w-full h-28 resize-none  text-white p-4 rounded-lg border border-gray-700 bg-transparent focus:border-blue-500 hover:border-gray-500 outline-none transition-all duration-200"
          />
          <p className="text-xs text-gray-400 mt-1 text-right select-none">
            {tweet.length}/250
          </p>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="flex items-center gap-2 text-sm text-gray-400 mb-1 cursor-pointer select-none">
          <FiImage className="text-gray-400 text-xl" />
          Attach Image (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-200 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-[#2b2b2b] file:text-white hover:file:bg-[#3a3a3a] transition-all cursor-pointer"
        />

        {imagePreview && (
          <div className="mt-3 flex justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-64 h-40 object-cover rounded-lg border border-gray-700 shadow-md"
            />
          </div>
        )}
      </div>

      {/* Visibility */}
      <div className="flex items-center gap-6">
        <label className="text-sm text-gray-300 font-medium select-none">Visibility:</label>
        <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            value="public"
            checked={visibility === "public"}
            onChange={(e) => setVisibility(e.target.value)}
            className="accent-red-600"
          />
          Public
          <Globe size={15} className="text-red-400" />
        </label>
        <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            value="private"
            checked={visibility === "private"}
            onChange={(e) => setVisibility(e.target.value)}
            className="accent-red-600"
          />
          Private
          <Lock size={15} className="text-red-400" />
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="flex items-center gap-2 text-md rounded-lg px-5 py-2 cursor-pointer
          border border-red-500 bg-[#2c2c2c] hover:bg-[#3a3a3a] text-red-400 shadow-sm
          active:border-red-600 active:text-red-500 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className={`flex items-center gap-2 text-md rounded-lg px-5 py-2 border-b-2 border-l-2 border-r-2 active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500 border-red-700 text-white transition disabled:opacity-60 disabled:cursor-not-allowed ${!tweet.trim() ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          disabled={!tweet.trim()}
        >
          {isLoading ? (
            <span>Processing...</span> // or your Spinner component
          ) : (
            <>
              <FiSend />
              Post
            </>
          )}
        </button>
      </div>
    </form>

  )
};

export default TweetForm;
