// controllers/scriptmonController.js
const { Scriptmon, Type, Attack } = require('../models');

module.exports = {
  // GET all
  async getAllScriptmons(req, res) {
    try {
      // On inclut le type et les attaques
      const scriptmons = await Scriptmon.findAll({
        include: [
          { model: Type, attributes: ['id', 'name'] },
          { model: Attack, attributes: ['id', 'name'] }
        ],
      });
      return res.json(scriptmons);
    } catch (error) {
      console.error('Error fetching scriptmons:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // CREATE
  async createScriptmon(req, res) {
    try {
      const {
        name,
        stars,
        description,
        captureRate,
        typeId,
        attacksIds, // ex. [1, 2, 3]
      } = req.body;

      // Validation minimaliste
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      if (!typeId) {
        return res.status(400).json({ error: 'typeId is required' });
      }

      // Création du scriptmon
      const scriptmon = await Scriptmon.create({
        name,
        stars,
        description,
        captureRate,
        typeId,   // associe directement un Type
      });

      // Associe les attaques (many-to-many)
      if (attacksIds && attacksIds.length > 0) {
        const attacks = await Attack.findAll({ where: { id: attacksIds } });
        await scriptmon.setAttacks(attacks);
      }

      // On re-fetch pour inclure le type et les attaques
      const created = await Scriptmon.findByPk(scriptmon.id, {
        include: [
          { model: Type, attributes: ['id', 'name'] },
          { model: Attack, attributes: ['id', 'name'] }
        ],
      });

      return res.status(201).json(created);
    } catch (error) {
      console.error('Error creating scriptmon:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // UPDATE
  async updateScriptmon(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        stars,
        description,
        captureRate,
        typeId,
        attacksIds,
      } = req.body;

      const scriptmon = await Scriptmon.findByPk(id);
      if (!scriptmon) {
        return res.status(404).json({ error: 'Scriptmon not found' });
      }

      // Mise à jour
      if (name !== undefined) scriptmon.name = name;
      if (stars !== undefined) scriptmon.stars = stars;
      if (description !== undefined) scriptmon.description = description;
      if (captureRate !== undefined) scriptmon.captureRate = captureRate;
      if (typeId !== undefined) scriptmon.typeId = typeId;

      await scriptmon.save();

      // Gérer la relation many-to-many (attacks)
      if (attacksIds) {
        const attacks = await Attack.findAll({ where: { id: attacksIds } });
        await scriptmon.setAttacks(attacks);
      }

      // On re-fetch
      const updated = await Scriptmon.findByPk(id, {
        include: [
          { model: Type, attributes: ['id', 'name'] },
          { model: Attack, attributes: ['id', 'name'] }
        ],
      });

      return res.json(updated);
    } catch (error) {
      console.error('Error updating scriptmon:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // DELETE
  async deleteScriptmon(req, res) {
    try {
      const { id } = req.params;
      const scriptmon = await Scriptmon.findByPk(id);
      if (!scriptmon) {
        return res.status(404).json({ error: 'Scriptmon not found' });
      }
      await scriptmon.destroy();
      return res.json({ message: 'Scriptmon deleted' });
    } catch (error) {
      console.error('Error deleting scriptmon:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};