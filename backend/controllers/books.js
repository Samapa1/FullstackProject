const router = require('express').Router()  
const { Book } = require('../models')
const { tokenExtractor } = require('../utils/middleware')


router.get('/', async (req, res) => {
    const books = await Book.findAll()
    res.json(books)
  })

// router.put('/:id', async (req, res) => {

//   const book = await Book.findByPk(req.params.id)

//   if (book) { 
//     book.available = req.body.available
//     await book.save()
//     res.json(book)
//   }
//   else {
//     res.status(404)
//   }
// })

router.post('/', tokenExtractor, async (req, res) => {
  if (req.user.admin !== true) {
    return res.status(403).json({error: 'Only admins are allowed to add books.'})
  }
  try {
    const book = await Book.create({...req.body})
    res.status(201).json(book)
  }
  catch (err) {
    console.log(err.errors[0].message)
    res.status(400).json({message: err.errors[0].message })
  }

})

router.put('/:id', tokenExtractor, async (req, res) => {
  if (req.user.admin !== true) {
    return res.status(403).json({error: 'Only admins are allowed to add books.'})
  }
  try {
    const book = await Book.findByPk(req.params.id)
    book.title = req.body.title, 
    book.author = req.body.author, 
    book.year = req.body.year, 
    book.numberOfBooks = req.body.numberOfBooks
    await book.save()

    res.json(book)

  }
  catch (err) {
    console.log(err)
    res.status(400).json({message: err}).end()
    // console.log(err.errors[0].message)
    // res.status(400).json({message: err.errors[0].message })
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  if (req.user.admin !== true) {
    return res.status(403).json({error: 'Only admins are allowed to delete books.'})
  }

  const book = await Book.findByPk(req.params.id)

  if (book) {
    await book.destroy()
  }

  res.status(204).end()
})

module.exports = router