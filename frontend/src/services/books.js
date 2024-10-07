import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/books'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log(response.data)
    return response.data
  }
  
export default { getAll }