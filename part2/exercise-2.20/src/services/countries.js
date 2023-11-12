import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  // console.log("getAll: ", `${baseUrl}/all`);
  return request.then((response) => response.data);
};

const get = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  // console.log("get: ", `${baseUrl}/name/${name}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  get,
};
