import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/status'

const getStatus = async ( id ) => {
    console.log("statusservice")
    const response = await axios.get(`${baseUrl}/${id}`)
    console.log(response)
    console.log(response.data)
    return response.data
  }
  
export default { getStatus }