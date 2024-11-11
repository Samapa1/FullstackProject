const Book = require('./book')
const User = require('./user')
const Loan = require('./loan')
const Reservation = require ('./reservation')
const Session = require('./session')
const Rating = require('./rating')

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

Book.hasMany(Rating)
Rating.belongsTo(Book)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
    Book, User, Loan, Reservation, Session, Rating
}