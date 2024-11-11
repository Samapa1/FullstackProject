const { DataTypes } = require('sequelize')

module.exports = {

  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('ratings', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        book_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'books', key: 'id' }
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' }
        },
        stars: {
          type: DataTypes.FLOAT,
          allowNull: false,
        }
  })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('ratings')
  },
}