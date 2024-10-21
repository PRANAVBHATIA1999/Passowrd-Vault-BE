const express = require('express');
const { getHealth, welcomeMessage } = require('../controllers/mainController');

const router = express.Router();

router.get('/health', getHealth);
router.get('/', welcomeMessage);

module.exports = router;