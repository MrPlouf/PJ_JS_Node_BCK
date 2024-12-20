const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Type = sequelize.define('Type', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  });
  return Type;
};
