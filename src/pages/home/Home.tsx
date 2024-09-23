import React, { useState } from "react";
import PopulationChart from "../../components/PopulationChart";
import EducationSpendingChart from "../../components/EducationSpendingChart";
import GDPGrowthChart from "../../components/GDPGrowthChart";
import UnemploymentChart from "../../components/UnemploymentChart";
import InflationChart from "../../components/InflationChart";
import PopulationAgeGenderChart from "../../components/PopulationAgeGenderChart";
import HealthcareSpendingChart from "../../components/HealthcareSpendingChart"; 
import europeanCountries from "../../data/europeanCountries";
import LifeExpectancyChart from "../../components/LifeExpectancyChart";
import "./home.scss";

interface HomeProps {
  selectedCountry: string;
  setSelectedCountry: (countryCode: string) => void;
}

const Home: React.FC<HomeProps> = ({ selectedCountry, setSelectedCountry }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

 
  const selectedCountryObject = europeanCountries.find(
    (country) => country.value === selectedCountry
  );

 
  const selectedCountryName = selectedCountryObject
    ? selectedCountryObject.label
    : "nieznany kraj";


  window.addEventListener("resize", () => {
    setIsMobile(window.innerWidth <= 768);
  });

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="home">
      {isMobile && (
        <div className="dropdown">
          <label htmlFor="country-select">Choose a country:</label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="dropdown-select"
          >
            {europeanCountries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="box box1">
        <PopulationChart
          countryCode={selectedCountry}
          countryName={selectedCountryName}
        />
      </div>
      <div className="box box2">
        <EducationSpendingChart
          countryCode={selectedCountry}
          countryName={selectedCountryName}
        />
      </div>
      <div className="box box3">
        <GDPGrowthChart
          countryCode={selectedCountry}
          countryName={selectedCountryName}
        />
      </div>
      <div className="box box4">
        <UnemploymentChart
          countryCode={selectedCountry}
          countryName={selectedCountryName}
        />
      </div>
      <div className="box box5">
        <InflationChart
          countryCode={selectedCountry}
          countryName={selectedCountryName}
        />
      </div>
      <div className="box box6">
        <PopulationAgeGenderChart
          countryCode={selectedCountry}
          countryName={selectedCountryName}
        />
      </div>
      <div className="box box7">
        <HealthcareSpendingChart
          countryCode={selectedCountry}
          countryName={selectedCountryName}
        />
      </div>
      <div className="box box8">
        <LifeExpectancyChart
          countryCode={selectedCountry}
          countryName={selectedCountryName}
        />
      </div>
    </div>
  );
};

export default Home;
