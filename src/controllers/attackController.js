const { Attack } = require('../models');

module.exports = {
  getAllAttacks: async (req, res) => {
    const attacks = await Attack.findAll();
    res.json(attacks);
  },
  createAttack: async (req, res) => {
    const { name, description, typeId } = req.body;
    try {
      const attack = await Attack.create({ name, description, typeId });
      res.status(201).json(attack);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
