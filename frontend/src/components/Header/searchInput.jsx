import React from 'react'
import { useNavigate } from 'react-router-dom';

const searchInput = () => {

    const navigate = useNavigate()

    const handleSearch = async (e) => {
        try {
            e.preventDefault();
            const searchQuery = e.target.search.value; // Get input value
             // Update URL with search query
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    
            // Send search query to backend via fetch
            const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            console.log("Backend Response:", data);
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Explore Page</h1>
    
          {/* Search Bar */}
          <div className="flex items-center gap-2 border rounded-lg p-2 shadow-md w-full max-w-md">
            <form action=""
            onSubmit={handleSearch} 
            >
                <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-3 py-2 outline-none"
                placeholder="Search"
                autoComplete="off"
                />
        
                {/* Clear Button */}
                {searchQuery && (
                <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search query"
                >
                    ❌
                </button>
                )}
        
                {/* Search Button */}
                <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                aria-label="Search"
                title="Search"
                >
                🔍
                </button>
            </form>
          </div>
        </div>
      );
}

export default searchInput