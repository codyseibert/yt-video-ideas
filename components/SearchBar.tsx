import React from "react";

const SearchBar = ({
  search, setSearch
}: {
  search: string,
  setSearch: (newSearch: string) => void
}) => {
  return (
    <div>
      <div className="content">
        <div className="mt-2 flex gap-x-2">
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search for a topic idea......."
            type="search"
            className="border border-gray-300 rounded-md w-full p-2"
          />
          <button className="bg-blue-300 text-white p-2 rounded-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
