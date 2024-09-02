import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const FormTitle = styled.h1`
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const FormButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      priority: 'LOW',
      status: 'TO DO',
      category: 'WORK',
      dueDate: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      fetch(`/todos/${id}/`)
        .then(response => response.json())
        .then(data => this.setState({
          todo: data.todo,
          priority: data.priority,
          status: data.status,
          category: data.category,
          dueDate: data.dueDate
        }))
        .catch(error => console.error('Error fetching todo:', error));
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { todo, priority, status, category, dueDate } = this.state;
    const { id } = this.props.match.params;

    const url = id ? `/todos/${id}/` : '/todos/';
    const method = id ? 'PUT' : 'POST';
    const body = JSON.stringify({ todo, priority, status, category, dueDate });

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body
    })
      .then(() => this.props.history.push('/'))
      .catch(error => console.error('Error submitting todo:', error));
  };

  render() {
    const { todo, priority, status, category, dueDate } = this.state;
    return (
      <FormContainer>
        <FormTitle>{this.props.match.params.id ? 'Edit Todo' : 'Add New Todo'}</FormTitle>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormLabel>Todo</FormLabel>
            <FormInput
              type="text"
              name="todo"
              value={todo}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Priority</FormLabel>
            <FormSelect
              name="priority"
              value={priority}
              onChange={this.handleChange}
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </FormSelect>
          </FormGroup>
          <FormGroup>
            <FormLabel>Status</FormLabel>
            <FormSelect
              name="status"
              value={status}
              onChange={this.handleChange}
            >
              <option value="TO DO">To Do</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </FormSelect>
          </FormGroup>
          <FormGroup>
            <FormLabel>Category</FormLabel>
            <FormSelect
              name="category"
              value={category}
              onChange={this.handleChange}
            >
              <option value="WORK">Work</option>
              <option value="HOME">Home</option>
              <option value="LEARNING">Learning</option>
            </FormSelect>
          </FormGroup>
          <FormGroup>
            <FormLabel>Due Date</FormLabel>
            <FormInput
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormButton type="submit">
            {this.props.match.params.id ? 'Update Todo' : 'Add Todo'}
          </FormButton>
        </form>
      </FormContainer>
    );
  }
}

export default withRouter(TodoForm);
