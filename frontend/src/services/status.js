import axios from "../../utils/apiClient.js";

const getStatus = async (id) => {
  const response = await axios.get(`status/${id}`);
  return response.data;
};

export default { getStatus };
