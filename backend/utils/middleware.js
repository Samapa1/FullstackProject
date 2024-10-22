const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { Session } = require('../models')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    const validSession = await Session.findOne({ where: { token: authorization.substring(7) }})
      
    if (authorization && authorization.startsWith('Bearer ') && validSession) {
      req.decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
      if (req.decodedToken.id) {
        req.user = await User.findByPk(req.decodedToken.id)
      }
      
    } 
    else {
        return res.status(401).json({ error: 'token missing or invalid' })
  }

  next()
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: "token missing or invalid" });
      }
    else if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.message });
    }
  
    next(error)
  }

module.exports = { tokenExtractor, errorHandler}