import React from 'react';
import BackButton from "../components/BackButton";
import DetailsList from "../components/DetailsList";
import "./CountryDetails.css";

export const CountryDetails = () => {
  return (
    <div className="container d-flex flex-column py-5 gap-5">
      <BackButton />
      <DetailsList />
    </div>
  );
};

export default CountryDetails;
