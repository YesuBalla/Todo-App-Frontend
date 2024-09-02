import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const LinkItem = styled(Link)`
  text-decoration: none;
`
export const NavHeader = styled.nav`
    background-color: ${props => props.$bgcolor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
`

export const AppLogo = styled.img`
    width: 130px;
    outline: none;
    @media screen and (max-width: 768px) {
        width: 100px;
    }
`

export const SearchBarContainer = styled.div`
    display: flex;
    align-items: center;
    width: 40%;
    padding: 5px;
    padding-left: 25px;
    border-radius: 7px;
    background-color: ${props => props.$bgcolor};
    @media screen and (max-width: 768px) {
        display: none;
    }
`
export const Input = styled.input`
    outline: none;
    border: none;
    width: 100%;
    padding: 10px;
    padding-left: 15px;
    font-weight: 500;
    color: #0290bf;
    cursor: pointer;
    font-size: 16px;
    background-color: transparent;
`
export const LogoutButton = styled.button`
    background-color: #e3404b;
    color: #fff;
    font-weight: bold;
    border: none;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    padding: 10px;
    width: 120px;
    font-size: 15px;
`
export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 20%;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`
export const ThemeButton = styled.button`
  background: none;
  border: none;
  outline: none;
  margin-right: 10px;
`
export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`