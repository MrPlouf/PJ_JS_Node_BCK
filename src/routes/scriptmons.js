const express = require('express');
const router = express.Router();
const scriptmonController = require('../controllers/scriptmonController');
const auth = require('../middleware/auth');
const roleMiddleware = require('../utils/roleMiddleware');

// Public GET
router.get('/', scriptmonController.getAllScriptmons);
router.get('/:id', scriptmonController.getScriptmonById);

// Admin Only for CRUD
router.post('/', auth, roleMiddleware(['admin']), scriptmonController.createScriptmon);
router.put('/:id', auth, roleMiddleware(['admin']), scriptmonController.updateScriptmon);
router.delete('/:id', auth, roleMiddleware(['admin']), scriptmonController.deleteScriptmon);

module.exports = router;
