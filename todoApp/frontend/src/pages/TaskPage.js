import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskPage.js.css';

const TaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = 'Title is required';
    if (!description) errors.description = 'Description is required';
    if (!dueDate) errors.dueDate = 'Due date is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const newTask = { title, description, dueDate, priority };
        await axios.post('http://localhost:8000/api/tasks', newTask, {
          headers: { 'Content-Type': 'application/json' },
        });
        setTasks([...tasks, newTask]);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Low');
        setErrors({});
      } catch (error) {
        console.error('Error creating task:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-page">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {errors.dueDate && <span className="error">{errors.dueDate}</span>}
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
