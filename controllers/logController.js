const Log = require('../models/logModel');  // Import the Log model
const asyncHandler = require('express-async-handler');

// Create a new log entry when a user accesses a password
const createLog = asyncHandler(async (req, res) => {
  const { appName, userName } = req.body;

  if (!appName || !userName) {
    res.status(400);
    throw new Error("Please provide appName and userName");
  }

  const logEntry = await Log.create({
    userName,
    appName,
    accessedAt: new Date(),  // Record the current time when the log is created
  });

  res.status(201).json({
    message: "Log entry created successfully",
    logEntry,
  });
});

const getLogs = asyncHandler(async (req, res) => {
    // Check if user is an admin (you should add middleware for this)
    if (req.user.userType !== 'admin') {
      res.status(403);
      throw new Error("Access denied. Admins only.");
    }
  
    const logs = await Log.find().sort({ accessedAt: -1 });  // Sort logs by access time (latest first)
  
    if (logs.length === 0) {
      res.status(404).json({ message: "No logs found" });
    }
  
    res.json(logs);
  });

  module.exports = { createLog, getLogs };
