const router = require('express').Router()
const { Reservation } = require('../models')
const { Loan } = require('../models')
const { Book } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { setDueDate } = require('../utils/helper')
const { sequelize } = require('../utils/db')

router.get('/', tokenExtractor, async (req, res) => {
    if (req.user.admin !== true) {
        return res.status(403).json({ error: 'Only admins are allowed to view reservations.' })
    }

    const reservations = await Reservation.findAll()
    return res.json(reservations)
})

router.post('/', tokenExtractor, async (req, res) => {
    if (req.body.userId !== req.user.id) {
        return res.status(403).end()
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

    if (book.numberOfBooks > (book.loans.length + book.reservations.length)) {
        return res.status(400).json({error: 'Available books can not be reserved.'})
    }
   
    const newReservation = await Reservation.create({...req.body})
    return res.json(newReservation) 
})

router.post('/:id', tokenExtractor, async (req, res) => {
    if (req.body.userId !== req.user.id) {
        return res.status(403).end()
    }

    try {
        await sequelize.transaction(async t => {
            const reservation = await Reservation.findByPk(req.params.id, {transaction: t})

            if (reservation.available !== true) {
                return res.status(403).end()
            }
       
            const borrowingDate = new Date()
            const dueDate = setDueDate()
            const newloan = await Loan.create({...req.body, borrowingDate, dueDate}, { transaction: t })
            await reservation.destroy({ transaction: t })
            return res.json(newloan)
        });
      
      } catch (error) {
            console.log(error)
            return res.status(400).json({error: 'Request failed'}).end()
      }
   
})


router.delete('/:id', tokenExtractor, async (req, res) => {    
    try {
        await sequelize.transaction(async t => {
            const reservation = await Reservation.findByPk(req.params.id, {transaction: t})
            if (reservation.userId !== req.user.id) {
                return res.status(403).end()
            }
        
            const notAvailableReservations = await Reservation.findAll({ 
                where: {available: false}, 
                order: [['createdAt', 'ASC']],
                transaction: t, 
            })
       
            if (notAvailableReservations[0]) {
                await reservation.destroy({transaction: t})
                notAvailableReservations[0].available = true
                notAvailableReservations[0].dueDate = setDueDate()
                await notAvailableReservations[0].save({transaction: t})
                return res.status(204).end()
            };
            await reservation.destroy({transaction: t})
            return res.status(204).end()
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({error: 'Request failed'}).end()
    }

})
 

module.exports = router