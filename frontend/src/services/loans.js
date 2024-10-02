import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/loans'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    console.log(response)
    return response.data;
};

  
export default { getAll, create }