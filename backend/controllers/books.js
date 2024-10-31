const router = require('express').Router()  
const { Book } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { Reservation } = require('../models')


router.get('/', async (req, res) => {
    const books = await Book.findAll()
    res.json(books)
  })

router.get('/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  res.json(book)
})


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
    const itemsBefore = book.numberOfBooks
    book.title = req.body.title, 
    book.author = req.body.author, 
    book.year = req.body.year, 
    book.numberOfBooks = req.body.numberOfBooks
    await book.save()

    const notAvailableReservations = await Reservation.findAll({ 
      where: {bookId: book.id, available: false}, 
      order: [['createdAt', 'ASC']] 
    })

    const availableReservations = await Reservation.findAll({ 
      where: {bookId: book.id, available: true}, 
      order: [['createdAt', 'DESC']] 
    })

    if (itemsBefore < book.numberOfBooks && notAvailableReservations.length > 0) {

      if (notAvailableReservations.length >= (book.numberOfBooks - itemsBefore)) {
        let i = 0
        let resNumber = Number(0)
        while (i < (book.numberOfBooks - itemsBefore) ) {
          notAvailableReservations[resNumber].available = true
          await notAvailableReservations[resNumber].save()
          resNumber ++
          i ++
        } 
      }

      else if (notAvailableReservations.length < book.numberOfBooks - itemsBefore) {
        let i = 0
        let resNumber = Number(0)
        while (i < notAvailableReservations.length ) {
          notAvailableReservations[resNumber].available = true
          await notAvailableReservations[resNumber].save()
          resNumber ++
          i ++
        } 
      }

    }

    if (availableReservations.length > book.numberOfBooks ) {
      let i = 0
      let resNumber = Number(0)
      while ((i < (itemsBefore - book.numberOfBooks)) && (resNumber < availableReservations.length -1)) {
        availableReservations[resNumber].available = false
        await availableReservations[resNumber].save()
        resNumber ++
        i ++
      }
    }

    res.json(book)

  }
  catch (err) {
    console.log(err)
    return res.status(400).json({error: err.errors[0].message })
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