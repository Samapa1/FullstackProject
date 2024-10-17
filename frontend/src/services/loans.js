import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/loans'

let token = null

const setToken = (createdToken) => {
  token = `Bearer ${createdToken}`
}
  

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = async (updatedObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
  return response.data
}




export default { getAll, create, remove, update, setToken }