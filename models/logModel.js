const mongoose = require('mongoose');

const logSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    appName: {
      type: String,
      required: true,
    },
    accessedAt: {
      type: Date,
      default: Date.now, // Log the time of access automatically
    },
  },
  {
    timestamps: true, // To track createdAt and updatedAt
  }
);

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
