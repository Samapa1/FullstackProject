const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("books", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      author: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subjects: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      genre: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      language: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      class: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      number_of_books: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Validation isEmail on field email failed",
          },
        },
      },
    });
    await queryInterface.createTable("loans", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      borrowing_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
    await queryInterface.addColumn("loans", "user_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    });
    await queryInterface.addColumn("loans", "book_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "books", key: "id" },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("loans");
    await queryInterface.dropTable("books");
    await queryInterface.dropTable("users");
  },
};
