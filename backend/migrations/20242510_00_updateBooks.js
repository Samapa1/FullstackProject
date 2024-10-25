const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
      await queryInterface.changeColumn('books', 'author', {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter author',
            },
            notEmpty: {
                msg: 'Please enter author',
            },
            min:{
                args: [3],
                msg: 'Minimum 3 characters required in the author name'
            },
            notAlpha: {
                msg: 'Only letters allowed in the author name',
            }
        }

      })
    },
    down: async ({ context: queryInterface }) => {
      await queryInterface.changeColumn('books', 'author')
    },
  }