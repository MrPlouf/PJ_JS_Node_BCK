const { User } = require('../models');

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await User.findAll({attributes: ['id','username','email','role']});
    res.json(users);
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const user = await User.findByPk(id);
    if(!user) return res.status(404).json({error:'User not found'});
    await user.update({ username, email, role });
    res.json(user);
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if(!user) return res.status(404).json({error:'User not found'});
    await user.destroy();
    res.json({message:'User deleted'});
  }
};
