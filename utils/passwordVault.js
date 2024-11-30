const crypto = require('crypto');

const decryptPassword = (encryptedPassword) => {
  console.log('decryptPassword called');
  const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.ENCRYPTION_KEY, process.env.ENCRYPTION_IV);
  let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
  decryptedPassword += decipher.final('utf8');
  return decryptedPassword;
};

module.exports = decryptPassword;