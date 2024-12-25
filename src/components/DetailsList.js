import React from 'react';
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { API_COUNTRY_CODE } from "../services/api";
import { useNavigate } from "react-router-dom";
import spinner from "../icons/spin.gif";

const DetailsList = () => {
  const [countryDetails, setCountryDetails] = useState({});
  const { countryCode } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // استخدام useCallback لتحسين الأداء ولتجنب تعريف الدالة في كل مرة
  const fetchCountryDetails = useCallback(() => {
    axios
      .get(
        `${API_COUNTRY_CODE}${countryCode}?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,translations,borders,cca3`
      )
      .then((response) => {
        setCountryDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error when fetching countries", error);
        setLoading(false);
      });
  }, [countryCode]);  // يتم تعريف الدالة فقط عندما يتغير countryCode

  useEffect(() => {
    if (countryCode.toUpperCase() === "ISR") {
      setLoading(false);
    } else {
      fetchCountryDetails();
    }
  }, [countryCode, fetchCountryDetails]);  // إضافته في المصفوفة لضمان أن التبعيات ثابتة

  const handleBorderClick = (countryCode) => {
    navigate(`/details/${countryCode}`);
  };

  return (
    <div className="row align-items-center gy-5">
      {loading ? (
        <div className="loading-container d-flex justify-content-center m-auto">
          <img className="loading-img" src={spinner} alt="Loading..." />
        </div>
      ) : Object.values(countryDetails).length > 0 ? (
        <>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="country-flag">
              <img
                style={{ width: "100%" }}
                src={countryDetails.flags.svg}
                alt={countryDetails.flags.alt}
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 section-details d-flex flex-column gap-3">
            <div className="country-name">{countryDetails.name.common}</div>
            <div className="country-details row gy-5">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xsm-12">
                <div>
                  <span>Native Name: </span>
                  {countryDetails.name.nativeName &&
                    Object.values(countryDetails.name.nativeName)[0]?.official}
                </div>
                <div>
                  <span>Population: </span>
                  {countryDetails.population.toLocaleString()}
                </div>
                <div>
                  <span>Region: </span>
                  {countryDetails.region}
                </div>
                <div>
                  <span>Sub Region: </span>
                  {countryDetails.subregion}
                </div>
                <div>
                  <span>Capital: </span>
                  {countryDetails.capital}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xsm-12">
                <div>
                  <span>Top Level Domain: </span>
                  {countryDetails.tld}
                </div>
                <div>
                  <span>Currencies: </span>
                  {countryDetails.currencies &&
                    Object.values(countryDetails.currencies)
                      .filter(
                        (currency) => currency.name !== "Israeli new shekel"
                      )
                      .map((currency) => currency.name)
                      .join(", ")}
                </div>
                <div>
                  <span>Languages: </span>
                  {countryDetails.languages &&
                    Object.values(countryDetails.languages).join(", ")}
                </div>
              </div>
            </div>

            <div className="border-countries d-flex mt-3 gap-3">
              {countryDetails.borders && countryDetails.borders.length > 0 && (
                <span>Border countries: </span>
              )}
              <div className="border-buttons-container d-flex flex-wrap gap-3">
                {countryDetails.borders &&
                  countryDetails.borders
                    .filter((border) => border !== "ISR")
                    .map((border) => (
                      <button
                        className="btn btn-light border-buttons"
                        key={border}
                        onClick={() => handleBorderClick(border)}
                      >
                        {border}
                      </button>
                    ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="noCountryFound">No Country Found!</p>
      )}
    </div>
  );
};

export default DetailsList;