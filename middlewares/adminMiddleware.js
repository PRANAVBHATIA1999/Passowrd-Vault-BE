const asyncHandler = require('express-async-handler');

// Middleware to ensure the user is an admin
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.userType === 'admin') {
    next();  // Proceed to the next middleware/route handler
  } else {
    res.status(403);
    throw new Error('Admin privileges required');
  }
});

module.exports = admin;
