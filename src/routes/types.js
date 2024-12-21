const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');
const auth = require('../middleware/auth');
const roleMiddleware = require('../utils/roleMiddleware');

// Public GET
router.get('/', typeController.getAllTypes);

// Admin Only CREATE
router.post('/', auth, roleMiddleware(['admin']), typeController.createType);

module.exports = router;