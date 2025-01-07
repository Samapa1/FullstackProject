import axios from "../../utils/apiClient.js";
import apiService from "./apiservice";

const getAll = async () => {
  const response = await axios.get("/ratings", apiService.getConfig());
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(
    "/ratings",
    newObject,
    apiService.getConfig(),
  );
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`ratings/${id}`, apiService.getConfig());
  return response;
};

export default { create, getAll, remove };
