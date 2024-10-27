```javascript
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Low',
    allowNull: false
  }
}, {
  tableName: 'tasks',
  timestamps: false
});

// GET /tasks - Retrieve all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await taskController.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks.' });
  }
});

// POST /tasks - Create a new task
router.post('/tasks', async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  if (!title || !description || !dueDate || !priority) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const newTask = await taskController.createTask({ title, description, dueDate, priority });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the task.' });
  }
});

// PUT /tasks/:id - Update an existing task
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority } = req.body;
  if (!title || !description || !dueDate || !priority) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const updatedTask = await taskController.updateTask(id, { title, description, dueDate, priority });
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the task.' });
  }
});

// DELETE /tasks/:id - Delete a task
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await taskController.deleteTask(id);
    if (result) {
      res.status(200).json({ message: 'Task deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Task not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the task.' });
  }
});

module.exports = router;
```