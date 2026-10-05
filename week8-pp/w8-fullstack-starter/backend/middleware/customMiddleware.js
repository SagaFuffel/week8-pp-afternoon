const logger = require('../utils/logger');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: error.message });
};

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  const body = req.body ? { ...req.body } : undefined;
  if (body && Object.hasOwn(body, 'password')) body.password = '[redacted]';
  logger.info('Body:  ', body);
  logger.info('---');
  next();
};

module.exports = { unknownEndpoint, errorHandler, requestLogger };