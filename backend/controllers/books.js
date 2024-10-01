const router = require('express').Router()
const { Book } = require('../models')

router.get('/', async (req, res) => {
    const books = await Book.findAll()
    res.json(books)
  })

router.put('/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  if (book) { 
    book.available = req.body.available
    await book.save()
    res.json(book)
  }
})

router.post('/', async (req, res) => {
  const book = await Book.create({...req.body})
  res.json(book)
})

module.exports = router