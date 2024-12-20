// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const scriptmonRoutes = require('./routes/scriptmons');
const typeRoutes = require('./routes/types');
const attackRoutes = require('./routes/attacks');
const captureRoutes = require('./routes/capture');

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/scriptmons', scriptmonRoutes);
  app.use('/types', typeRoutes);
  app.use('/attacks', attackRoutes);
  app.use('/capture', captureRoutes);

  // Synchronisation DB
  await sequelize.sync({ force: false });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Appel de la fonction main
main().catch(err => {
  console.error('Failed to start the application:', err);
});
