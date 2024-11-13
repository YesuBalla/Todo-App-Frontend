import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import { IoMdSearch } from "react-icons/io";
import todoLogo from '../../assets/todoLogo.png';

import { BsMoon, BsBrightnessHigh } from 'react-icons/bs';
import ThemeContext from '../../context/ThemeContext';

import { 
  NavHeader,
  LinkItem,
  AppLogo,
  SearchBarContainer,
  Input,
  LogoutButton,
  ActionsContainer,
  ThemeButton,
  ProfileImage
} from './styledComponents';

const Header = (props) => {
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const onChangeTheme = () => {
          toggleTheme();
        };

        const onClickLogout = () => {
          console.log('logout');
          const { history } = props;
          Cookies.remove('jwt_token');
          history.replace('/login');
        };

        return (
          <NavHeader $bgcolor={isDarkTheme ? '#0f0f0f' : '#f9f7f8'}>
            <LinkItem to="/">
              <AppLogo src={todoLogo} alt="Logo" />
            </LinkItem>
            <SearchBarContainer $bgcolor={isDarkTheme ? '#454141' : '#f0dada'}>
              <IoMdSearch size={25} color={isDarkTheme ? '#0f0f0f' : '#524f4e'} />
              <Input type='search' placeholder='Search' />
            </SearchBarContainer>
            <ActionsContainer>
              <ThemeButton
                type="button"
                onClick={onChangeTheme}
              >
                {isDarkTheme ? (
                  <BsBrightnessHigh color="#ffffff" size={25} />
                ) : (
                  <BsMoon size={25} />
                )}
              </ThemeButton>
              <LinkItem to="/profile">
                <ProfileImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </LinkItem>
              <LogoutButton
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </LogoutButton>
            </ActionsContainer>
          </NavHeader>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default withRouter(Header);
