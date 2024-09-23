import React from "react";
import europeanCountries from "../../data/europeanCountries";
import "./menu.scss";

interface MenuProps {
  isDarkMode: boolean;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
}

const Menu: React.FC<MenuProps> = ({ isDarkMode, selectedCountry, setSelectedCountry }) => {
  return (
    <div className={`menu ${isDarkMode ? 'dark' : 'light'}`}>
      {europeanCountries.map((country) => (
        <div
          className="item"
          key={country.value}
          onClick={() => setSelectedCountry(country.value)}
        >
          <span className={`listItemTitle ${selectedCountry === country.value ? 'active' : ''}`}>
            {country.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Menu;
