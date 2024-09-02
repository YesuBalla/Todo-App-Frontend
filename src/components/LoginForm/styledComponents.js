import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const LinkItem = styled(Link)`
  text-decoration: none;
`

export const LoginPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.$bgcolor};
`
export const LoginFormCardContainer = styled.div`
  padding: 50px 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 30%;
  background-color: ${props => props.$cardcolor};
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`
export const FormContainer = styled.form`
  width: 90%;
  margin-top: 2%;
  @media screen and (max-width: 768px) {
    margin-top: 10%;
  }
`
export const LoginLogo = styled.img`
  width: 40%;
`
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;
  color: ${props => props.color};
`

export const LoginButton = styled.button`
  background-color: #e3404b;
  padding: 4%;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 4%;
  width: 100%;
`

export const InputLabel = styled.label`
  font-size: 12px;
  font-weight: bold;
  opacity: 0.9;
`

export const UserInput = styled.input`
  font-size: 16px;
  color: #0290bf;
  border: 1px solid #94a3b8;
  border-radius: 4px;
  margin-top: 5px;
  padding: 12px 14px;
  outline: none;
  font-weight: bold;
  opacity: 0.8;
  background-color: transparent;
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 5px;
`
export const ShowPassword = styled.label`
  font-size: 15px;
  color: ${props => props.color};
  font-weight: 500;
`
export const SubmitError = styled.p`
  font-size: 15px;
  color: #ff0b37;
  font-weight: 500;
  margin-top: 4px;
`
export const SingUpContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  margin-top: 3%;
` 

export const SingUpText = styled.p`
  margin: 0px;
  font-size: 18px;
  color: ${props => props.color};
`

export const SignUpButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: #0290bf;
  font-weight: bold;
  padding: 10px;
  margin-top: 4px;
  cursor: pointer;
`