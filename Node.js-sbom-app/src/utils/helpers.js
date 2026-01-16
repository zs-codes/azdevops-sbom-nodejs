const dayjs = require('dayjs');
const winston = require('winston');
const axios = require('axios');

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Date formatter
const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format);
};

// External API caller (example utility)
const fetchExternal = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

module.exports = {
  logger,
  formatDate,
  fetchExternal
};