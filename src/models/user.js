const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin','user'), defaultValue: 'user' }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      }
    }
  });

  User.prototype.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
