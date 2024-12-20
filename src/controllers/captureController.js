const { Scriptmon, UserScriptmon, Type } = require('../models');

module.exports = {
  captureScriptmon: async (req, res) => {
    const count = await Scriptmon.count();
    if(count === 0) return res.status(404).json({error:'No scriptmon in the database'});
    const randomIndex = Math.floor(Math.random() * count);
    const scriptmon = await Scriptmon.findOne({ offset: randomIndex, limit:1 });
    if(!scriptmon) return res.status(404).json({error:'No scriptmon found'});

    const chance = Math.random();
    if(chance <= scriptmon.captureRate) {
      await UserScriptmon.create({userId: req.user.id, scriptmonId: scriptmon.id});
      return res.json({message:'Captured!', scriptmon});
    } else {
      return res.json({message:'Capture failed'});
    }
  },

  getUserScriptdex: async (req, res) => {
    const allScriptmons = await Scriptmon.findAll({ include: Type });
    const userScriptmons = await UserScriptmon.findAll({ where: { userId: req.user.id }});
    const ownedIds = userScriptmons.map(us => us.scriptmonId);

    const scriptdex = allScriptmons.map(s => ({
      id: s.id,
      number: s.number,
      name: s.name,
      type: s.Type.name,
      owned: ownedIds.includes(s.id)
    }));

    res.json(scriptdex);
  }
};
