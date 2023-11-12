import React, { useEffect } from "react";
import services from "./services/countries";
import { useState } from "react";
import Filter from "./components/Filter";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  // const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("hello from useEffect");

    // fetching all the countries when the component mounts
    services.getAll().then((response) => {
      console.log("promise resolved");
      setAllCountries(response);
      setIsLoading(false);
    });
  }, []);

  console.log("all countries: ", allCountries);

  // for (const country of allCountries) {
  //   console.log("common name: ", country.name.common);
  // }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);

    // Filtering countries based on the search query
    // const filteredCountries = allCountries.filter((country) => {
    //   return country.name.common
    //     .toLowerCase()
    //     .includes(searchQuery.toLowerCase());
    // });

    // setFilteredCountries(filteredCountries);
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
                </div>
              ))
          ) : (
            // <p>many results</p>
            allCountries
              .filter((country) =>
                country.name.common
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((country) => (
                <div key={country.name.common}>
                  <p>{country.name.common}</p>
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
