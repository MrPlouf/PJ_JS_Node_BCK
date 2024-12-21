const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleMiddleware = require('../utils/roleMiddleware');

router.get('/', auth, roleMiddleware(['admin']), userController.getAllUsers);
router.put('/:id', auth, roleMiddleware(['admin']), userController.updateUser);
router.delete('/:id', auth, roleMiddleware(['admin']), userController.deleteUser);
router.post('/', userController.createUser);

module.exports = router;