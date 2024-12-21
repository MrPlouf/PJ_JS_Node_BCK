const { User } = require('../models');
// const bcrypt = require('bcrypt'); // si tu veux hasher

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await User.findAll({ attributes: ['id','username','email','role'] });
    res.json(users);
  },

  createUser: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing fields: username, email, or password' });
      }

      // const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        // password: hashedPassword,
        password,
        role: role || 'user'
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update({ username, email, role });
    res.json(user);
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  }
};