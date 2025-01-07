import axios from "../../utils/apiClient.js";

const login = async (loginData) => {
  const response = await axios.post("/login", loginData);
  return response.data;
};

export default { login };
