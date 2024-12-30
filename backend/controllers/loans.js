const router = require('express').Router()
const { Loan } = require('../models')
const { Book } = require('../models')
const { Reservation } = require('../models')
const { User } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { setDueDate } = require('../utils/helper')
const { sequelize } = require('../utils/db')

router.get('/', tokenExtractor, async (req, res) => {
    console.log(req.user)
    if (req.user.admin !== true) {
        return res.status(403).json({ error: 'Only admins are allowed to view loans.' })
    }

    const loans = await Loan.findAll({
        include: [
            {
            model: Book,
            attributes: ['title', 'author'],
            },
            {
            model: User,
            attributes: ['name'],
            }
        ],
        order:[ 
            [User, 'name']
        ]
    })
    return res.json(loans)
})

router.post('/', tokenExtractor, async (req, res) => {
    if (req.body.userId !== req.user.id) {
        return res.status(403).end()
    }
    const book = await Book.findByPk(req.body.bookId, {
        include: [
            {
            model: Reservation
            },
            {
            model: Loan
            }
        ]
    })
   
   if (book.loans.find(loan => loan.userId === req.body.userId))
        return res.status(400).json({ error: 'You have already borrowed the book' })
 
    if ((book.numberOfBooks) > ((book.loans.length) + (book.reservations.length))) {
        const borrowingDate = new Date()
        const dueDate = setDueDate()
        const newloan = await Loan.create({...req.body, borrowingDate, dueDate})
        return res.json(newloan)
    }

    else {
        return res.status(400).json({ error: 'No books available.' }).end()
    }

})

router.delete('/:id', tokenExtractor, async (req, res) => {

    await sequelize.transaction(async t => {

        const loan = await Loan.findByPk(req.params.id, { transaction: t })

        if (!loan) {
            return res.status(404).end()
        }

        const reservations = await Reservation.findAll({ 
            where: {bookId: loan.bookId, available: false}, 
            order: [['createdAt', 'ASC']],
            transaction: t, 
        })

        if (loan.userId !== req.user.id && req.user.admin !== true) {
            return res.status(403).end()
        }

        else if (loan && reservations[0]) {
            await loan.destroy( { transaction: t })
            reservations[0].available = true
            reservations[0].dueDate = setDueDate()
            await reservations[0].save({ transaction: t })

        } 
        else if (loan) {
            await loan.destroy({ transaction: t })
        }
    });
    return res.status(204).end()
})


router.post('/:id', tokenExtractor, async (req, res) => {
    const loan = await Loan.findByPk(req.params.id)
    const reservation = await Reservation.findOne({ 
        where: {bookId: loan.bookId, available: false} 
    })

    if (loan.userId !== req.user.id) {
        return res.status(403).end()
    }

    else if (loan && !reservation) {
        loan.dueDate = setDueDate()
        loan.borrowingDate = new Date()
        await loan.save() 
        return res.status(200).json(loan)
    }
    else {
        return res.status(409).json({error: 'The loan cannot be renewed.'})
    }
})

module.exports = router