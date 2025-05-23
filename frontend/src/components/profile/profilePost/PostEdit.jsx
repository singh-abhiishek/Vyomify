import React, { useRef, useState } from "react";
import { showToastMessage } from "../../../utils/showToaster";
import { Spinner } from "../../../utils/loadingIndicator";
import { useEditTweetMutation } from "../../../store/slices/tweetApiSlice";

const PostEdit = ({
    modalRef3,
    tweetId,
    content,
    tweetFile,
    isPublished,
    setIsPostEditFormOpen,
}) => {

    const [tweet, setTweet] = useState(content);
    const [imageFile, setImageFile] = useState(tweetFile);
    const [imagePreview, setImagePreview] = useState(tweetFile);
    const [visibility, setVisibility] = useState(isPublished);

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
        setVisibility(true);
        setIsPostEditFormOpen(false)
    };

    const [editTweet, { isLoading }] = useEditTweetMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tweet.trim()) return showToastMessage("Tweet text is required!", "info");

        const formData = new FormData();
        formData.append("tweet", tweet.trim());
        formData.append("visibility", visibility);
        if (imageFile) formData.append("tweetFile", imageFile);

        for (let pair of formData.entries()) {  //NOTE: direct console.log(formData) gives empty object(don't know why)
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            const response = await editTweet({
                tweetId,
                formData,
            }).unwrap()

            if (response.success) {
                showToastMessage("Post Edited Successfully", "success")
            }
        } catch (error) {
            console.log("error while editing post", error)
            showToastMessage("Error while editing post", "error")
        }
        finally{
          setIsPostEditFormOpen(false)
        }
    };

    return (

        <form
            onSubmit={handleSubmit}
            ref={modalRef3}
            className="w-[30%] sm:w-[50%] lg:w-[40%] bg-[#282828] text-white rounded-2xl shadow-lg z-40 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 p-7 space-y-2"
        >
            {/* Tweet Input */}
            <div>
                <textarea
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                    placeholder="What's happening?"
                    className="w-full h-28 resize-none bg-[#121212] text-white p-3 rounded-lg border border-[#3d3d3d] focus:outline-none focus:ring-1 focus:ring-white"
                    required
                />
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm text-gray-400 mb-1">Attach Image (optional)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-200 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-[#2b2b2b] file:text-white hover:file:bg-[#3a3a3a] transition-all"
                />

                {imagePreview && (
                    <div className="mt-3">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-80 h-50 object-cover rounded-lg border border-gray-700"
                        />
                    </div>
                )}
            </div>

            {/* Visibility */}
            <div className="flex items-center gap-4">
                <label className="text-sm text-gray-300 font-medium ">Visibility:</label>
                <label className="inline-flex items-center gap-1 text-sm ">
                    <input
                        type="radio"
                        value="true"
                        checked={visibility === true}
                        onChange={(e) => setVisibility(e.target.value === "true")}
                        className="accent-blue-500"
                    />
                    Public
                </label>
                <label className="inline-flex items-center gap-1 text-sm">
                    <input
                        type="radio"
                        value="false"
                        checked={visibility === false}
                        onChange={(e) => setVisibility(e.target.value === "true")}
                        className="accent-blue-500"
                    />
                    Private
                </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="text-md rounded-lg relative inline-flex items-center justify-center px-4 py-1.5 m-1 cursor-pointer
          border border-red-500 bg-[#2c2c2c] hover:bg-[#3a3a3a] text-red-400 shadow-sm
          active:border-red-600 active:text-red-500"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className={`text-md rounded-lg relative inline-flex items-center justify-center px-4 py-1.5 m-1 border-b-2 border-l-2 border-r-2  active:border-red-700 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-500  border-red-700 text-white ${!tweet.trim() ? "opacity-60 cursor-not-allowed" : "cursor-pointer "
                        }`}
                    disabled={!tweet.trim()}
                >
                    {isLoading ? <Spinner name='' /> : "Edit"}
                </button>
            </div>
        </form>

    );
};

export default PostEdit;
