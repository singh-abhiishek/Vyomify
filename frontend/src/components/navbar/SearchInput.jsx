import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {

  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(searchQuery)

    if (!searchQuery.trim()) return; // Clean empty search
    navigate(`/explore?query=${searchQuery}`);
  }

  return (
    <div className="ml-9">
      <div className="flex items-center w-[150px] sm:w-[400px] md:w-[460px] lg:w-[600px] sm:p-0.5 md:p-1 lg:p-1 max-w-xl border border-gray-700 rounded-full bg-transparent">
        {/* Search Icon */}
        {/* <span className="p-2 bg-gray-700/50 rounded-full text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 24 24">
            <path clipRule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z" fillRule="evenodd"></path>
          </svg>
        </span> */}

        {/* Input Field */}
        <form onSubmit={handleSearch} className="flex-grow relative">
          <input
            type="text"
            placeholder="Search..."
            name="searchBox"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
            className="text-white md:text-[14px] lg:text-[16px] py-1 pl-2 pr-10 mr-1 w-full bg-transparent outline-none "
          />

          {/* Clear Button (X) */}

          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery("")}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="22" width="22" viewBox="0 0 24 24">
                <path d="M12.71 12l8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path>
              </svg>
            </button>
          )}

          {/* Search Button */}
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
            <svg
              // className='md:h-[24px] md:w-[24px]'
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="23" width="23" viewBox="0 0 24 24">
              <path clipRule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z" fillRule="evenodd"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchInput