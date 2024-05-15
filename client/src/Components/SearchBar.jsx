import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/blogs/search/${searchTerm}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="flex justify-evenly m-4 w-2/3 rounded-md border-2 border-black">
      <div className="w-1/12 item-center">🔍</div>
      <div className="w-10/12">
        <input
          type="text"
          name="searchTerm"
          id="searchTerm"
          value={searchTerm}
          className="w-full border-black border-l-2 px-2"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <button
        className="w-1/12 bg-gray-200 rounded-r-md"
        onClick={() => handleSearch()}
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
