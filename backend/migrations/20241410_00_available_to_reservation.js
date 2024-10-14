const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
      await queryInterface.addColumn('reservations', 'available', {
        type: DataTypes.BOOLEAN,
        default: false,
      })
    },
    down: async ({ context: queryInterface }) => {
      await queryInterface.removeColumn('reservations', 'available')
    },
  }