import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TodoListContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const TodoListTitle = styled.h1`
  color: #333;
`;

const TodoListItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TodoButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #d32f2f;
  }
`;

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    fetch('/todos/')
      .then(response => response.json())
      .then(data => this.setState({ todos: data }))
      .catch(error => console.error('Error fetching todos:', error));
  }

  handleDelete = (id) => {
    fetch(`/todos/${id}/`, {
      method: 'DELETE'
    })
      .then(() => this.setState(prevState => ({
        todos: prevState.todos.filter(todo => todo.id !== id)
      })))
      .catch(error => console.error('Error deleting todo:', error));
  };

  render() {
    const { todos } = this.state;
    return (
      <TodoListContainer>
        <TodoListTitle>Todo List</TodoListTitle>
        <Link to="/new">Add New Todo</Link>
        <ul>
          {todos.map(todo => (
            <TodoListItem key={todo.id}>
              {todo.todo}
              <Link to={`/todos/${todo.id}`}>Edit</Link>
              <TodoButton onClick={() => this.handleDelete(todo.id)}>Delete</TodoButton>
            </TodoListItem>
          ))}
        </ul>
      </TodoListContainer>
    );
  }
}

export default TodoList;
