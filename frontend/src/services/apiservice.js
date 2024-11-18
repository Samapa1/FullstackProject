let token = null

const setToken = (createdToken) => {
  token = `Bearer ${createdToken}`
}

const getConfig = () => {
  const config = {
      headers: { Authorization: token },
    }
  return config
}

const getPasswordConfig = (password) => {
  const config = {
      headers: { 
        Authorization: token, 
        Password: password
       },
    }
  return config
}

export default {setToken, getConfig, getPasswordConfig}



