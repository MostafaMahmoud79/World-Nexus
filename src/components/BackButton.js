import React from 'react';
import { useNavigate } from "react-router-dom";
import lightBackIcon from "../icons/back-icon-light.svg";
import darkBackIcon from "../icons/back-icon-dark.svg";
import { useContext } from "react";
import { ThemeContext } from "../App";

const BackButton = () => {
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const goBackAction = () => {
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * A function that navigates back one step in the browser's history stack when called.
   * This is used to implement the "Back" button in the CountryDetails component.
   */
/******  bd4ba074-3107-47e3-8475-d6fcb13a0a19  *******/    navigate(-1);
  };
  return (
    <div className="d-flex align-items-center justify-center">
      <button className="btn btn-light back-button" onClick={goBackAction}>
        <span>
          <img
            className="back-icon"
            src={theme === "light" ? lightBackIcon : darkBackIcon}
            alt=""
          />
        </span>
        &nbsp;Back
      </button>
    </div>
  );
};

export default BackButton;