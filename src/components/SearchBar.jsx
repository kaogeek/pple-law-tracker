import React from "react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="w-full lg:w-auto mb-2 lg:mb-0">
      <input
        type="text"
        placeholder="ค้นหาร่างกฎหมาย..."
        className="border p-2 w-full rounded-md"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;