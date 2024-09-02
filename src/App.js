import {Switch, Route} from 'react-router-dom'
import LoginForm from '../src/components/LoginForm'
import RegisterForm from '../src/components/RegisterForm'
import NxtTodo from '../src/components/NxtTodo'
import ProtectedRoute from '../src/components/ProtectedRoute'
import TodoForm from '../src/components/TodoForm'


import './App.css';

const App = () => (
  <Switch>
    <Route path='/login' component={LoginForm} />
    <Route path='/register' component={RegisterForm} />
    <ProtectedRoute exact path='/' component={NxtTodo} />
    <ProtectedRoute exact path='/new' component={TodoForm} />
  </Switch>
)

export default App