import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/reservations'

let token = null

const setToken = (createdToken) => {
  token = `Bearer ${createdToken}`
}
  
const create = async (reservationData) => {

const newObject = {
    userId: reservationData.user.id, 
    bookId: reservationData.book.id, 

}

  const config = {
    headers: { Authorization: token },
  }
    const response = await axios.post(baseUrl, newObject, config);
    console.log(response)
    return response.data;
};




export default { create, setToken }