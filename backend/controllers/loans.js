const router = require('express').Router()
const { Loan } = require('../models')
const { Book } = require('../models')
const { Reservation } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
    const loans = await Loan.findAll()
    res.json(loans)
  })

router.post('/', tokenExtractor, async (req, res) => {
    const setDueDate = () => {
        let date = new Date()
        date.setDate(date.getDate() + 7);
        return date
    } 

    const book = await Book.findByPk(req.body.bookId)
    const numberOfBooks = book.number_of_books
    const borrowed = await Loan.findAll({where: {bookId: req.body.bookId}})

    let numberOfBorrowed
    if (borrowed === null) {
        numberOfBorrowed = 0
        console.log(numberOfBorrowed)
    }
    else {
        numberOfBorrowed = borrowed.length
        console.log(numberOfBorrowed)
    }
  
    if (Number(numberOfBooks) > Number(numberOfBorrowed)) {
        const borrowingDate = new Date()
        const dueDate = setDueDate()
        console.log(req.body)
        const newloan = await Loan.create({...req.body, borrowingDate, dueDate})
        res.json(newloan)
    }
 
})

router.delete('/:id', tokenExtractor, async (req, res) => {
    console.log("deletoidaan")
    const loan = await Loan.findByPk(req.params.id)
    const reservation = await Reservation.findOne( { where: {bookId: loan.bookId, available: false} } )
    console.log(loan)
    if (loan && reservation) {
        console.log(reservation)
        await loan.destroy()
        console.log("varattu")
        reservation.available = true
        await reservation.save()
        res.status(204).end()
    }
    else if (loan ) {
        await loan.destroy()
        res.status(204).end()
    }
})

module.exports = router