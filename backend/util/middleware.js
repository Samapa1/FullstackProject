const jwt = require('jsonwebtoken')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
 
    if (authorization && authorization.startsWith('Bearer ')) {
            req.decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
            console.log(req.decodedToken)

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

module.exports = { tokenExtractor, errorHandler }