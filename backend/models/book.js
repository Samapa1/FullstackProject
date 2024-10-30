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
        len: {
          args: [3],
          msg: 'Minimum 3 characters required in the author name'
        }
    },
  }, 
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
          msg: 'Please enter title',
      },
      notEmpty: {
          msg: 'Please enter titler',
      },
      len: {
        args: [3],
        msg: 'Minimum 3 characters required in the title'
      }
  }
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max: {
        args: [2024],
        msg: 'Year should not be greater than the current year'
      },
      notNull: {
        msg: 'Please enter year',
      },
      notEmpty: {
        msg: 'Please enter year',
      },
    }
  },
  numberOfBooks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: 'Number of books can not be zero'
      }
    }
  }

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'book'
})

module.exports = Book