import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_COUNTRIES } from "../services/api";
import axios from "axios";
import spinner from "../icons/spin.gif";

// CountryList component receives searchCountry and selectedRegion as props
const CountryList = ({ searchCountry, selectedRegion }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  const navigate = useNavigate();

  // Fetching all countries just once when the component mounts
  useEffect(() => {
    if (isMounted.current) {
      fetchAllCountries();
      isMounted.current = false;
    }
  }, []);

  const fetchAllCountries = () => {
    axios
      .get(
        `${API_COUNTRIES}all?fields=flags,name,population,region,capital,cca3`
      )
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error when fetching countries", error);
        setLoading(false);
      });
  };

  // Filtering countries based on searchCountry
  const FilterCountry = countries
    .filter(
      (country) =>
        country.name.common
          .toLowerCase()
          .includes(searchCountry.toLowerCase()) &&
        (selectedRegion === "" || country.region === selectedRegion) &&
        country.name.common !== "Israel"
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  // Function to handle card click and navigate to the country details page
  const handleCardClick = (countryCode) => {
    navigate(`/details/${countryCode}`);
  };

  console.log(FilterCountry.length);

  return (
    <div className="d-flex flex-wrap flex-start gap-5 my-5">
      {loading ? (
        <div className="loading-container d-flex justify-content-center m-auto">
          <img className="loading-img" src={spinner} alt="Loading..." />
        </div>
      ) : FilterCountry.length > 0 ? (
        FilterCountry.map((country) => (
          <div
            className="card"
            id="card"
            key={country.name.common}
            onClick={() => handleCardClick(country.cca3)}
          >
            <img src={country.flags.svg} className="card-img-top" alt="..." />
            <div className="card-body m-0 d-flex  flex-column justify-content-center">
              <h5 className="card-title">{country.name.common}</h5>
              <p className="card-text mb-0">
                <span className="fw-bold">Popualtion: </span>
                {country.population.toLocaleString()}
              </p>
              <p className="card-text mb-0">
                <span className="fw-bold">Region: </span>
                {country.region}
              </p>
              <p className="card-text">
                <span className="fw-bold">Capital: </span>
                {country.capital}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="noCountryFound">No Country Found!</p>
      )}
    </div>
  );
};

export default CountryList;
