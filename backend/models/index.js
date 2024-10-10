const Book = require('./book')
const User = require('./user')
const Loan = require('./loan')
const Reservation = require ('./reservation')

User.hasMany(Reservation)
Reservation.belongsTo(User)

User.belongsToMany(Book, { through: Loan })
Book.belongsToMany(User, { through: Loan })

// User.belongsToMany(Book, { through: Reservation })
// Book.belongsToMany(User, { through: Reservation })


// Book.sync({ alter: true })
// User.sync({ alter: true })
// Loan.sync({ alter: true })

module.exports = {
    Book, User, Loan, Reservation
}