// models/attack.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Attack = sequelize.define('Attack', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true, // si tu veux l’empêcher en double
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'Attacks',
    timestamps: true,
  });
  return Attack;
};