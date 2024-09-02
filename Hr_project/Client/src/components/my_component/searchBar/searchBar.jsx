import React from "react";
import { AiOutlineSearch } from "react-icons/ai"; // Import the search icon

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search by job title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="ml-6 mt-6 w-[500px] rounded-full border p-3 bg-slate-100 pl-10 pr-4 text-gray-950 focus:border-blue-500 focus:outline-none"
      />
      <AiOutlineSearch className="absolute left-10 top-12 h-5 w-5 -translate-y-1/2 text-gray-500" />{" "}
      {/* Position the icon */}
    </div>
  );
};

export default SearchBar;
