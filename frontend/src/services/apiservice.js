let token = null;

const setToken = (createdToken) => {
  token = `Bearer ${createdToken}`;
};

const getConfig = () => {
  console.log("getconfig");
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  return config;
};

const getPasswordConfig = (password) => {
  const config = {
    headers: {
      Authorization: token,
      Password: password,
    },
  };
  return config;
};

export default { setToken, getConfig, getPasswordConfig };
