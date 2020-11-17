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
            Welcome : {currentUser.firstName}
            <OptionLink to="/home">Home</OptionLink>
            <OptionLink to="/posts">Posts</OptionLink>
            <OptionDiv
              onClick={() => {
                authKit.removeToken();
                setCurrentUser(null);
              }}
            >
              Logout
            </OptionDiv>
          </>
        ) : (
          <>
            <OptionLink to="/login">Login</OptionLink>
          </>
        )}
      </OptionContainer>
    </HeaderContainer>
  );
}
