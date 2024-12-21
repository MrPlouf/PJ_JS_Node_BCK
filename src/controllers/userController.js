// controllers/authController.js
const { User } = require('../models');
const bcrypt = require('bcrypt'); // npm install bcrypt si ce n’est pas fait

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;

      // Vérifications basiques
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing fields: username, email, or password' });
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création de l’utilisateur
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword, // on stocke le hash
        // Si on souhaite explicitement créer un admin, on prend la valeur envoyée ou on force 'admin'
        role: role || 'user' 
      });

      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          // Pas besoin de renvoyer le password haché au client
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};