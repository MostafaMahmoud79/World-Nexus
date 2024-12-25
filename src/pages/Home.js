import React from 'react';
import { Suspense, lazy, useState } from "react";
import FilterRegion from "../components/FilterRegion";
import Searchbar from "../components/Searchbar";
import "./Home.css";
const LazyCountryList = lazy(() => import("../components/CountryList"));

const Home = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  return (
    <div className="container mt-5">
      <div
        className="search-filter-container d-flex justify-content-between"
        id="search-filter-container"
      >
        <Searchbar onSearchChange={setSearchCountry} />
        <FilterRegion onSelectRegion={setSelectedRegion} />
      </div>
      <Suspense>
        <LazyCountryList
          searchCountry={searchCountry}
          selectedRegion={selectedRegion}
        />
      </Suspense>
    </div>
  );
};

export default Home;
