const Book = require('./book')
const User = require('./user')
const Loan = require('./loan')

User.belongsToMany(Book, { through: Loan })
Book.belongsToMany(User, { through: Loan })


// Book.sync({ alter: true })
// User.sync({ alter: true })
// Loan.sync({ alter: true })

module.exports = {
    Book, User, Loan
}