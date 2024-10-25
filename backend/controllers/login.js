const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const Session = require('../models/session')
const { Book } = require('../models')


router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      username:  req.body.username
    },
    include: [
      {
          model: Book,
          attributes: ['title', 'author']
      },
      {
          model: Book,
          as: 'reservedBooks',
          attributes: {}
      },
      ]
  })

  const passwordCorrect = await bcrypt.compare(req.body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }


  const token = jwt.sign(userForToken, process.env.SECRET)

  await Session.create({ userId: user.id, token})

  res
  .status(200)
  .send({ token, username: user.username, name: user.name, email: user.email, id: user.id, admin: user.admin, reservedBooks: user.reservedBooks, books: user.books })
  

})

module.exports = router