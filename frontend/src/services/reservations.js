import axios from "../../utils/apiClient.js";
import apiService from "./apiservice";

const getAll = async () => {
  const response = await axios.get("/reservations", apiService.getConfig());
  return response.data;
};

const create = async (reservationData) => {
  const newObject = {
    userId: reservationData.user.id,
    bookId: reservationData.book.id,
  };
  const response = await axios.post(
    "/reservations",
    newObject,
    apiService.getConfig(),
  );
  return response.data;
};

const collect = async (data) => {
  const loanData = {
    userId: data.userId,
    bookId: data.bookId,
  };
  const response = await axios.post(
    `/reservations/${data.reservationId}`,
    loanData,
    apiService.getConfig(),
  );
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(
    `/reservations/${id}`,
    apiService.getConfig(),
  );
  return response.data;
};

export default { getAll, create, remove, collect };
