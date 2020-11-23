import React, { useState, useEffect } from 'react';
import FormInput from '../../components/form-input/Form-input';
import { SignInContainer, TextLink } from '../login/login.style';
import AuthKit from '../../data/AuthKit';
import CustomButton from '../../components/custom-button/Custom-button';
import Dropdown from '../../components/dropdown/Dropdown';
import Alert from '../../components/alert/Alert';

export default function Register(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countries, setCountries] = useState([]);
  const [options, setOptions] = useState([]);
  const [alertMsg, setAlertMsg] = useState(null);
  const authKit = new AuthKit();

  function handleSubmit(e) {
    e.preventDefault();
    if (countries.length === 0) {
      setAlert('Please select country!', 'danger');
      return;
    }
    const country = countries.id;
    const payload = {
      firstName,
      lastName,
      email,
      password,
      country,
    };
    try {
      authKit.register(payload).then((res) => {
        if (res.status !== 201) {
          res.json().then((data) => {
            console.log(data);
            data.email
              ? setAlert(data.email, 'danger')
              : setAlert(data.password, 'danger');
          });
          return;
        }
        props.history.push({
          pathname: '/login',
          state: 'User Created',
        });
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      });
    } catch (err) {
      console.log(err);
    }
  }
  function getCountryList() {
    try {
      authKit.getCountryList().then((res) => {
        if (res.status !== 200) {
          res.json().then((data) => {
            setAlert(data, 'danger');
          });
          return;
        }
        res.json().then((data) => {
          setOptions(data.results);
        });
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
    getCountryList();
  }, []);

  return (
    <SignInContainer>
      {alertMsg && <Alert alert={alertMsg}></Alert>}
      <h2>Register</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="firstName"
          value={firstName}
          label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <FormInput
          type="text"
          name="lastName"
          value={lastName}
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <FormInput
          type="text"
          name="mail"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Dropdown
          label="Country"
          options={options}
          selected={countries}
          onSelecteChange={setCountries}
        />
        <div className="text-center">
          <CustomButton
            type="submit"
            bgColor="#fb6d9d"
            hover="#b52e5c"
            width="100%"
            className="mt-5"
          >
            register
          </CustomButton>
          <p className="mt-3">
            Already have account?
            <TextLink to="/login">
              <b>Sign In</b>{' '}
            </TextLink>
          </p>
        </div>
      </form>
    </SignInContainer>
  );
}
