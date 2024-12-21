// models/index.js
const { Sequelize } = require('sequelize');
const TypeModel = require('./type');
const AttackModel = require('./attack');
const ScriptmonModel = require('./scriptmon');
// etc.

const sequelize = new Sequelize(/* config depuis .env */);

const Type = TypeModel(sequelize);
const Attack = AttackModel(sequelize);
const Scriptmon = ScriptmonModel(sequelize);

// ASSOCIATIONS
// 1) Scriptmon -> Type (un scriptmon appartient à un type)
Scriptmon.belongsTo(Type, {
  foreignKey: 'typeId',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});
Type.hasMany(Scriptmon, {
  foreignKey: 'typeId',
});

// 2) Scriptmon -> Attack (many-to-many)
Scriptmon.belongsToMany(Attack, {
  through: 'ScriptmonAttacks',  // table pivot
  foreignKey: 'scriptmonId',
});
Attack.belongsToMany(Scriptmon, {
  through: 'ScriptmonAttacks',
  foreignKey: 'attackId',
});

// Export
module.exports = {
  sequelize,
  User,
  Type,
  Attack,
  Scriptmon,
};