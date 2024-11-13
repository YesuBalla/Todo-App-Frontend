import React from 'react'; 
import './index.css'

const TodoList = ({ todos, onEditTodo, onDeleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <h3 className='todo-title'>{todo.title}</h3>
          <p className='todo-detail'>Status: {todo.status || 'Not set'}</p>
          <p className='todo-detail'>Priority: {todo.priority || 'Not set'}</p>
          <p className='todo-detail'>Category: {todo.category || 'Not set'}</p>
          <div className="todo-actions">
            <button className='edit-button' onClick={() => onEditTodo(todo)}>Edit</button>
            <button className='delete-button' onClick={() => onDeleteTodo(todo.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
