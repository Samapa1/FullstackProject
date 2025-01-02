const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "books", key: "id" },
    },
    stars: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "rating",
  },
);

module.exports = Rating;
