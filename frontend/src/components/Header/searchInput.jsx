import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../Input';

const SearchInput = () => {

    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("")
    const handleSearch = async (e) => {
        try {
            e.preventDefault();
            // const searchQuery = e.target.search.value; // Get input value
            //  // Update URL with search query
            // navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    
            // // Send search query to backend via fetch
            // const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(searchQuery)}`);
            // const data = await response.json();
            // console.log("Backend Response:", data);
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
           <div className="p-4">
      <div className="flex items-center gap-2 p-1 w-full max-w-xl border border-gray-700 rounded-full bg-transparent">
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
            className="text-white py-1.5 pl-3 pr-10 w-full bg-transparent outline-none"
          />

          {/* Clear Button (X) */}
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery("")} className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="22" width="22" viewBox="0 0 24 24">
                <path d="M12.71 12l8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path>
              </svg>
            </button>
          )}

          {/* Search Button */}
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 24 24">
              <path clipRule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z" fillRule="evenodd"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
      );
}

export default SearchInput