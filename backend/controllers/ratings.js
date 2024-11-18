const router = require('express').Router()  
const { Book } = require('../models')
const { Rating } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { sequelize } = require('../utils/db')

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

    const book = await Book.findByPk(req.body.bookId)
    const allRatings = await Rating.findAll({
        where: {
            bookId: req.body.bookId}
    })

    const updateBookRating = async () => {
        let sum = 0
        allRatings.forEach(rating => sum += rating.stars)
        const average = sum/(allRatings.length)
        return average
    }

    try {
        await sequelize.transaction(async t => {        
            const rated = await Rating.findOne({ 
                where: {
                    userId: req.user.id,
                    bookId: req.body.bookId
                },
            })
        
            if (rated) {
                const stars = req.body.stars
                rated.stars = stars
                await rated.save({ transaction: t })
                const average = updateBookRating()
                book.rating = average
                await book.save({ transaction: t })
                return res.status(200).json(rated)
            }

            const newRating = await Rating.create({...req.body}, { transaction: t })
            const average = updateBookRating()
            book.rating = average
            await book.save({ transaction: t })
            return res.json(newRating)

        })
    } catch (err) {
        console.log(err)
        return res.status(400).end()
    }
})

module.exports = router