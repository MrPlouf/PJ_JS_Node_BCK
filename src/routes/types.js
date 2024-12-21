// routes/types.js
const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');
const auth = require('../middleware/auth');
const roleMiddleware = require('../utils/roleMiddleware');

// GET all (tout le monde peut voir)
router.get('/', typeController.getAllTypes);

// CREATE (admin)
router.post('/', auth, roleMiddleware(['admin']), typeController.createType);

// UPDATE (admin)
router.put('/:id', auth, roleMiddleware(['admin']), typeController.updateType);

// DELETE (admin)
router.delete('/:id', auth, roleMiddleware(['admin']), typeController.deleteType);

module.exports = router;