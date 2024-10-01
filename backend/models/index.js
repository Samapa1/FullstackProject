const Book = require('./book')
const User = require('./user')

User.hasMany(Book)
// Book.belongsTo(User)

Book.belongsToMany(User, { through: 'Borrowed_Books' });
User.belongsToMany(Book, { through: 'Borrowed_Books' });

Book.sync({ alter: true })
User.sync({ alter: true })

module.exports = {
    Book, User
}