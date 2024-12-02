const express = require('express');
const protect = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');  // Ensure user is admin
const { addPassword, getUserVaultData } = require('../controllers/vaultController');
const { createLog, getLogs } = require('../controllers/logController');

const router = express.Router();

// Add a new password to the vault (Protected route)
router.post('/add', protect, addPassword);

// Get user's vault data (Protected route)
router.get('/', protect, getUserVaultData);


router.post('/create', protect, createLog);

router.get('/logs', protect, admin, getLogs);




module.exports = router;
