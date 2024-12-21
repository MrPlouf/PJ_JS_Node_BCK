// controllers/authController.js
const { User } = require('../models'); 
const jwt = require('jsonwebtoken');   // npm install jsonwebtoken
// Ton secret JWT (à mettre dans .env)
const JWT_SECRET = process.env.JWT_SECRET || 'secretKeyJWT';

module.exports = {
  // REGISTER (optionnel, si tu veux inscrire de nouveaux users)
  register: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      
      // Vérifications basiques
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing username, email or password' });
      }
      // On peut laisser le `role` facultatif ; par défaut, c’est 'user'
      // ou alors on autorise l’admin à passer `role: 'admin'`.

      // On crée le user
      const newUser = await User.create({ username, email, password, role });

      // On renvoie le nouvel utilisateur (ou juste un message)
      return res.status(201).json({
        message: 'User registered successfully',
        user: newUser
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // LOGIN (ce qui nous intéresse le plus)
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }

      // Chercher le user par email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Vérifier le mot de passe (ton modèle User a checkPassword)
      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Générer un token JWT
      const token = jwt.sign({
        id: user.id,
        role: user.role,
        username: user.username
      }, JWT_SECRET, { expiresIn: '1d' }); // par ex. 1 jour

      return res.json({ 
        message: 'Login successful',
        token
      });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};