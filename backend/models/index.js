const Book = require('./book')
const User = require('./user')
const Loan = require('./loan')

Book.sync({ alter: true })
User.sync({ alter: true })
Loan.sync({ alter: true })

module.exports = {
    Book, User, Loan
}