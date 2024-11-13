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
    console.log("post rating")
    if (req.body.userId !== req.user.id) {
        return res.status(403).end()
    }
    const rated = await Rating.findOne({ 
        where: {
            userId: req.user.id,
            bookId: req.body.bookId
        },
    })
    if (rated) {
        return res.status(403).json({error: 'You have already rated the book!'})
    }
    const newRating = await Rating.create({...req.body})
    const book = await Book.findByPk(req.body.bookId)
    const allRatings = await Rating.findAll({
        where: {
            bookId: req.body.bookId}
    })
    let sum = 0
    allRatings.forEach(rating => sum += rating.stars)
    const average = sum/(allRatings.length)
    book.rating = average
    await book.save()

    return res.json(newRating)

})

router.post('/:id', tokenExtractor, async (req, res) => {
    const rating = await Rating.findByPk(req.params.id) 
    console.log("updateRating")
    if (rating.userId !== req.user.id) {
        return res.status(403).end()
    }
    rating.stars = req.body.stars
    await rating.save()

    const book = await Book.findByPk(rating.bookId)
    const allRatings = await Rating.findAll({
        where: {
            bookId: rating.bookId}
    })
    let sum = 0
    allRatings.forEach(rating => sum += rating.stars)
    const average = sum/(allRatings.length)
    book.rating = average
    await book.save()

    return res.status(200).json(rating)

})

module.exports = router