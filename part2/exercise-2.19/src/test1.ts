// <p>only result</p>

// allCountries
//               .filter((country) =>
//                 country.name.common
//                   .toLowerCase()
//                   .includes(searchQuery.toLowerCase())
//               )
//               .map((country) => (
//                 <div key={country.name.common}>
//                   <h1>{country.name.common}</h1>
//                   <p>Capital: {country.capital}</p>
//                   <p>Area: {country.area}</p>
//                   <div>
//                     <h3>Languages: </h3>
//                     <ul>
//                       {Object.values(country.languages).map(
//                         (language, langIndex) => (
//                           <li key={langIndex}>{language}</li>
//                         )
//                       )}
//                     </ul>
//                   </div>
//                   <p style={{ fontSize: "10em", margin: "0" }}>
//                     {country.flag}
//                   </p>
//                 </div>
//               ))

// <p>many results</p>

// allCountries
// .filter((country) =>
//   country.name.common
//     .toLowerCase()
//     .includes(searchQuery.toLowerCase())
// )
// .map((country) => (
//   <div key={country.name.common}>
//     <p
//       style={{
//         display: "inline-block",
//         padding: "5px",
//         margin: "0",
//       }}
//     >
//       {country.name.common}
//     </p>
//     <button
//       onClick={() => handleShow(country)}
//       style={{ display: "inline-block" }}
//     >
//       show
//     </button>
//   </div>
// ))
