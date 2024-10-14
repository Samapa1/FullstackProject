const Book = require('./book')
const User = require('./user')
const Loan = require('./loan')
const Reservation = require ('./reservation')

// User.hasMany(Book)
// Book.belongsTo(User)

User.belongsToMany(Book, { through: Loan })
Book.belongsToMany(User, { through: Loan })

User.belongsToMany(Book, { through: Reservation, as: 'reservedBooks' })
Book.belongsToMany(User, { through: Reservation, as: 'userReservations' })

Book.hasMany(Reservation)
Reservation.belongsTo(Book)

User.hasMany(Reservation)
Reservation.belongsTo(User)


// User.hasMany(reservedBooks)
// reservedBooks.belongsTo(User)


// Book.sync({ alter: true })
// User.sync({ alter: true })
// Loan.sync({ alter: true })

module.exports = {
    Book, User, Loan, Reservation
}