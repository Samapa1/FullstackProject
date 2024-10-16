const Book = require('./book')
const User = require('./user')
const Loan = require('./loan')
const Reservation = require ('./reservation')

User.belongsToMany(Book, { through: Loan })
Book.belongsToMany(User, { through: Loan })

User.hasMany(Loan)
Loan.belongsTo(User)

Book.hasMany(Loan)
Loan.belongsTo(Book)

User.belongsToMany(Book, { through: Reservation, as: 'reservedBooks' })
Book.belongsToMany(User, { through: Reservation, as: 'userReservations' })

Book.hasMany(Reservation)
Reservation.belongsTo(Book)

User.hasMany(Reservation)
Reservation.belongsTo(User)

module.exports = {
    Book, User, Loan, Reservation
}