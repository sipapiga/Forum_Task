import React, { useState, useEffect, useContext } from 'react';

import { SignInContainer, TextLink } from './login.style';
import AuthKit from '../../data/AuthKit';

import FormInput from '../../components/form-input/Form-input';
import CustomButton from '../../components/custom-button/Custom-button';
import UserContext from '../../contexts/userContext';
import Alert from '../../components/alert/Alert';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMsg, setAlertMsg] = useState(null);
  const { setCurrentUser } = useContext(UserContext);
  const authKit = new AuthKit();

  function handleSubmit(event) {
    event.preventDefault();

    try {
      authKit.login(email, password).then((res) => {
        if (res.status !== 200) {
          res.json().then((data) => {
            setAlert(data, 'danger');
          });
          return;
        }
        res.json().then((data) => {
          authKit.setSessionToken(data.token);
          fetchMe();
          props.history.push('/home');
        });
        setEmail('');
        setPassword('');
      });
    } catch (err) {
      console.log(err);
    }
  }
  function fetchMe() {
    try {
      authKit
        .getMe()
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function setAlert(msg, type) {
    setAlertMsg({ msg, type });
    setTimeout(() => {
      setAlertMsg(null);
    }, 1500);
  }

  useEffect(() => {
    if (props.location.state !== undefined) {
      setAlert(props.location.state, 'success');
    }
  }, []);
  return (
    <SignInContainer>
      {alertMsg && <Alert alert={alertMsg}></Alert>}
      <h2>Login</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="email"
          value={email}
          label="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          type="password"
          name="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="text-center">
          <CustomButton type="submit" bgColor="#0e55a2">
            Login
          </CustomButton>
          <TextLink to="/register">
            <p className="mt-3">I do not have an account</p>
          </TextLink>
        </div>
      </form>
    </SignInContainer>
  );
}
