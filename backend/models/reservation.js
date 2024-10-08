const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Reservation extends Model {}

Reservation.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'books', key: 'id' }
  },
  // dueDate: {
  //   type: DataTypes.DATE,
  //   allowNull: true
  // }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'reservation'
})

module.exports = Reservation