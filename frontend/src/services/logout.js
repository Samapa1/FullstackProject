import axios from "axios";
const baseUrl = 'http://localhost:3003/api/logout'
import apiService from './apiservice'

const logout = async () => {
    const response = await axios.delete(baseUrl, apiService.getConfig());
    console.log(response.data)
    return response.data;
};

export default { logout };