const router = require('express').Router()
const Loan = require('../models/loan')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Loan.truncate()
  await User.truncate()

  response.status(204).end()
})

module.exports = router