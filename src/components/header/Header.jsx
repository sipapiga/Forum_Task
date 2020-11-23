import React, { useContext } from 'react';
import { ReactComponent as Logo } from '../../assets/blog-svg.svg';
import {
  HeaderContainer,
  LogoContainer,
  OptionContainer,
  OptionDiv,
  OptionLink,
} from './header.style';
import AuthKit from '../../data/AuthKit';
import UserContext from '../../contexts/userContext';
import CustomButton from '../custom-button/Custom-button';

export default function Header() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const authKit = new AuthKit();
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>

      <OptionContainer>
        {currentUser ? (
          <>
            Welcome : {currentUser && currentUser.firstName}
            <OptionLink to="/home">Home</OptionLink>
            <OptionLink to="/posts">Posts</OptionLink>
            <OptionDiv
              onClick={() => {
                authKit.removeToken();
                setCurrentUser(null);
              }}
            >
              <i className="sign-out icon" />
              Logout
            </OptionDiv>
            <OptionDiv>
              <OptionLink to="/posts/create/">
                <CustomButton>
                  {' '}
                  <i className="plus icon"></i>Write a Post
                </CustomButton>
              </OptionLink>
            </OptionDiv>
          </>
        ) : (
          <>
            <OptionLink to="/login">
              <i className="sign-in icon"></i>
              Login
            </OptionLink>
          </>
        )}
      </OptionContainer>
    </HeaderContainer>
  );
}
