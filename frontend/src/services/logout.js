import axios from "../../utils/apiClient.js";
import apiService from "./apiservice";

const logout = async () => {
  const response = await axios.delete("/logout", apiService.getConfig());
  console.log(response.data);
  return response.data;
};

export default { logout };
