const router = require('express').Router()
const Loan = require('../models/loan')
const User = require('../models/user')
const Reservation = require('../models/reservation')
const Session = require('../models/session')

router.post('/reset', async (request, response) => {
  await Loan.truncate()
  await Reservation.truncate()
  await Session.truncate()
  await User.destroy({ truncate: { cascade: true } })

  response.status(204).end()
})

module.exports = router