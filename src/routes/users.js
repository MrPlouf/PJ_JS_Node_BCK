const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleMiddleware = require('../utils/roleMiddleware');

// Lister tous les users (seulement admin)
router.get('/', auth, roleMiddleware(['admin']), userController.getAllUsers);

// Créer un user (endpoint POST)
router.post('/', userController.createUser);

// Modifier un user (admin seulement)
router.put('/:id', auth, roleMiddleware(['admin']), userController.updateUser);

// Supprimer un user (admin seulement)
router.delete('/:id', auth, roleMiddleware(['admin']), userController.deleteUser);

module.exports = router;