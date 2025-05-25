import React, { useEffect } from 'react'
import VideoGridItem from '../../../components/videoGrid/VideoGridItem'
import { useSearchParams } from 'react-router-dom';
import AllVideosScreen from './AllVideosScreen';
import SearchedVideos from './SearchedVideos';

const Home = () => {

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    if (searchQuery) {
      console.log("Search for:", searchQuery);
    }
  }, [searchQuery]);



  return (
    <div className='w-full h-full text-white bg-black '>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {!searchQuery && <AllVideosScreen />}
        {searchQuery && <SearchedVideos searchQuery={searchQuery} />}
      </div>
    </div>
  )
}

export default Home