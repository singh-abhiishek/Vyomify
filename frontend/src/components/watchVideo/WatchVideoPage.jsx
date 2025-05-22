import { useLocation } from 'react-router-dom'
import LeftPartWatchVideo from './leftPart/LeftPartWatchVideo'
import RightPartWatchVideo from './rightPart/RightPartWatchVideo'

const WatchVideoPage = () => {
  const { state: videoId } = useLocation()
  return (

    <div className='dark:bg-black flex text-white flex-col sm:flex-row gap-5 '>

      {/* left part  */}
      <div className='w-full sm:w-[60%] md:w-[65%] lg:w-[70%]'>
        <LeftPartWatchVideo videoId={videoId} />
      </div>

      {/* right part  */}
      <div className='w-full sm:w-[40%] md:w-[35%] lg:w-[30%]'>
        <RightPartWatchVideo />
      </div>

    </div>
  )
}

export default WatchVideoPage