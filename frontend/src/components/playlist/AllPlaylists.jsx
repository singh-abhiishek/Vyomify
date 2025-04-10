import React, { useState } from 'react'

const playlists = [
    {
      "title": "Frontend Basics",
      "description": "Learn the fundamentals of HTML, CSS, and JavaScript.",
      "_id": "12222",
      "videos": [
        {
          "id": "vid101",
          "title": "HTML Crash Course",
          "thumbnail": "https://example.com/thumbnails/html.jpg",
          "duration": "8:30"
        },
        {
          "id": "vid102",
          "title": "CSS Grid in 10 Minutes",
          "thumbnail": "https://example.com/thumbnails/css-grid.jpg",
          "duration": "10:00"
        }
      ],
      "owner": {
        "id": "user001",
        "username": "frontendFan",
        "avatar": "https://example.com/avatars/frontendfan.jpg",
        "fullName": "Alice Johnson"
      }
    },
    {
      "title": "Frontend Basics",
      "description": "Learn the fundamentals of HTML, CSS, and JavaScript.",
      "_id": "2214",
      "videos": [
        {
          "id": "vid101",
          "title": "HTML Crash Course",
          "thumbnail": "https://example.com/thumbnails/html.jpg",
          "duration": "8:30"
        },
        {
          "id": "vid102",
          "title": "CSS Grid in 10 Minutes",
          "thumbnail": "https://example.com/thumbnails/css-grid.jpg",
          "duration": "10:00"
        }
      ],
      "owner": {
        "id": "user001",
        "username": "frontendFan",
        "avatar": "https://example.com/avatars/frontendfan.jpg",
        "fullName": "Alice Johnson"
      }
    },
    {
      "title": "Node.js Essentials",
      "description": "Get started with Node.js and backend development.",
      "_id": "563",
      "videos": [
        {
          "id": "vid201",
          "title": "Node.js Introduction",
          "thumbnail": "https://example.com/thumbnails/node-intro.jpg",
          "duration": "12:45"
        }
      ],
      "owner": {
        "id": "user002",
        "username": "backendBoss",
        "avatar": "https://example.com/avatars/backendboss.jpg",
        "fullName": "Mark Patel"
      }
    }
]
  
const AllPlaylists = ({ selectedPlaylists, setSelectedPlaylists }) => {

    const handleChange = (e) => {
      const { value, checked } = e.target;
      // console.log(value, checked)
      setSelectedPlaylists((prev) =>
        checked ? [...prev, value] : prev.filter((id) => id !== value)
      );
    };
    // console.log(selectedPlaylists)

  return (
    <div>
        <h2 className='font-bold font-amaranth '>
            Select Playlists
        </h2>

        {playlists.map((playlist, index) => (
        <label key={index} className="block">
            <input
            type="checkbox"
            value={playlist._id}
            checked={selectedPlaylists.includes(playlist._id)}
            onChange={handleChange}
            className='cursor-pointer'
            />
            <span className="ml-2 text-[14px]">
                {playlist.title}
            </span>
        </label>
        ))}
    </div>
  )
}

export default AllPlaylists