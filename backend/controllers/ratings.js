const router = require('express').Router()  
const sequelize = require('sequelize')
const { Book } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

router.post('/', tokenExtractor, async (req, res) => {
    const bookToBeRated = req.body.bookId
    const newVote = req.body.newVote
    const book = await Book.findByPk(bookToBeRated)
    console.log(book)
    const updatedBook = await Book.update(
        { votes: sequelize.fn('array_append', sequelize.col('votes'), newVote)},
        { where: {
            id: Number(req.body.bookId),
          },
        }
    )
    console.log("updatedBook")
    console.log(updatedBook)
    const updatedVotes = updatedBook.votes
    let sum = 0
    updatedVotes.forEach(vote => sum += vote)
    console.log("voteSum")
    console.log(sum)
    const updatedRating = sum/(updatedVotes.length)
    console.log(updatedRating)
    updatedBook.rating = updatedRating
    await updatedBook.save()
    return res.status(200)
    // return res.json(updatedBook)

})

module.exports = router