import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating object:", error.response.data);
      throw error; // Rethrow the error for the calling code to handle
    });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  console.log("Removing");

  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(() => console.log(`${id} removed`));
};

export default {
  getAll,
  create,
  update,
  remove,
};
