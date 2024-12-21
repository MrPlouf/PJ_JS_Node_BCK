// controllers/typeController.js
const { Type } = require('../models');

module.exports = {
  // GET all
  async getAllTypes(req, res) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (error) {
      console.error('Error fetching types:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // CREATE (admin)
  async createType(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      const type = await Type.create({ name });
      return res.status(201).json(type);
    } catch (error) {
      console.error('Error creating type:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // UPDATE (admin)
  async updateType(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const type = await Type.findByPk(id);
      if (!type) return res.status(404).json({ error: 'Type not found' });

      if (name !== undefined) type.name = name;
      await type.save();

      return res.json(type);
    } catch (error) {
      console.error('Error updating type:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // DELETE (admin)
  async deleteType(req, res) {
    try {
      const { id } = req.params;
      const type = await Type.findByPk(id);
      if (!type) return res.status(404).json({ error: 'Type not found' });

      await type.destroy();
      return res.json({ message: 'Type deleted' });
    } catch (error) {
      console.error('Error deleting type:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};