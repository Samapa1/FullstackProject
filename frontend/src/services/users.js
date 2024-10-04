import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'


const getOne = async ( id ) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  }
  
export default { getOne }