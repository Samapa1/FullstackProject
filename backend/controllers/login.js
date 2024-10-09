const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


router.post('/', async (req, res) => {

  const user = await User.findOne({
    where: {
      username:  req.body.username
    }
  })

  console.log(user.passwordHash)

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


  res
  .status(200)
  .send({ token, username: user.username, name: user.name, email: user.email, id: user.id })
  

})

module.exports = router