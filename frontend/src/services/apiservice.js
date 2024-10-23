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

export default {setToken, getConfig}



