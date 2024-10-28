import axios from 'axios'
import apiService from './apiservice'
const baseUrl = 'http://localhost:3003/api/books'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newBook) => {
  const response = await axios.post(baseUrl, newBook, apiService.getConfig())
  return response.data
}
  
export default { getAll, create }