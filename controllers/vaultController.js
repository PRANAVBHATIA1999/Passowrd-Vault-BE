const Vault = require('../models/vaultModel');
const asyncHandler = require('express-async-handler');

// Utility function to decrypt passwords
const decryptPassword = require('../utils/passwordVault');

// Add a new password to the vault
const addPassword = asyncHandler(async (req, res) => {
  const { appName, appURL, appUserName, appPassword } = req.body;

  if (!appName || !appURL || !appUserName || !appPassword) {
    res.status(400);
    throw new Error('Please provide all fields');
  }

  const vaultData = new Vault({
    user: req.user._id,  // The user is attached to the request after token verification
    appName,
    appURL,
    appUserName,
    appPassword,
  });

  const savedVaultData = await vaultData.save();

  res.status(201).json(savedVaultData);
});

// Get user's vault data
const getUserVaultData = asyncHandler(async (req, res) => {
  const vaultData = await Vault.find({ user: req.user._id });

  if (!vaultData || vaultData.length === 0) {
    res.status(404);
    throw new Error('No vault data found');
  }

  // Decrypt passwords before sending them to the user
  const decryptedVaultData = vaultData.map(item => {
    console.log('Encrypted Password:', item.appPassword);  // Log encrypted password to check if it's correct
    return {
      ...item.toObject(),  // Convert to plain object
      appPassword: decryptPassword(item.appPassword),  // Call the utility function
    };
  });

  res.json(decryptedVaultData);
});

module.exports = { addPassword, getUserVaultData };
