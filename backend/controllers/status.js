const router = require('express').Router()
const { Loan } = require('../models')
const { Book } = require('../models')

router.get('/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id)
    const numberOfBooks = book.number_of_books
    const borrowed = await Loan.findAll({where: {bookId: req.params.id}})

    let numberOfBorrowed
    if (borrowed === null) {
        numberOfBorrowed = 0
    }
    else {
        numberOfBorrowed = borrowed.length
    }
  
    if (Number(numberOfBooks) > Number(numberOfBorrowed)) {
        console.log("available")
        return res.json("available")
    }

    else 
        console.log("unnavailable")
        return res.json("unavailable").end()
})


module.exports = router