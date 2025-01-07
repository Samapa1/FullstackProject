import axios from "../../utils/apiClient.js";
import apiService from "./apiservice";

const getAll = async () => {
  const response = await axios.get("/books");
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`books/${id}`);
  return response.data;
};

const create = async (newBook) => {
  const response = await axios.post("/books", newBook, apiService.getConfig());
  return response.data;
};

const update = async (updatedBook) => {
  const response = await axios.put(
    `books/${updatedBook.id}`,
    updatedBook,
    apiService.getConfig(),
  );
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`books/${id}`, apiService.getConfig());
};

export default { getAll, getOne, create, update, remove };
