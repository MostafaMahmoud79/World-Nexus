import React from 'react';
import { Link } from "react-router-dom";
import sunIcon from "../icons/sun.svg";
import moonIcon from "../icons/moon.svg";
import "./Navbar.css";
import { useContext } from "react";
import { ThemeContext } from "../App";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link
          style={{ fontWeight: 800, fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
          className="navbar-brand"
          to="/"
        >
          Where in the world?
        </Link>
        <button
          className="navbar-dark-mode-toggle d-flex btn no-border-btn"
          onClick={toggleTheme}
        >
          <img src={theme === "light" ? moonIcon : sunIcon} alt="" />
          <span className="toggle-text mx-2">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;