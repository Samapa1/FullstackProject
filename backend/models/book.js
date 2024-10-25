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
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notNull: {
            msg: 'Please enter author',
        },
        notEmpty: {
            msg: 'Please enter author',
        },
        max:{
            args: [20],
            msg: 'Maximum 20 characters allowed in the author name'
        },
        min:{
            args: [3],
            msg: 'Minimum 3 characters required in the author name'
        },
        notAlpha: {
            msg: 'Only letters allowed in the author name',
        }
    }
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