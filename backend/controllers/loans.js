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

router.get('/', tokenExtractor, async (req, res) => {
    if (req.user.admin !== true) {
        return res.status(403).json({error: 'Only admins are allowed to view loans.'})
    }

    const loans = await Loan.findAll()
    res.json(loans)
})

router.post('/', tokenExtractor, async (req, res) => {
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
    const reservations = await Reservation.findAll({ 
        where: {bookId: loan.bookId, available: false}, 
        order: [['createdAt', 'ASC']] 
    })

    if (loan.userId !== req.user.id) {
        res.status(403).end()
    }

    else if (loan && reservations[0]) {
        console.log(reservations[0])
        await loan.destroy()
        reservations[0].available = true
        await reservations[0].save()
        res.status(204).end()
    }
    else if (loan) {
        await loan.destroy()
        res.status(204).end()
    }
})


router.post('/:id', tokenExtractor, async (req, res) => {
    const loan = await Loan.findByPk(req.params.id)
    const reservation = await Reservation.findOne({ 
        where: {bookId: loan.bookId, available: false} 
    })

    if (loan.userId !== req.user.id) {
        res.status(403).end()
    }

    else if (loan && !reservation) {
        loan.dueDate = setDueDate()
        loan.borrowingDate = new Date()
        await loan.save() 
        res.status(200).json(loan)
    }
    else {
        res.status(409).end({error: 'The loan cannot be renewed.'})
    }
})

module.exports = router