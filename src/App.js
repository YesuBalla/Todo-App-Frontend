import { Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginForm from '../src/components/LoginForm'
import RegisterForm from '../src/components/RegisterForm'
import TodoHome from './components/TodoHome'
import UserProfilePage from './components/UserProfilePage'
import ProtectedRoute from '../src/components/ProtectedRoute'

import ThemeContext from './context/ThemeContext'

import './App.css';

class App extends Component {
  state = {
    isDarkTheme: false,
  }

  toggleTheme = () => {
    this.setState(prevState => ({ isDarkTheme:!prevState.isDarkTheme }))
  }
  render() {
    const { isDarkTheme } = this.state;
    return(
      <ThemeContext.Provider value={{ isDarkTheme, toggleTheme: this.toggleTheme}}>
        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <ProtectedRoute exact path='/' component={TodoHome} />
          <ProtectedRoute path='/profile' component={UserProfilePage} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App;