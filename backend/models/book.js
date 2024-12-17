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
  },
  rating: {
    type: DataTypes.FLOAT,
    default: 0,
  },
  subjects: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  genre: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  class: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
          msg: 'Please enter class',
      },
      notEmpty: {
          msg: 'Please enter class',
      },
      len: {
        args: [1],
        msg: 'Minimum 1 characters required in the class'
      }
    }
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
          msg: 'Please enter language',
      },
      notEmpty: {
          msg: 'Please enter language',
      },
      len: {
        args: [2],
        msg: 'Minimum 2 characters required in the language'
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