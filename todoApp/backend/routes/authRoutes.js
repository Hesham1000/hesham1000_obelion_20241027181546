```javascript
const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const AuthController = require('../controllers/AuthController');

const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

router.post('/register', async (req, res) => {
  try {
    await sequelize.authenticate();
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const result = await AuthController.register({ email, password });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    await sequelize.authenticate();
    const { email, password } = req.body;
    const result = await AuthController.login({ email, password });
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router;
```