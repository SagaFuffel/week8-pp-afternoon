const express = require('express');
const cors = require('cors');
const workoutRouter = require('./routes/workoutRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');
const userRouter = require("../backend/routes/userRouter");
const app = express();
require("dotenv").config();
// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/workouts', workoutRouter);
app.use('/api/users', userRouter);

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

