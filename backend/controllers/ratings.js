const router = require('express').Router()  
const sequelize = require('sequelize')
const { Book } = require('../models')
const { Rating } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', tokenExtractor, async (req, res) => {
    if (req.user.admin !== true) {
        return res.status(403).json({ error: 'Only admins are allowed to view ratings.' })
    }
    const ratings = await Rating.findAll({})
    return res.json(ratings)
    
})

router.post('/', tokenExtractor, async (req, res) => {
    if (req.body.userId !== req.user.id) {
        return res.status(403).end()
    }
    const newRating = await Rating.create({...req.body})
    const book = await Book.findByPk(req.body.bookId)
    const allRatings = await Rating.findAll(
        {where: {bookId: req.body.bookId}  }
    )
    let sum = 0
    allRatings.forEach(rating => sum += rating.stars)
    const average = sum/(allRatings.length)
    book.rating = average
    await book.save()

    return res.json(newRating)

})

module.exports = router