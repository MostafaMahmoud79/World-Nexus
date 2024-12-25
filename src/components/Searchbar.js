import React from 'react';
// Searchbar component that takes an onSearchChange prop function
const Searchbar = ({ onSearchChange }) => {
  // handleInputChange function that updates the search query
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="input-group" id="searchBar">
      <span className="input-group-text border-end-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </span>
      <input
        type="text"
        className="form-control border-start-0"
        id="searchCountry"
        placeholder="Search for a country..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Searchbar;
