const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
      await queryInterface.addColumn('books', 'votes', {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      })
    },
    down: async ({ context: queryInterface }) => {
      await queryInterface.removeColumn('books', 'votes')
    },
  }