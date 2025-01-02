import axios from "axios";

const baseUrl = "http://localhost:3003/api/status";

const getStatus = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getStatus };
