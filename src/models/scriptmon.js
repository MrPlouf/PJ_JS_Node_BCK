const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Scriptmon = sequelize.define('Scriptmon', {
    number: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    captureRate: { type: DataTypes.FLOAT, defaultValue: 0.5 }
  });
  return Scriptmon;
};
