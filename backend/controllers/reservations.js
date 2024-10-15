const router = require('express').Router()
const { Reservation } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
    const reservations = await Reservation.findAll()
    res.json(reservations)
})

router.post('/', tokenExtractor, async (req, res) => {
    console.log(req.body)
    console.log("reqbody")
    const newReservation = await Reservation.create({...req.body})
    console.log("reservationDetails")
    console.log(newReservation)
    res.json(newReservation) 
})


router.delete('/:id', tokenExtractor, async (req, res) => {
    const reservation = await Reservation.findByPk(req.params.id)
    if (reservation) {
        await reservation.destroy()
        res.status(204).end()
    }
})
 

module.exports = router