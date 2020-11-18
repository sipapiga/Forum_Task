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
              <i className="fa fa-sign-out-alt" />
              Logout
            </OptionDiv>
            <OptionDiv>
              <OptionLink to="/posts/create/">
                <CustomButton>Write a Post</CustomButton>
              </OptionLink>
            </OptionDiv>
          </>
        ) : (
          <>
            <OptionLink to="/login">
              <i className="fa fa-sign-in-alt"></i>
              Login
            </OptionLink>
          </>
        )}
      </OptionContainer>
    </HeaderContainer>
  );
}
