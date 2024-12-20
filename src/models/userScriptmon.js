const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserScriptmon = sequelize.define('UserScriptmon', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
  });
  return UserScriptmon;
};
