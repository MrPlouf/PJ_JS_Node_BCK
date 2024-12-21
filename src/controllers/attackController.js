// controllers/attackController.js
const { Attack } = require('../models');

module.exports = {
  // GET all
  async getAllAttacks(req, res) {
    try {
      const attacks = await Attack.findAll();
      return res.json(attacks);
    } catch (error) {
      console.error('Error fetching attacks:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // CREATE (admin)
  async createAttack(req, res) {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      const attack = await Attack.create({ name, description });
      return res.status(201).json(attack);
    } catch (error) {
      console.error('Error creating attack:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // UPDATE (admin)
  async updateAttack(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const attack = await Attack.findByPk(id);
      if (!attack) return res.status(404).json({ error: 'Attack not found' });

      if (name !== undefined) attack.name = name;
      if (description !== undefined) attack.description = description;
      await attack.save();

      return res.json(attack);
    } catch (error) {
      console.error('Error updating attack:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // DELETE (admin)
  async deleteAttack(req, res) {
    try {
      const { id } = req.params;
      const attack = await Attack.findByPk(id);
      if (!attack) return res.status(404).json({ error: 'Attack not found' });

      await attack.destroy();
      return res.json({ message: 'Attack deleted' });
    } catch (error) {
      console.error('Error deleting attack:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};