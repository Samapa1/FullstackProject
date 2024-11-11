const router = require('express').Router()  
const sequelize = require('sequelize')
const { Book } = require('../models')
const { Rating } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

router.post('/', tokenExtractor, async (req, res) => {
    if (req.body.userId !== req.user.id) {
        return res.status(403).end()
    }
    console.log({...req.body})
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
    // const book = await Book.findByPk(bookToBeRated)
    // console.log(book)
    // const updatedBook = await Book.update(
    //     { votes: sequelize.fn('array_append', sequelize.col('votes'), newVote)},
    //     { where: {
    //         id: Number(req.body.bookId),
    //       },
    //     }
    // )
    // console.log("updatedBook")
    // console.log(updatedBook)
    // const updatedVotes = updatedBook.votes
    // let sum = 0
    // updatedVotes.forEach(vote => sum += vote)
    // console.log("voteSum")
    // console.log(sum)
    // const updatedRating = sum/(updatedVotes.length)
    // console.log(updatedRating)
    // updatedBook.rating = updatedRating
    // await updatedBook.save()
    // return res.status(200)
    // return res.json(updatedBook)

})

module.exports = router