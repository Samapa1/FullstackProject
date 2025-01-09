import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;
console.log(url);
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default apiClient;
