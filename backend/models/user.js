const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    len: {
      args: [5],
      msg: 'Minimum 5 characters required in the username'
    }
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    len: {
      args: [3],
      msg: 'Minimum 3 characters required in the name'
    }
    },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
          msg: "Validation isEmail on field email failed"
      }
    }
  },
  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
})

module.exports = User