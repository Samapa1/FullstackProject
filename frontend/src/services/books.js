import axios from 'axios'

const baseUrl = 'http://localhost:3001/books'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

// const update = async () => {
//   const response = await axios.get(baseUrl)
//   return response.data
// }
  
export default { getAll }