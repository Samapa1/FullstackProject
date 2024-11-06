const router = require('express').Router()  
const { Book } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { Reservation } = require('../models')
const { Loan } = require('../models')
const { sequelize } = require('../utils/db')

router.get('/', async (req, res) => {
    const books = await Book.findAll()
    return res.json(books)
  })

router.get('/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  return res.json(book)
})

router.post('/', tokenExtractor, async (req, res) => {
  if (req.user.admin !== true) {
    return res.status(403).json({error: 'Only admins are allowed to add books.'})
  }
  try {
    const book = await Book.create({...req.body})
    return res.status(201).json(book)
  }
  catch (err) {
    console.log(err.errors[0].message)
    return res.status(400).json({message: err.errors[0].message })
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

    return res.json(book)

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

  const book = await Book.findByPk(req.params.id, {
    include: [
        {
        model: Reservation
        },
        {
        model: Loan
        }
    ]
  })

  if (book) {
    await sequelize.transaction(async t => {
      if (book.loans) {
        await book.loans.forEach(loan => loan.destroy())
      }
      if (book.reservations)
        await book.reservations.forEach(loan => loan.destroy())
  
      await book.destroy()
      return res.status(204).end()
  });
  }
  
})

module.exports = router