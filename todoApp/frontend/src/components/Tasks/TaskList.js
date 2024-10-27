import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.js.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low'
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.response.data.error);
      }
    };
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.dueDate) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/tasks', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setTasks([...tasks, response.data]);
      setForm({ title: '', description: '', dueDate: '', priority: 'Low' });
    } catch (error) {
      console.error('Error adding task:', error.response.data.error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error.response.data.error);
    }
  };

  return (
    <div className="task-list">
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task Title"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Task Description"
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <ul className="tasks">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
