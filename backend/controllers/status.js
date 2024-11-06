const router = require('express').Router()
const { Loan } = require('../models')
const { Book } = require('../models')
const { Reservation } = require('../models')

router.get('/:id', async (req, res) => {

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
  
    if (book.numberOfBooks > (book.reservations.length + book.loans.length)) {
        return res.json({
            status: "available", 
            reservations: book.reservations.length,
        })
    }
    else {
        return res.json({
            status: "unavailable", 
            reservations: book.reservations.length
        })
    }
})


module.exports = router