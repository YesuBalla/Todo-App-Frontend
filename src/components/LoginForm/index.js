import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import todoLogo from '../../assets/todoLogo.png'

import {
  LoginPageContainer,
  LoginFormCardContainer,
  FormContainer,
  LoginLogo,
  InputContainer,
  LoginButton,
  SubmitError,
  InputLabel,
  UserInput,
  CheckboxContainer,
  Checkbox,
  ShowPassword,
  SingUpContainer,
  SingUpText,
  SignUpButton,
  LinkItem,
} from './styledComponents'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const userDetails = {email, password}
    const loginUrl = 'https://todo-app-backend-2zeu.onrender.com/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSubmitSuccess(data.jwtToken)
    } else {
      const errorData = await response.text()
      this.onSubmitFailure(errorData)
    }
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderEmailField = () => {
    const {email} = this.state
    return (
      <>
        <InputLabel htmlFor="email">EMAIL</InputLabel>
        <UserInput
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={this.onChangeEmail}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <InputLabel htmlFor="password">PASSWORD</InputLabel>
        <UserInput
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgcolor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
          return (
            <LoginPageContainer $bgcolor={bgcolor}>
              <LoginFormCardContainer
                $cardcolor={isDarkTheme ? '#191a1a' : '#ffffff'}
              >
                <LoginLogo
                  src={todoLogo}
                  alt="website logo"
                />
                <FormContainer onSubmit={this.onSubmit}>
                  <InputContainer color={isDarkTheme ? '#ffffff' : '#475569'}>
                    {this.renderEmailField()}
                  </InputContainer>
                  <InputContainer color={isDarkTheme ? '#ffffff' : '#475569'}>
                    {this.renderPasswordField()}
                  </InputContainer>
                  <CheckboxContainer>
                    <Checkbox
                      type="checkbox"
                      id="checkbox"
                      onChange={this.onShowPassword}
                    />
                    <ShowPassword
                      htmlFor="checkbox"
                      color={isDarkTheme ? '#ffffff' : '#1e293b'}
                    >
                      Show Password
                    </ShowPassword>
                  </CheckboxContainer>
                  <LoginButton type="submit" className="login-button">
                    SignIn
                  </LoginButton>
                  {showSubmitError && <SubmitError>*{errorMsg}</SubmitError>}
                </FormContainer>
                <SingUpContainer>
                  <SingUpText
                    color={isDarkTheme? '#ffffff' : '#475569'}
                  >
                    Don't have an account?
                  </SingUpText>
                  <LinkItem to='/register'>
                    <SignUpButton>
                      Sign up
                    </SignUpButton>
                  </LinkItem>
                </SingUpContainer>
              </LoginFormCardContainer>
            </LoginPageContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginForm