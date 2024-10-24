import axios from 'axios'
import apiService from './apiservice'
const baseUrl = 'http://localhost:3003/api/users'
  
const getOne = async ( id ) => {
  const response = await axios.get(`${baseUrl}/${id}`, apiService.getConfig())
  return response.data
}

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const update = async (userObject) => {
  const response = await axios.post(`${baseUrl}/${userObject.id}`, userObject, apiService.getConfig())
  return response.data
}
  
  
export default { getOne, create, update }