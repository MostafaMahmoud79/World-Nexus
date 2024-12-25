import React from 'react';
import { createContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CountryDetails from "./pages/CountryDetails";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  // Update local storage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    // Provide theme and toggleTheme to child components
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/details/:countryCode"
              element={<CountryDetails />}
            ></Route>
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;