const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const vaultRoutes = require('./routes/vaulRoutes');  // Import vault routes
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');


require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());



// Routes

app.use('/', mainRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vault', vaultRoutes);  // Add the vault routes

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;