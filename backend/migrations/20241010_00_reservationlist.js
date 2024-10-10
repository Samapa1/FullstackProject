const { DataTypes } = require('sequelize')

module.exports = {

  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reservations', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          // dueDate: {
          //   type: DataTypes.DATE,
          //   allowNull: true
          // }
  })
    await queryInterface.addColumn('reservations', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    })
    await queryInterface.addColumn('reservations', 'book_id', {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'books', key: 'id' }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('reservations')
  },
}