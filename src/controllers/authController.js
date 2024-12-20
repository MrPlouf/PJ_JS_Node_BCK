const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      res.status(201).json(user);
    } catch(err) {
      res.status(400).json({error: err.message});
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }});
    if(!user) return res.status(404).json({error: 'User not found'});
    const match = await user.checkPassword(password);
    if(!match) return res.status(401).json({error: 'Invalid password'});
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({token});
  }
};
