const { Type } = require('../models');

module.exports = {
  getAllTypes: async (req, res) => {
    const types = await Type.findAll();
    res.json(types);
  },
  createType: async (req, res) => {
    const { name } = req.body;
    try {
      const type = await Type.create({ name });
      res.status(201).json(type);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
