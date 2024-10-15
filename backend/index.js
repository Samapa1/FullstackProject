const { connectToDatabase } = require('./utils/db')
const app = require("./app");

const start = async () => {
  await connectToDatabase()
  app.listen(3003, () => {
    console.log(`Server running on port ${3003}`)
  })
}

start()

// const express = require('express')
// const cors = require('cors')
// require('express-async-errors')
// const app = express()
// const booksRouter = require ('./controllers/books')
// const usersRouter = require ('./controllers/users')
// const loansRouter = require ('./controllers/loans')
// const statusRouter = require ('./controllers/status')
// const loginRouter = require ('./controllers/login')
// const reservationRouter = require ('./controllers/reservations')
// const middleware = require('./utils/middleware');

// const { connectToDatabase } = require('./utils/db')



// app.use(cors())

// app.use(express.json())

// app.use('/api/books', booksRouter)

// app.use('/api/users', usersRouter)

// app.use('/api/loans', loansRouter)

// app.use('/api/status', statusRouter)

// app.use('/api/login', loginRouter)

// app.use('/api/reservations', reservationRouter)

// const start = async () => {
//   await connectToDatabase()
//   app.listen(3003, () => {
//     console.log(`Server running on port ${3003}`)
//   })
// }


// app.use(middleware.errorHandler)

// start()

