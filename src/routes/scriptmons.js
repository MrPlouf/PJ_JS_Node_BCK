// routes/scriptmons.js
const express = require('express');
const router = express.Router();
const scriptmonController = require('../controllers/scriptmonController');
const auth = require('../middleware/auth');
const roleMiddleware = require('../utils/roleMiddleware');

// GET all scriptmons (tout le monde peut voir)
router.get('/', scriptmonController.getAllScriptmons);

// CREATE (admin only)
router.post('/', auth, roleMiddleware(['admin']), scriptmonController.createScriptmon);

// UPDATE (admin only)
router.put('/:id', auth, roleMiddleware(['admin']), scriptmonController.updateScriptmon);

// DELETE (admin only)
router.delete('/:id', auth, roleMiddleware(['admin']), scriptmonController.deleteScriptmon);

module.exports = router;