const router = require('express').Router()
const { Loan } = require('../models')
const { Book } = require('../models')
const { Reservation } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

const setDueDate = () => {
    let date = new Date()
    date.setDate(date.getDate() + 7);
    return date
} 

router.get('/', async (req, res) => {
    const loans = await Loan.findAll()
    res.json(loans)
  })

router.post('/', tokenExtractor, async (req, res) => {
    console.log(req.body)
    if (req.body.userId !== req.user.id) {
        res.status(403).end()
    }
    const book = await Book.findByPk(req.body.bookId, {
        include: [
            {
            model: Loan
            }
        ]

    })
 
    if ((book.numberOfBooks) > (book.loans.length)) {
        const borrowingDate = new Date()
        const dueDate = setDueDate()
        const newloan = await Loan.create({...req.body, borrowingDate, dueDate})
        res.json(newloan)
    }
 
})

router.delete('/:id', tokenExtractor, async (req, res) => {
    const loan = await Loan.findByPk(req.params.id)
    console.log("reservations")
    const reservations = await Reservation.findAll( { where: {bookId: loan.bookId, available: false}, order: [['createdAt', 'ASC']] }, )
    console.log(reservations)
    const reservation = await Reservation.findOne( { where: {bookId: loan.bookId, available: false} } )

    if (loan.userId !== req.user.id) {
        res.status(403).end()
    }

    if (loan && reservation) {
        await loan.destroy()
        reservation.available = true
        await reservation.save()
        res.status(204).end()
    }
    else if (loan ) {
        await loan.destroy()
        res.status(204).end()
    }
})


router.post('/:id', tokenExtractor, async (req, res) => {
    const loan = await Loan.findByPk(req.params.id)
    const reservation = await Reservation.findOne( { where: {bookId: loan.bookId, available: false} } )

    if (loan.userId !== req.user.id) {
        res.status(403).end()
    }

    if (loan && !reservation) {
        loan.dueDate = setDueDate()
        loan.borrowingDate = new Date()
        await loan.save() 
        res.json(loan)
    }
    else {
        res.status(400).end()
    }
})

module.exports = router