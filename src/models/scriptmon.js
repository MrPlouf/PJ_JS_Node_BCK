// models/scriptmon.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Scriptmon = sequelize.define('Scriptmon', {
    // L'id se crée automatiquement en SERIAL (ou bigserial) par Sequelize
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stars: {
      // niveau d’étoiles (1,2,3 ou 4)
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 4,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    captureRate: {
      type: DataTypes.FLOAT, // ou DECIMAL
      defaultValue: 0.5,
    },
  }, {
    tableName: 'Scriptmons',
    timestamps: true,
  });
  return Scriptmon;
};