const { Scriptmon, Type } = require('../models');

module.exports = {
  getAllScriptmons: async (req, res) => {
    const list = await Scriptmon.findAll({ include: Type });
    res.json(list);
  },
  getScriptmonById: async (req, res) => {
    const { id } = req.params;
    const scriptmon = await Scriptmon.findByPk(id, { include: Type });
    if(!scriptmon) return res.status(404).json({error:'Not found'});
    res.json(scriptmon);
  },
  createScriptmon: async (req, res) => {
    const { number, name, typeId, captureRate } = req.body;
    const scriptmon = await Scriptmon.create({ number, name, typeId, captureRate });
    res.status(201).json(scriptmon);
  },
  updateScriptmon: async (req, res) => {
    const { id } = req.params;
    const { number, name, typeId, captureRate } = req.body;
    const scriptmon = await Scriptmon.findByPk(id);
    if(!scriptmon) return res.status(404).json({error:'Not found'});
    await scriptmon.update({ number, name, typeId, captureRate });
    res.json(scriptmon);
  },
  deleteScriptmon: async (req, res) => {
    const { id } = req.params;
    const scriptmon = await Scriptmon.findByPk(id);
    if(!scriptmon) return res.status(404).json({error:'Not found'});
    await scriptmon.destroy();
    res.json({message:'Deleted'});
  }
};
