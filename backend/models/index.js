const Book = require('./book')
const User = require('./user')
const Loan = require('./loan')

// User.hasMany(Book)
// Book.belongsTo(User)

// Book.belongsToMany(User, { through: 'Borrowed_Books' });
// User.belongsToMany(Book, { through: 'Borrowed_Books' });

Book.sync({ alter: true })
User.sync({ alter: true })
Loan.sync({ alter: true })

module.exports = {
    Book, User, Loan
}