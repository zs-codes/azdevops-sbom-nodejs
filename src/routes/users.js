const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const { formatDate, logger } = require('../utils/helpers');

const router = express.Router();

// In-memory store (demo purposes)
let users = [];

// Validation schema
const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

// GET all users
router.get('/', (req, res) => {
  const safeUsers = users.map(u => _.omit(u, ['password']));
  res.json(safeUsers);
});

// POST create user
router.post('/', async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);
  
  const user = {
    id: uuidv4(),
    ...value,
    password: hashedPassword,
    createdAt: formatDate(new Date())
  };

  users.push(user);
  logger.info(`User created: ${user.id}`);
  
  res.status(201).json(_.omit(user, ['password']));
});

// POST login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = _.find(users, { email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;