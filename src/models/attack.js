const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Attack = sequelize.define('Attack', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT }
  });
  return Attack;
};
