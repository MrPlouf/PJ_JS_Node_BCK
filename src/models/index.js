const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

const db = {};
db.sequelize = sequelize;
db.User = require('./user')(sequelize);
db.Type = require('./type')(sequelize);
db.Attack = require('./attack')(sequelize);
db.Scriptmon = require('./scriptmon')(sequelize);
db.UserScriptmon = require('./userScriptmon')(sequelize);

// Relations
db.Type.hasMany(db.Attack, { foreignKey: 'typeId' });
db.Attack.belongsTo(db.Type, { foreignKey: 'typeId' });

db.Type.hasMany(db.Scriptmon, { foreignKey: 'typeId' });
db.Scriptmon.belongsTo(db.Type, { foreignKey: 'typeId' });

db.User.belongsToMany(db.Scriptmon, { through: db.UserScriptmon, foreignKey: 'userId' });
db.Scriptmon.belongsToMany(db.User, { through: db.UserScriptmon, foreignKey: 'scriptmonId' });

module.exports = db;
