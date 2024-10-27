import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.js.css';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8000/api/tasks', {
          title,
          description,
          dueDate,
          priority
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        addTask(response.data);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Low');
        setServerError('');
      } catch (error) {
        setServerError('An error occurred while creating the task');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {serverError && <span>{serverError}</span>}
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span>{errors.title}</span>}
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <span>{errors.description}</span>}
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {errors.dueDate && <span>{errors.dueDate}</span>}
      </div>
      <div>
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
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
