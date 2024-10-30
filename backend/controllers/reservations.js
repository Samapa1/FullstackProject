const router = require('express').Router()
const { Reservation } = require('../models')
const { Loan } = require('../models')
const { Book } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { sequelize } = require('../utils/db')

const setDueDate = () => {
    let date = new Date()
    date.setDate(date.getDate() + 7);
    return date
}

router.get('/', tokenExtractor, async (req, res) => {
    if (req.user.admin !== true) {
        return res.status(403).json({ error: 'Only admins are allowed to view reservations.' })
    }

    const reservations = await Reservation.findAll()
    res.json(reservations)
})

router.post('/', tokenExtractor, async (req, res) => {
    if (req.body.userId !== req.user.id) {
        res.status(403).end()
    }

    const book = await Book.findByPk(req.body.bookId, {
        include: [
            {
            model: Reservation
            },
            {
            model: Loan
            }
        ]
    })

    if (book.numberOfBooks > book.loans.length) {
        return res.status(400).json({error: 'Available books can not be reserved.'})
    }
   

    const newReservation = await Reservation.create({...req.body})
    res.json(newReservation) 
})

router.post('/:id', tokenExtractor, async (req, res) => {
    if (req.body.userId !== req.user.id) {
        res.status(403).end()
    }
    const reservation = await Reservation.findByPk(req.params.id)

    if (reservation.available !== true) {
        res.status(403).end()
    }
    try {
        const result = await sequelize.transaction(async t => {
            const borrowingDate = new Date()
            const dueDate = setDueDate()
            const newloan = await Loan.create({...req.body, borrowingDate, dueDate})
            await reservation.destroy()
            console.log("transaction succeeding")
            res.json(newloan)
        });
      
      } catch (error) {
        console.log("transaction error")
      }
   
})


router.delete('/:id', tokenExtractor, async (req, res) => {
    const reservation = await Reservation.findByPk(req.params.id)
    if (reservation.userId !== req.user.id) {
        res.status(403).end()
    }

    await reservation.destroy()
    res.status(204).end()
})
 

module.exports = router