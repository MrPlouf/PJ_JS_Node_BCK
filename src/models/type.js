// models/type.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Type = sequelize.define('Type', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'Types', // Force le nom en DB, optionnel
    timestamps: true,   // createdAt, updatedAt
  });
  return Type;
};