import axios from "axios";
const baseUrl = 'http://localhost:3003/api/logout'

let token = null

const setToken = (createdToken) => {
  token = `Bearer ${createdToken}`
}

const logout = async () => {
    const config = {
        headers: { Authorization: token },
      }
    const response = await axios.delete(baseUrl, config);
    console.log(response.data)
    return response.data;
};

export default { logout, setToken };