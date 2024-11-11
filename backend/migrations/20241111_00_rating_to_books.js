const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
      await queryInterface.addColumn('books', 'rating', {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      })
    },
    down: async ({ context: queryInterface }) => {
      await queryInterface.removeColumn('books', 'rating')
    },
  }