const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { addPassword, getUserVaultData } = require('../controllers/vaultController');

const router = express.Router();

// Add a new password to the vault (Protected route)
router.post('/add', protect, addPassword);

// Get user's vault data (Protected route)
router.get('/', protect, getUserVaultData);

module.exports = router;
