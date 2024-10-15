const app = require("./app");

const start = async () => {

  app.listen(3003, () => {
    console.log(`Server running on port ${3003}`)
  })
}

start()



