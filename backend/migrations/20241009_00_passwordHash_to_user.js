const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "password_hash", {
      type: DataTypes.TEXT,
      default: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "password_hash");
  },
};
