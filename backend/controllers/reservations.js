const router = require('express').Router()
const { Reservation } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
    const reservations = await Reservation.findAll()
    res.json(reservations)
})

router.post('/', tokenExtractor, async (req, res) => {
    if (req.body.userId !== req.user.id) {
        res.status(403).end()
    }
    const newReservation = await Reservation.create({...req.body})
    res.json(newReservation) 
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