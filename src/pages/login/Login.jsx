import React, { useState, useEffect, useContext } from 'react';
import FormInput from '../../components/form-input/Form-input';
import { SignInContainer, TextLink } from './login.style';
import AuthKit from '../../data/AuthKit';
import CustomButton from '../../components/custom-button/Custom-button';
import UserContext from '../../contexts/userContext';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMsg, setAlertMsg] = useState(null);
  const { setCurrentUser } = useContext(UserContext);
  const authKit = new AuthKit();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password);

    try {
      authKit.login(email, password).then((res) => {
        if (res.status !== 200) {
          res.json().then((data) => {
            setAlertMsg(data);
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

  useEffect(() => {
    if (props.location.state !== null) {
      setAlertMsg(props.location.state);
    }
    setTimeout(() => {
      setAlertMsg(null);
    }, 1500);
  }, []);
  return (
    <SignInContainer>
      {alertMsg &&
        Object.entries(alertMsg).map((msg, index) => {
          if (msg[0] === 'successMsg') {
            return (
              <div key={index} className="alert alert-success" role="alert">
                {msg[1]}
              </div>
            );
          } else {
            return (
              <div key={index} className="alert alert-danger" role="alert">
                {msg[1]}
              </div>
            );
          }
        })}
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
