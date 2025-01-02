import axios from "axios";
import apiService from "./apiservice";

const baseUrl = "http://localhost:3003/api/reservations";

const getAll = async () => {
  const response = await axios.get(baseUrl, apiService.getConfig());
  return response.data;
};

const create = async (reservationData) => {
  const newObject = {
    userId: reservationData.user.id,
    bookId: reservationData.book.id,
  };
  const response = await axios.post(baseUrl, newObject, apiService.getConfig());
  return response.data;
};

const collect = async (data) => {
  const loanData = {
    userId: data.userId,
    bookId: data.bookId,
  };
  const response = await axios.post(
    `${baseUrl}/${data.reservationId}`,
    loanData,
    apiService.getConfig(),
  );
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    apiService.getConfig(),
  );
  return response.data;
};

export default { getAll, create, remove, collect };
