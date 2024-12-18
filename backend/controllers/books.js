const router = require('express').Router()  
const { Book } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { setDueDate } = require('../utils/helper')
const { Reservation } = require('../models')
const { Loan } = require('../models')
const { Rating } = require('../models')
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
    const book = await Book.create({...req.body})
    return res.status(201).json(book)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  if (req.user.admin !== true) {
    return res.status(403).json({error: 'Only admins are allowed to modify books.'})
  }

    await sequelize.transaction(async t => {
    const book = await Book.findByPk(req.params.id, {
      include: [
          {
          model: Loan
          }
      ],
      transaction: t
    })
    const itemsBefore = book.numberOfBooks

    if (book.loans.length > req.body.numberOfBooks) {
      return res.status(403).json({error: 'Please return books before removing them.'})
    }

    console.log(req.body.subjects)

    if (!req.body.genre && !req.body.subjects) {
      return res.status(400).json({error: 'Please fill genre/subjects -field.'})
    }


    book.title = req.body.title, 
    book.author = req.body.author, 
    book.year = req.body.year, 
    book.language = req.body.language,
    book.class = req.body.class,
    book.genre = req.body.genre,
    book.subjects = req.body.subjects,
    book.numberOfBooks = req.body.numberOfBooks
    await book.save({ transaction: t })
    
    const notAvailableReservations = await Reservation.findAll({ 
      where: {bookId: book.id, available: false}, 
      order: [['createdAt', 'ASC']],
      transaction: t
    })

    const availableReservations = await Reservation.findAll({ 
      where: {bookId: book.id, available: true}, 
      order: [['createdAt', 'DESC']],
      transaction: t 
    })
    
    if (itemsBefore < book.numberOfBooks && notAvailableReservations.length > 0) {
      console.log("books were added")

      if (notAvailableReservations.length > (book.numberOfBooks - itemsBefore)) {
        let i = 0
        while (i < (book.numberOfBooks - itemsBefore) ) {
          notAvailableReservations[i].available = true
          notAvailableReservations[i].dueDate = setDueDate()
          await notAvailableReservations[i].save({ transaction: t })
          i ++
        } 
      }

      else if (notAvailableReservations.length <= book.numberOfBooks - itemsBefore) {
        await Promise.all(notAvailableReservations.map(reservation => {
          reservation.available = true
          reservation.dueDate = setDueDate()
          return reservation.save( {transaction: t})
        }))
      }

    }
  
    if (availableReservations.length > (book.numberOfBooks - book.loans.length)) {
      console.log("books were removed")
      const reservationsToChange = availableReservations.length - (book.numberOfBooks - book.loans.length)
      let i = 0
      while (i < reservationsToChange) {
        console.log("changing reservations")
        availableReservations[i].available = false
        availableReservations[i].dueDate = null
        await availableReservations[i].save({ transaction: t})
        i ++
      } 
    }

    return res.json(book)

  })
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  if (req.user.admin !== true) {
    return res.status(403).json({error: 'Only admins are allowed to delete books.'})
  }

  await sequelize.transaction(async t => {
    const book = await Book.findByPk(req.params.id, {
      include: [
          {
          model: Reservation
          },
          {
          model: Loan
          },
          {
          model: Rating
          },
      ],
      transaction: t
    })
    if (book) {
      if (book.loans) 
        await Promise.all(book.loans.map(loan => loan.destroy({ transaction: t })))

      if (book.reservations)
        await Promise.all(book.reservations.map(reservation => reservation.destroy({ transaction: t })))

      if (book.ratings)
        await Promise.all(book.ratings.map(rating => rating.destroy({ transaction: t })))

      await book.destroy({ transaction: t })

    }

  })
  return res.status(204).end()
})

module.exports = router