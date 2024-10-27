```javascript
// authController.js
const bcrypt = require('bcrypt');
const { users } = require('../models/users'); // Adjusted to match table name
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await users.create({ email, password: hashedPassword }); // Adjusted model usage
    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ where: { email } }); // Adjusted model usage
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
```