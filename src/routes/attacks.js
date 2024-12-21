// routes/attacks.js
const express = require('express');
const router = express.Router();
const attackController = require('../controllers/attackController');
const auth = require('../middleware/auth');
const roleMiddleware = require('../utils/roleMiddleware');

// GET all
router.get('/', attackController.getAllAttacks);

// CREATE (admin)
router.post('/', auth, roleMiddleware(['admin']), attackController.createAttack);

// UPDATE (admin)
router.put('/:id', auth, roleMiddleware(['admin']), attackController.updateAttack);

// DELETE (admin)
router.delete('/:id', auth, roleMiddleware(['admin']), attackController.deleteAttack);

module.exports = router;