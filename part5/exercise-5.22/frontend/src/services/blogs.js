import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  console.log("create triggered");

  const config = {
    headers: { Authorization: token },
  };

  console.log("token from services create: ", token);

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (blogId, updatedObject) => {
  console.log("blogId from update: ", blogId);

  console.log("updated triggered");

  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseUrl}/${blogId}`,
    updatedObject,
    config
  );

  console.log("response from update service: ", response);
  console.log("response.data from update service: ", response.data);
  // return response.data;
  return response;
};

const remove = async (blogId) => {
  console.log("remove service triggered");

  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${blogId}`, config);

  return response.data;
};

export default { getAll, create, setToken, update, remove };
