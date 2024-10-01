const express = require('express')
const app = express()
const { Book } = require('./models')
const booksRouter = require ('./controllers/books')
const usersRouter = require ('./controllers/users')

const { connectToDatabase } = require('./util/db')

app.use(express.json())

app.use('/api/books', booksRouter)

app.use('/api/users', usersRouter)


const start = async () => {
  await connectToDatabase()
  app.listen(3003, () => {
    console.log(`Server running on port ${3003}`)
  })
}

start()

