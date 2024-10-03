const Book = require('./book')
const User = require('./user')
const Loan = require('./loan')

// User.hasMany(Loan)
// Loan.belongsTo(User)

// Book.belongsToMany(User, { through: Loan, as: 'booksMarked' })
// User.hasMany(Book)

User.belongsToMany(Book, { through: Loan })
Book.belongsToMany(User, { through: Loan })

Book.sync({ alter: true })
User.sync({ alter: true })
Loan.sync({ alter: true })

// User.hasMany(Loan)
// Book.hasMany(Loan)

// Loan.belongsTo(Book)
// Loan.belongsTo(User)


module.exports = {
    Book, User, Loan
}