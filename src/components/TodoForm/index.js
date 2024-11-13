import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './index.css'

const TodoForm = ({ onAddTodo, todoToEdit, onUpdateTodo, onCancel }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title || '');
      setStatus(todoToEdit.status || 'pending');
      setPriority(todoToEdit.priority || 'Medium');
      setCategory(todoToEdit.category || '');
    }
  }, [todoToEdit]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === '') {
      alert('Title is required!');
      return;
    }

    const todo = {
      id: uuidv4(),
      title,
      status,
      priority,
      category,
    };

    if (todoToEdit) {
      onUpdateTodo(todoToEdit.id, todo);
    } else {
      onAddTodo(todo);
    }
    // Reset form fields
    resetForm();;
  };

  const handleCancel = () => {
    // Reset form fields when cancel is triggered
    resetForm();
    if (onCancel) onCancel();
  };

  const resetForm = () => {
    setTitle('');
    setStatus('pending');
    setPriority('Medium');
    setCategory('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {/* Title Input */}
      <div className="title-form-group">
        <label className='title-label' htmlFor="title">Todo Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          required
          className='input-field'
        />
      </div>
      <div className='todo-details-container'>
        {/* Status Dropdown */}
        <div className="form-group">
          <label className='label-text' htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            className='select-input'
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Priority Dropdown */}
        <div className="form-group">
          <label className='label-text' htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            className='select-input'
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Category Input */}
        <div className="form-group">
          <label className='label-text' htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            className='select-input'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter todo category"
          />
        </div>
      </div>
      <div className='buttons-container'>
        {/* Submit and Cancel Buttons */}
        <button className='add-todo-button' type="submit">{todoToEdit ? 'Update Todo' : 'Add Todo'}</button>
        { onCancel && todoToEdit && (<button className='cancel-button' type="button" onClick={handleCancel}>Cancel</button>)}
      </div>
    </form>
  );
};

export default TodoForm;
