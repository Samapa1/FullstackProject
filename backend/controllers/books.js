const router = require('express').Router()  
const { Book } = require('../models')
const { tokenExtractor } = require('../utils/middleware')


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

router.post('/', tokenExtractor, async (req, res) => {
  if (req.user.admin === true) {
    const book = await Book.create({...req.body})
    res.json(book)
  }
  else {
    res.status(403).end()
  }
  })

router.delete('/:id', tokenExtractor, async (req, res) => {
  if (req.user.admin === true) {
    const book = await Book.findByPk(req.params.id)
    await book.destroy()
    res.status(204).end()
  }
  else {
    res.status(403).end()
  }
  })

module.exports = router