const express = require('express');
const router = express.Router();
const captureController = require('../controllers/captureController');
const auth = require('../middleware/auth');

router.post('/', auth, captureController.captureScriptmon);
router.get('/', auth, captureController.getUserScriptdex);

module.exports = router;
