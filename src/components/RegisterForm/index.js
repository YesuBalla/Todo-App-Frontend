import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import ThemeContext from '../../context/ThemeContext'
import todoLogo from '../../assets/todoLogo.png'
import todoRegisterImage from '../../assets/todoRegisterImage.png'

import {
  RegisterPageContainer,
  RegisterFormCardContainer,
  FormContainer,
  RegisterLogo,
  InputContainer,
  RegisterButton,
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
  RegisterCaption,
  RegisterContainer,
  RegisterImage,
} from './styledComponents'

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = successMsg => {
    const {history} = this.props
    alert(successMsg)
    history.replace('/login')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, email, password} = this.state
    const userDetails = {id: uuidv4(), username, email, password}
    const registerUrl = 'https://todo-app-backend-2zeu.onrender.com/register'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(registerUrl, options)
    const responseMsg = await response.text()
    if (response.ok) {
      this.onSubmitSuccess(responseMsg)
    } else {
      this.onSubmitFailure(responseMsg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <InputLabel htmlFor="username">USERNAME</InputLabel>
        <UserInput
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
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
            <RegisterPageContainer $bgcolor={bgcolor}>
              <RegisterContainer>
              <RegisterLogo
                  src={todoLogo}
                  alt="website logo"
                />
                <RegisterCaption color={isDarkTheme? '#ffffff' : '#475569'}>
                  Sign up to get organized, stay motivated, and get things done.
                </RegisterCaption>
                <RegisterImage
                  src={todoRegisterImage}
                  alt="website logo"
                />
              </RegisterContainer>
              <RegisterFormCardContainer
                $cardcolor={isDarkTheme ? '#191a1a' : '#ffffff'}
              >
                <FormContainer onSubmit={this.onSubmit}>
                  <InputContainer color={isDarkTheme ? '#ffffff' : '#475569'}>
                    {this.renderUsernameField()}
                  </InputContainer>
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
                  <RegisterButton type="submit" className="register-button">
                    Sign Up
                  </RegisterButton>
                  {showSubmitError && <SubmitError>*{errorMsg}</SubmitError>}
                </FormContainer>
                <SingUpContainer>
                  <SingUpText
                    color={isDarkTheme? '#ffffff' : '#475569'}
                  >
                    Have an account?
                  </SingUpText>
                  <LinkItem to='/login'>
                    <SignUpButton>
                      Log in
                    </SignUpButton>
                  </LinkItem>
                </SingUpContainer>
              </RegisterFormCardContainer>
            </RegisterPageContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default RegisterForm