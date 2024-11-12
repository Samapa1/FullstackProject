import axios from 'axios'
import apiService from './apiservice'
const baseUrl = 'http://localhost:3003/api/books'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newBook) => {
  const response = await axios.post(baseUrl, newBook, apiService.getConfig())
  return response.data
}

const update = async (updatedBook) => {
  const response = await axios.put(`${baseUrl}/${updatedBook.id}`, updatedBook, apiService.getConfig())
  return response.data
}
  
const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, apiService.getConfig())
}

export default { getAll, getOne, create, update, remove }