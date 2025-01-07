import axios from "../../utils/apiClient.js";
import apiService from "./apiservice";

const getAll = async () => {
  const response = await axios.get("/users", apiService.getConfig());
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`users/${id}`, apiService.getConfig());
  return response.data;
};

const create = async (newUser) => {
  const response = await axios.post("/users", newUser);
  return response.data;
};

const update = async (userObject) => {
  const response = await axios.post(
    `users/${userObject.id}`,
    userObject,
    apiService.getConfig(),
  );
  return response.data;
};

const remove = async (userObject) => {
  const response = await axios.delete(
    `users/${userObject.id}`,
    apiService.getPasswordConfig(userObject.password),
  );
  return response.data;
};

const adminRemove = async (userObject) => {
  const response = await axios.delete(
    `users/${userObject.id}`,
    apiService.getConfig(),
  );
  return response.data;
};

export default { getAll, getOne, create, update, remove, adminRemove };
