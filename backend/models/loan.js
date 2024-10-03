const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Loan extends Model {}

Loan.init({
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
  borrowingDate: {
    type: DataTypes.DATE,
    allowNull: false
    },
    
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
    }


}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'loan'
})

module.exports = Loan