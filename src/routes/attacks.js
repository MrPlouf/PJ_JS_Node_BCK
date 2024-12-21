const express = require('express');
const router = express.Router();
const attackController = require('../controllers/attackController');
const auth = require('../middleware/auth');
const roleMiddleware = require('../utils/roleMiddleware');

// Public GET
router.get('/', attackController.getAllAttacks);

// Admin Only CREATE
router.post('/', auth, roleMiddleware(['admin']), attackController.createAttack);

module.exports = router;