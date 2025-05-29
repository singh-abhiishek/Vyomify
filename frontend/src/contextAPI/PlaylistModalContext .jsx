import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/slices/authSlice";
import { useAddVideoToPlaylistsMutation, useGetUserPlaylistsNameQuery } from "../store/slices/playlistApiSlice";
import { showToastMessage } from "../utils/showToaster";

const PlaylistModalContext = createContext();

export const PlaylistModalProvider = ({ children }) => {

    const [isPF1Open, setIsPF1Open] = useState(false);
    const [isPF2Open, setIsPF2Open] = useState(false);

    const [selectedPlaylists, setSelectedPlaylists] = useState([]);

    // take user from store and req to backend for user playlists names
    const user = useSelector(state => state.auth?.userData?.user)
    const { data: response, refetch } = useGetUserPlaylistsNameQuery(user?._id, { skip: !user?._id })

    const userPlaylists = response?.data || [];
    // console.log(userPlaylists)
    const userPlaylistsName = userPlaylists.filter((playlist) => 
        playlist?.name !== "Watch Later"
    )
    // console.log("from PlaylistModalProvider", userPlaylistsName)

    const openPF1Modal = () => setIsPF1Open(true);
    const closePF1Modal = () => setIsPF1Open(false);

    const openPF2Modal = () => setIsPF2Open(true);
    const closePF2Modal = () => setIsPF2Open(false);

    const closeModal = () => {
        setIsPF1Open(false);
        setShowCreateForm(false);
    };

    // Function to handle the API call to add video to selected playlists
    const [addVideoToPlaylists, isLoading] = useAddVideoToPlaylistsMutation()
    const handleAddToPlaylists = async (videoId) => {
        if (selectedPlaylists.length === 0) {
            // console.log("handleAddToPlaylists from PlaylistModalProvider - please select playlist")
            return;
        }

        try {
            const response = await addVideoToPlaylists({ videoId, playlistIds: selectedPlaylists }).unwrap();

            if (response) {
                // Handle successful response (e.g., show success message)
                closePF1Modal()
                // console.log("handleAddToPlaylists from PlaylistModalProvider response", response)
                showToastMessage("video added to playlist", "success")
            }
        } catch (error) {
            console.error("handleAddToPlaylists from PlaylistModalProvider error", error);
            showToastMessage("video not added to playlist", "error")
        }
    };


    return (
        <PlaylistModalContext.Provider
            value={{
                isLoading,
                isPF1Open,
                openPF1Modal,
                closePF1Modal,
                isPF2Open,
                openPF2Modal,
                closePF2Modal,
                closeModal,
                userPlaylistsName,
                setSelectedPlaylists,
                selectedPlaylists,
                handleAddToPlaylists,
                refetch
            }}
        >
            {children}
        </PlaylistModalContext.Provider>
    );
};


export const usePlaylistModal = () => {
    const context = useContext(PlaylistModalContext)
    if (!context) {
        throw new Error("usePlaylistModal must be used inside a PlaylistModalProvider");
    }
    return context
}
