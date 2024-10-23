import axios from 'axios'
import apiService from './apiservice'

const baseUrl = 'http://localhost:3003/api/reservations'
  
const create = async (reservationData) => {

  const newObject = {
    userId: reservationData.user.id, 
    bookId: reservationData.book.id, 
  }

  const response = await axios.post(baseUrl, newObject, apiService.getConfig());
  console.log(response)
  return response.data;
};


const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, apiService.getConfig())
  return response.data
}




export default { create, remove }