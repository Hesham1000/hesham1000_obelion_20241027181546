```javascript
const { Task } = require('../models/taskModel');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

async function addTask(req, res) {
  try {
    const { title, description, dueDate, priority } = req.body;
    if (!title || !description || !dueDate || !priority) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const task = await Task.create({ title, description, dueDate, priority });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the task' });
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority } = req.body;
    if (!title || !description || !dueDate || !priority) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.update({ title, description, dueDate, priority });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the task' });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the task' });
  }
}

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask
};
```