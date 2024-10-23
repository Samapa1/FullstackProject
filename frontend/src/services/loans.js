import axios from 'axios'
import apiService from './apiservice'

const baseUrl = 'http://localhost:3003/api/loans'
  
const getAll = async () => {
    const response = await axios.get(baseUrl, apiService.getConfig())
    return response.data
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject, apiService.getConfig());
    return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, apiService.getConfig())
  return response.data
}

const update = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}`, null, apiService.getConfig())
  return response.data
}




export default { getAll, create, remove, update }