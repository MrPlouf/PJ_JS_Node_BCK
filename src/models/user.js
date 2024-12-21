// src/models/user.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user'  // Par défaut, on met 'user'
    }
  }, {
    tableName: 'Users',
    timestamps: true
  });

  // Méthode d'instance pour vérifier un mot de passe en clair
  User.prototype.checkPassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  };

  return User;
};