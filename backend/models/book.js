const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Book extends Model {}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numberOfBooks: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'book'
})

module.exports = Book