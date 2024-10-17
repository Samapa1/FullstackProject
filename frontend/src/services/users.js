import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'


const getOne = async ( id ) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    console.log(response.data)
    return response.data
  }

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  console.log(response.data)
  return response.data
}

const update = async (userObject) => {
  const response = await axios.post(`${baseUrl}/${userObject.id}`, userObject)
  console.log(response.data)
  return response.data
}
  
  
export default { getOne, create, update}