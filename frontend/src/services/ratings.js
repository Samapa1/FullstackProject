import axios from "axios";
import apiService from "./apiservice";

const baseUrl = "http://localhost:3003/api/ratings";

const getAll = async () => {
  const response = await axios.get(baseUrl, apiService.getConfig());
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, apiService.getConfig());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    apiService.getConfig(),
  );
  return response;
};

export default { create, getAll, remove };
