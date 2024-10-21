const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');


require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('tiny'));


// Routes

app.use('/', mainRoutes);


app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;