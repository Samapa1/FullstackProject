const router = require('express').Router()
const Loan = require('../models/loan')
const User = require('../models/user')
const Reservation = require('../models/reservation')
const Session = require('../models/session')
const { sequelize } = require('../utils/db')

router.post('/reset', async (request, response) => {
  await sequelize.transaction(async t => {
    await Loan.truncate()
    await Reservation.truncate()
    await Session.truncate()
    await User.destroy({ truncate: { cascade: true } })
    t.afterCommit(() => {
      console.log("transaction done")
    });
    return response.status(204).end()
  })
  
})

module.exports = router