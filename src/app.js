// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Import de tes routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const scriptmonRoutes = require('./routes/scriptmons');
const typeRoutes = require('./routes/types');
const attackRoutes = require('./routes/attacks');
const captureRoutes = require('./routes/capture');

// Fonction principale
async function main() {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/scriptmons', scriptmonRoutes);
  app.use('/types', typeRoutes);
  app.use('/attacks', attackRoutes);
  app.use('/capture', captureRoutes);

  // Vérification de la connexion à la DB
  try {
    await sequelize.authenticate();
    console.log('Connection to the DB has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the DB:', error);
  }

  // Synchronisation avec la DB
  await sequelize.sync({ force: false });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Démarrage de l’application
main().catch(err => {
  console.error('Failed to start the application:', err);
});