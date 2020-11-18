import React, { useContext } from 'react';

import faker from 'faker';
import { Link } from 'react-router-dom';

import UserContext from '../../contexts/userContext';
import Authkit from '../../data/AuthKit';
import CustomButton from '../../components/custom-button/Custom-button';
import Row from '../../components/row/Row';
import { HomeContainer } from './home.style';

export default function Home() {
  const { currentUser } = useContext(UserContext);
  const authKit = new Authkit();

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '90vh' }}>
        <HomeContainer className="col-md-4 col-sm-12 ">
          <img
            className="ui medium circular image centered"
            src={faker.image.people()}
            alt=""
          />
          <div className="container mt-5">
            <Row
              currentUser={currentUser && currentUser.firstName}
              text="First Name"
            />
            <Row
              currentUser={currentUser && currentUser.lastName}
              text="Last Name"
            />
            <Row currentUser={currentUser && currentUser.email} text="Email" />
            <Row
              currentUser={authKit.getCountryText(
                currentUser && currentUser.country
              )}
              text="Country"
            />
          </div>
        </HomeContainer>
        <div className="col-md-8 col-sm-12">
          <div className="jumbotron">
            <h1 className="display-4">Forum 1.0</h1>
            <p className="lead">
              The best forum about everything in the entire universe.
            </p>
            <hr className="my-4" />

            <p className="lead">
              <Link to="/posts/create/">
                <CustomButton bgColor="#215fa2">Write a Post</CustomButton>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
