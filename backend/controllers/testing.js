const router = require('express').Router()
const Loan = require('../models/loan')
const User = require('../models/user')
const Reservation = require('../models/reservation')
const Session = require('../models/session')
const { sequelize } = require('../utils/db')

router.post('/reset', async (req, res) => {
  try {
  await sequelize.transaction(async t => {
    await Loan.truncate({ transaction: t })
    await Reservation.truncate({ transaction: t })
    await Session.truncate({ transaction: t })
    await User.destroy({ truncate: { cascade: true } }, { transaction: t })
    return res.status(204).end()
  })
} catch (err) {
    console.log(err)
    return res.status(200).end()
}
   
})

module.exports = router