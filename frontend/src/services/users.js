import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

let token = null

const setToken = (createdToken) => {
  token = `Bearer ${createdToken}`
}
  
const getOne = async ( id ) => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.get(`${baseUrl}/${id}`, config)
    console.log(response.data)
    return response.data
}

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  console.log(response.data)
  return response.data
}

const update = async (userObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${userObject.id}`, userObject, config)
  console.log(response.data)
  return response.data
}
  
  
export default { getOne, create, update, setToken}