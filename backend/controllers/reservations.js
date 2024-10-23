const router = require('express').Router()
const { Reservation } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', tokenExtractor, async (req, res) => {
    if (req.user.admin !== true) {
        return res.status(403).json({error: 'Only admins are allowed to view reservations.'})
    }

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