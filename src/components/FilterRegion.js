import React from 'react';
// FilterRegion component receives an onSelectRegion prop as a function to handle the region selection
const FilterRegion = ({ onSelectRegion }) => {
  // handleRegionChange function is defined to handle the change event of the select element
  const handleRegionChange = (e) => {
    onSelectRegion(e.target.value);
  };
  return (
    <select
      className="form-select"
      id="filterRegion"
      aria-label="Default select example"
      onChange={handleRegionChange}
    >
      <option value="">Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
};

export default FilterRegion;
