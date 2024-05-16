import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = async () => {
    navigate("/search/" + searchTerm);
  };
  return (
    <div className="px-8 w-full flex justify-center">
      <div className="flex justify-evenly my-4 w-2/3 rounded-md border-2 border-black">
        <div className="w-11/12">
          <input
            type="text"
            name="searchTerm"
            id="searchTerm"
            value={searchTerm}
            className="w-full border-black p-2 rounded-l-md"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <button
          className="w-1/12 bg-gray-200 rounded-r-md border-l-2 border-black flex justify-center items-center"
          onClick={() => handleSearch()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
