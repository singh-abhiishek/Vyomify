import { MdPlaylistAdd } from "react-icons/md";
import PF1 from './PF1';
import { usePlaylistModal } from '../../../../contextAPI/PlaylistModalContext ';
import PF2 from './PF2';

const BookMark = ({ video }) => {

    const videoId = video?._id
    console.log(videoId)
    const { openPF1Modal,  isPF1Open, isPF2Open } = usePlaylistModal()

    return (
        <>
            <div
                className="cursor-pointer flex items-center gap-1 px-1.5 py-1.5 md:px-3 md:py-1.5 rounded-2xl border border-gray-700 bg-[#1a1a1a] text-gray-300 text-sm font-medium"
            >
                <MdPlaylistAdd
                    onClick={openPF1Modal}
                    size={17} className="text-gray-400 "
                />
            </div>

            {isPF1Open && <PF1 videoId={videoId} />}

            {isPF2Open && <PF2 />}

        </>
    )
}

export default BookMark