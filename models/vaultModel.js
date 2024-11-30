const mongoose = require('mongoose');
const crypto = require('crypto');

// Define the Vault Schema
const vaultSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User Model
      required: true,
    },
    appName: {
      type: String,
      required: true,
    },
    appURL: {
      type: String,
      required: true,
    },
    appUserName: {
      type: String,
      required: true,
    },
    appPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,  // to store createdAt and updatedAt
  }
);

// Pre-save hook to encrypt the app password before saving
vaultSchema.pre('save', function (next) {
  if (this.isModified('appPassword')) {
    const cipher = crypto.createCipheriv('aes-256-cbc', process.env.ENCRYPTION_KEY, process.env.ENCRYPTION_IV);
    let encryptedPassword = cipher.update(this.appPassword, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    this.appPassword = encryptedPassword;
  }
  next();
});



const Vault = mongoose.model('Vault', vaultSchema);

module.exports = Vault;
