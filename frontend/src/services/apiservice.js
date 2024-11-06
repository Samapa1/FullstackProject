let token = null

const setToken = (createdToken) => {
  token = `Bearer ${createdToken}`
}

const getConfig = () => {
  console.log(token)
  const config = {
      headers: { Authorization: token },
    }
  return config
}

export default {setToken, getConfig}



