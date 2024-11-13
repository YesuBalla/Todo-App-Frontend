import {Component} from 'react'   
import Cookies from 'js-cookie'
import Header from '../Header'
import TodoForm from '../TodoForm'
import TodoList from '../TodoList'
import ThemeContext from '../../context/ThemeContext'
import todoLogo from '../../assets/todoLogo.png'
import todoRegisterImage from '../../assets/todoRegisterImage.png'

import {
    AppContainer,
    ContentContainer,
    ListHeading,
    AddTodoContainer,
    TodoListContainer,
    EmptyTodosContainer,
    EmptyTodosLogo,
    EmptyTodosCaption,
    EmptyTodosImage,
    EmptyTodosLogoContainer,
    EmptyTodosImageContainer,
    HorizontalLine
} from './styledComponents'

class TodoHome extends Component {
    state = {
        todos: [], todoToEdit: null
    }

    getTodos = async () => {
        try {
            const jwtToken = Cookies.get('jwt_token')
            const response = await fetch('https://todo-app-backend-2zeu.onrender.com/todos/', {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            });
            const data = await response.json();
            this.setState({ todos: data });
          } catch (error) {
            console.error('Error fetching todos:', error);
          }
    }

    componentDidMount() {
        this.getTodos();
    }

    handleAddTodo = async (newTodo) => {
        try {
          const jwtToken = Cookies.get('jwt_token');
          const response = await fetch('https://todo-app-backend-2zeu.onrender.com/todos/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(newTodo),
          });
    
          if (response.ok) {
            const addedTodo = await response.text();
            console.log(addedTodo);
            this.getTodos()
          } else {
            console.error('Failed to add todo');
          }
        } catch (error) {
          console.error('Error adding todo:', error);
        }
      };

    handleEditTodo = (todo) => {
      this.setState({ todoToEdit: todo });
    };

    handleUpdateTodo = async (id, updatedTodo) => {
        const {todos} = this.state
        try {
          const jwtToken = Cookies.get('jwt_token');
          const response = await fetch(`https://todo-app-backend-2zeu.onrender.com/todos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(updatedTodo),
          });
    
          if (response.ok) {
            this.setState({todos: todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))})
            this.setState({ todoToEdit: null });
          } else {
            console.error('Failed to update todo');
          }
        } catch (error) {
          console.error('Error updating todo:', error);
        }
      };
    
    handleDeleteTodo = async (id) => {
        const {todos} = this.state
        try {
          const jwtToken = Cookies.get('jwt_token');
          const response = await fetch(`https://todo-app-backend-2zeu.onrender.com/todos/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
    
          if (response.ok) {
            this.setState({todos: todos.filter((todo) => todo.id !== id)})
          } else {
            console.error('Failed to delete todo');
          }
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      };

 

    
    
    render() {
        const {todos, todoToEdit} = this.state
        return(<ThemeContext.Consumer>
            {value => {
                const {isDarkTheme} = value 
                const bgcolor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
                return (
                    <AppContainer $bgcolor={bgcolor}>
                        <Header />
                        <ContentContainer>
                            <AddTodoContainer>
                            <TodoForm
                                onAddTodo={this.handleAddTodo}
                                todoToEdit={todoToEdit}
                                onUpdateTodo={this.handleUpdateTodo}
                                onCancel={() => this.setState({todoToEdit: null})}
                            />
                            </AddTodoContainer>
                            <HorizontalLine />
                            {todos.length === 0 ? 
                              <EmptyTodosContainer>
                                <EmptyTodosLogoContainer>
                                  <EmptyTodosLogo
                                    src={todoLogo}
                                    alt="website logo"
                                  />
                                  <EmptyTodosCaption color={isDarkTheme? '#ffffff' : '#475569'}>
                                  Create a Todo to stay organized, enhance productivity, and achieve your goals with clarity and focus.
                                  </EmptyTodosCaption>
                                </EmptyTodosLogoContainer>
                                <EmptyTodosImageContainer>
                                  <EmptyTodosImage
                                    src={todoRegisterImage}
                                    alt="website logo"
                                  />
                                </EmptyTodosImageContainer>
                              </EmptyTodosContainer> :
                            <TodoListContainer>
                                <ListHeading>Todos List</ListHeading>
                                <TodoList todos={todos} onEditTodo={this.handleEditTodo} onDeleteTodo={this.handleDeleteTodo} />
                            </TodoListContainer>}
                        </ContentContainer>
                    </AppContainer>
                )
            }}
        </ThemeContext.Consumer>)
    }
}

export default TodoHome



