const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
      await queryInterface.addColumn('books', 'subjects', {
        type: DataTypes.TEXT,
        allowNull: true
      }),
      await queryInterface.addColumn('books', 'language', {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'english',
      })
    },
    down: async ({ context: queryInterface }) => {
      await queryInterface.removeColumn('books', 'subjects')
      await queryInterface.removeColumn('books', 'language')
    },
  }