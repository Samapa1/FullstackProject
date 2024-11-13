import axios from 'axios'
import apiService from './apiservice'

const baseUrl = 'http://localhost:3003/api/ratings'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject, apiService.getConfig())
    return response.data
}

const update = async (updatedObject) => {
    console.log("updateService")
    console.log(updatedObject.id)
    const address = `${baseUrl}/${updatedObject.id}`
    console.log(address)
    const response = await axios.post(address, updatedObject, apiService.getConfig())
    return response.data
}
    
export default { create, getAll, update }