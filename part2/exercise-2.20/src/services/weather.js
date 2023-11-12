import axios from "axios";
import "dotenv/config";

const apiKey = process.env.OPEN_WEATHER_API;
console.log("apiKey: ", apiKey);
let city = "London";

// by city name and api key
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

console.log("baseUrl: ", baseUrl);

const getWeather = () => {
  const request = axios.get(`${baseUrl}`);
  return request.then((response) => response.data);
};

export default getWeather;
