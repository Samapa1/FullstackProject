import axios from "../../utils/apiClient.js";
import apiService from "./apiservice";

const getAll = async () => {
  const response = await axios.get("/loans", apiService.getConfig());
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(
    "/loans",
    newObject,
    apiService.getConfig(),
  );
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`loans/${id}`, apiService.getConfig());
  return response.data;
};

const update = async (id) => {
  const response = await axios.post(
    `loans/${id}`,
    null,
    apiService.getConfig(),
  );
  return response.data;
};

export default { getAll, create, remove, update };
