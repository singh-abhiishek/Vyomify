import React, { useRef, useState, useEffect } from 'react'
import { set, useForm } from 'react-hook-form'
import { Input } from '../components/index.js'
import { showToastMessage } from '../utils/showToaster'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from "../store/slices/authSlice.js"
import { useDispatch, useSelector } from 'react-redux';
import { showUploadProfileImagePage as storeShowUploadProfileImagePage } from '../store/slices/authSlice.js'
import { useUploadProfileImagesMutation } from '../store/slices/userApiSlice.js'
import { Spinner } from '../utils/loadingIndicator.jsx'

const UploadProfileImages = () => {

  const verifyUploadProfileImageVisibStatus = useSelector(state => state.auth.isUploadProfileImagePageVisible)
  useEffect(() => {
    if (!verifyUploadProfileImageVisibStatus) {
      navigate("/"); // Agar showImageUploadPage false hai to home pe bhejo
    }
  }, [verifyUploadProfileImageVisibStatus]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  const avatarInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const clearImage = (setFile, inputRef, fieldName) => {
    setFile(null); // Remove Preview
    setValue(fieldName, null); // Clear from react-hook-form
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear input value
    }
  };

  const handleFileChange = (e, fileName, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setValue(fileName, file)
      setFile(URL.createObjectURL(file)); // Image preview ke liye
    } else {
      setFile(null); // Agar file hata di to preview bhi gayab ho jaye
    }
  };

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [UploadProfileImages, { isLoading }] = useUploadProfileImagesMutation()

  const onSubmit = async (data) => {
    const formData = new FormData();
    // console.log(data)

    // agr same source image dono inbox m bhejo to error aa rha hai
    // ENOENT: no such file or directory, unlink 'D:\\coding\\webdev\\projects\\Vyomify\\backend\\public\\temp\\1704207796923 (1)-01.jpeg.jpg'",
    // "errors": [],
    if (data.avatar) {
      formData.append("avatar", data.avatar); // Append only if file exists
    }

    if (data.coverImage) {
      formData.append("coverImage", data.coverImage); // Append only if file exists
    }

    try {
      const userData = await UploadProfileImages(formData).unwrap()
      // console.log("UploadProfileImages in fronted", userData)

      // console.log("userData", userData)
      if (userData.success) {
        dispatch(storeLogin(userData.data))
        dispatch(storeShowUploadProfileImagePage(false))
        showToastMessage("Profile Image uploaded", "success")
      }
    } catch (error) {
      if (error.status === 409) {
        showToastMessage(error.response?.data?.message || "Request failed!", "error");
      } else {
        showToastMessage("Try again after sometime", "error")
        // navigate('/')
      }
    }
  }
  // console.log("after dispathching from uploadprofileimag", useSelector(state => state.auth))


  return (

    <div className="bg-[#111111] flex justify-center items-center min-h-screen p-4">
      <div className="mx-auto w-full max-w-lg md:max-w-xl lg:max-w-2xl dark:bg-dark_50 bg-[#191919] p-8 md:p-12 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg">
        <div className="text-center pb-4">
          <h1 className="text-red-600 font-amaranth font-bold text-4xl md:text-5xl">
            Enhance profile
          </h1>
          {/* Optional subtitle */}
          {/* <h2 className="font-dmSans text-zinc-700 font-bold text-lg md:text-2xl dark:text-light_10">
          by uploading images
      </h2> */}
        </div>

        <div className="w-full mx-auto">
          {/* Divider with text */}
          <div className="flex items-center my-8">
            <div className="border-t border-gray-700 border-dotted flex-grow mr-3" />
            <div className="text-gray-600 text-sm md:text-base whitespace-nowrap">
              by uploading images
            </div>
            <div className="border-t border-gray-700 border-dotted flex-grow ml-3" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row md:gap-10 gap-6 p-2 rounded-xl">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-5 md:w-1/2 w-full">
                <div
                  className="relative border-[0.2px] text-gray-300 p-3 rounded-lg w-full max-w-xs 
                         hover:border-white/50 flex items-center justify-center border-gray-700 bg-transparent
                         focus-within:border-blue-400 outline-none transition-all duration-100 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 stroke-gray-300 dark:stroke-zinc-600"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>

                  <label htmlFor="avatar" className="block cursor-pointer text-center w-full">
                    <span className="text-sm text-gray-400 pl-8">Choose Avatar</span>
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    ref={avatarInputRef}
                    className="hidden"
                    {...register("avatar")}
                    onChange={(e) => handleFileChange(e, "avatar", setAvatarPreview)}
                    accept="image/*"
                  />
                </div>

                {/* Avatar Preview */}
                {avatarPreview && (
                  <div className="relative border-2 border-gray-500 rounded-lg w-40 h-40 flex items-center justify-center bg-gray-800/60 backdrop-blur-lg">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />

                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md 
                             border border-red-700 transition-all duration-200 ease-in-out 
                             hover:bg-red-600 hover:border-red-500 hover:shadow-lg active:bg-red-700 active:border-red-800"
                      onClick={() => clearImage(setAvatarPreview, avatarInputRef, "avatar")}
                      aria-label="Remove avatar preview"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                )}

                {avatarPreview && <p className="text-red-400 text-sm italic mt-1">Avatar preview</p>}
              </div>

              {/* Cover Image Upload */}
              <div className="flex flex-col items-center gap-5 md:w-1/2 w-full">
                <div
                  className="relative border-[0.2px] text-gray-300 p-3 rounded-lg w-full max-w-xs
                         hover:border-white/50 flex items-center justify-center border-gray-700 bg-transparent
                         focus-within:border-blue-400 outline-none transition-all duration-100 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 stroke-gray-300 dark:stroke-zinc-600"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>

                  <label htmlFor="coverImage" className="block cursor-pointer text-center w-full">
                    <span className="text-sm text-gray-400 pl-8">Choose Cover Image</span>
                  </label>
                  <input
                    type="file"
                    id="coverImage"
                    ref={coverImageInputRef}
                    className="hidden"
                    {...register("coverImage")}
                    onChange={(e) => handleFileChange(e, "coverImage", setCoverImagePreview)}
                    accept="image/*"
                  />
                </div>

                {/* Cover Image Preview */}
                {coverImagePreview && (
                  <div className="relative w-40 h-40">
                    <img
                      src={coverImagePreview}
                      alt="Cover Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md 
                             border border-red-700 transition-all duration-200 ease-in-out 
                             hover:bg-red-600 hover:border-red-500 hover:shadow-lg active:bg-red-700 active:border-red-800"
                      onClick={() => clearImage(setCoverImagePreview, coverImageInputRef, "coverImage")}
                      aria-label="Remove cover image preview"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                )}

                {coverImagePreview && (
                  <p className="text-red-400 text-sm italic mt-1">Cover Image preview</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 px-2">
              <button
                type="submit"
                disabled={!avatarPreview && !coverImagePreview}
                className={`w-full text-md text-[16px] rounded-lg relative inline-flex items-center justify-center px-3.5 py-3 border-b-2 border-l-2 border-r-2 
              active:border-red-700 active:shadow-none shadow-lg
              ${!avatarPreview && !coverImagePreview
                    ? "bg-red-500 cursor-not-allowed"
                    : "bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500 cursor-pointer"
                  }
              border-red-700 text-white
            `}
              >
                {!isLoading && <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>}
                {isLoading ? <Spinner name="Uploading..." /> : "Upload"}
              </button>
            </div>
          </form>

          {/* Skip link */}
          <div className="flex justify-end mt-4 px-2">
            <Link
              className="text-sm text-red-600 hover:text-red-700 font-semibold transition duration-150 ease-in-out hover:underline"
              to="/explore-page"
              onClick={() => dispatch(storeShowUploadProfileImagePage(false))}
            >
              skip for now?
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UploadProfileImages