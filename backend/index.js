const express = require('express')
const cors = require('cors')
const app = express()
const booksRouter = require ('./controllers/books')
const usersRouter = require ('./controllers/users')
const loansRouter = require ('./controllers/loans')
const statusRouter = require ('./controllers/status')

const { connectToDatabase } = require('./util/db')



app.use(cors())

app.use(express.json())

app.use('/api/books', booksRouter)

app.use('/api/users', usersRouter)

app.use('/api/loans', loansRouter)

app.use('/api/status', statusRouter)


const start = async () => {
  await connectToDatabase()
  app.listen(3003, () => {
    console.log(`Server running on port ${3003}`)
  })
}

start()

