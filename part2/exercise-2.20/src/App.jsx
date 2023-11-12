import React, { useEffect } from "react";
import services from "./services/countries";
import { useState } from "react";
import Filter from "./components/Filter";
import getWeather from "./services/weather";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    console.log("hello from useEffect");

    // fetching all the countries when the component mounts
    services.getAll().then((response) => {
      console.log("promise resolved");
      setAllCountries(response);
      setIsLoading(false);
    });
  }, []);

  const handleShow = (country) => {
    console.log("country selected: ", country);
    setSelectedCountry(country);

    getWeather(country.capital)
      .then((weatherData) => {
        setSelectedCountry({ ...country, weather: weatherData });
        setTimeout(() => {
          console.log("Weather Data Fetched:", weatherData);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });

    console.log("outside timeout selected country: ", selectedCountry);

    setTimeout(() => {
      console.log("inside timeout selected country: ", selectedCountry);
    }, 3000);

    console.log("after timeout selected country: ", selectedCountry);

    setTimeout(() => {
      setSelectedCountry(null);
    }, 3000);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Filter searchQuery={searchQuery} handleSearch={handleSearch} />

      {isLoading ? (
        <p>Loading...</p>
      ) : searchQuery ? (
        <ul>
          {allCountries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          ).length > 10 ? (
            <p>Too many matches, specify another filter.</p>
          ) : allCountries.filter((country) =>
              country.name.common
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            ).length === 1 ? (
            // <p>only result</p>
            allCountries
              .filter((country) =>
                country.name.common
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((country) => (
                <div key={country.name.common}>
                  <h1>{country.name.common}</h1>
                  <p>Capital: {country.capital}</p>
                  <p>Area: {country.area}</p>
                  <div>
                    <h3>Languages: </h3>
                    <ul>
                      {Object.values(country.languages).map(
                        (language, langIndex) => (
                          <li key={langIndex}>{language}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <p style={{ fontSize: "10em", margin: "0" }}>
                    {country.flag}
                  </p>
                  <h2>Weather in {country.capital}</h2>
                  <p>temperature in Celcius {country.weather.main.temp}</p>
                  <image alt="weather image" />
                  <p>wind {country.weather.wind.speed} m/s</p>
                </div>
              ))
          ) : selectedCountry ? (
            // <p>selected country</p>
            <div>
              <h1>{selectedCountry.name.common}</h1>
              <p>Capital: {selectedCountry.capital}</p>
              <p>Area: {selectedCountry.area}</p>
              <div>
                <h3>Languages: </h3>
                <ul>
                  {Object.values(selectedCountry.languages).map(
                    (language, langIndex) => (
                      <li key={langIndex}>{language}</li>
                    )
                  )}
                </ul>
              </div>
              <p style={{ fontSize: "10em", margin: "0" }}>
                {selectedCountry.flag}
              </p>
              <h2>Weather in {selectedCountry.capital}</h2>
              <p>temperature in Celcius {selectedCountry.weather.main.temp}</p>
              <image alt="weather image" />
              <p>wind {selectedCountry.weather.wind.speed} m/s</p>
            </div>
          ) : (
            allCountries
              .filter((country) =>
                country.name.common
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((country) => (
                <div key={country.name.common}>
                  <p
                    style={{
                      display: "inline-block",
                      padding: "5px",
                      margin: "0",
                    }}
                  >
                    {country.name.common}
                  </p>
                  <button
                    onClick={() => handleShow(country)}
                    style={{ display: "inline-block" }}
                  >
                    show
                  </button>
                </div>
              ))
          )}
        </ul>
      ) : (
        <p>ready</p>
      )}
    </div>
  );
};

export default App;
