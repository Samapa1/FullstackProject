const router = require('express').Router()
const { Loan } = require('../models')
const { Book } = require('../models')
const { Reservation } = require('../models')

router.get('/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id)
    const numberOfBooks = book.number_of_books
    const borrowed = await Loan.findAll({where: {bookId: req.params.id}})
    const reserved = await Reservation.findAll({where: {bookId: req.params.id}}) 

    let numberOfBorrowed
    if (borrowed === null) {
        numberOfBorrowed = 0
    }
    else {
        numberOfBorrowed = borrowed.length
    }

    let numberOfReserved
    if (reserved === null) {
        numberOfReserved= 0
    }
    else {
        numberOfReserved = reserved.length
    }

    console.log(numberOfBorrowed)
    console.log(numberOfReserved)
   
  
    if (Number(numberOfBooks) > Number(numberOfBorrowed)) {
        console.log((Number(numberOfReserved) + Number(numberOfBorrowed)))
        if (Number(numberOfBooks) > (Number(numberOfReserved) + Number(numberOfBorrowed))) {
            console.log("saatavilla!")
            return res.json("available")
        }
        else 
            return res.json("unavailable")
    }

    else 
        return res.json("unavailable").end()
})


module.exports = router