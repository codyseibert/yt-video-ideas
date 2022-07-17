import React from "react";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div>
      <div className="content">
        <div className="mt-2 flex gap-x-2">
          <input
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
