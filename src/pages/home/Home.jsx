import React, { useContext } from 'react';
import faker, { date } from 'faker';
import UserContext from '../../contexts/userContext';
import Authkit from '../../data/AuthKit';
import CustomButton from '../../components/custom-button/Custom-button';
import { Link } from 'react-router-dom';

export default function Home() {
  const { currentUser } = useContext(UserContext);
  const authKit = new Authkit();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <img
            className="ui medium circular image"
            src={faker.image.people()}
            alt=""
          />
          <div className="container mt-5">
            <div className="d-flex justify-content-around">
              <p className="font-weight-bold">Firstname :</p>
              <p>{currentUser && currentUser.firstName}</p>
            </div>
            <div className="d-flex justify-content-around">
              <p className="font-weight-bold">LastName :</p>
              <p>{currentUser && currentUser.lastName}</p>
            </div>
            <div className="d-flex justify-content-around">
              <p className="font-weight-bold">Email :</p>
              <p>{currentUser && currentUser.email}</p>
            </div>
            <div className="d-flex justify-content-around">
              <p className="font-weight-bold">Country :</p>
              <p>
                {currentUser && authKit.getCountryText(currentUser.country)}
              </p>
            </div>
          </div>
        </div>
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
