import React, { useContext, useState, useEffect } from 'react';

import faker from 'faker';
import { Link } from 'react-router-dom';

import UserContext from '../../contexts/userContext';
import Authkit from '../../data/AuthKit';
import ForumKit from '../../data/ForumKit';
import CustomButton from '../../components/custom-button/Custom-button';
import { HomeContainer } from './home.style';
import Segment from '../../components/segment/Segment';

export default function Home() {
  const [postListData, setPostListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const colors = ['blue', 'pink', 'green'];

  const authKit = new Authkit();
  const forumKit = new ForumKit();

  function getPosts() {
    try {
      forumKit.getPosts().then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          setPostListData(data.results);
          setLoading(true);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  const renderedPopularPosts =
    postListData &&
    postListData
      .sort((a, b) => (a.viewCount > b.viewCount ? 1 : -1))
      .reverse()
      .slice(0, 3)
      .map((post, index) => {
        return (
          <Segment
            key={index}
            post={post}
            index={index}
            postType="popularPosts"
            colors={colors}
          />
        );
      });

  const renderedMostReplies =
    postListData &&
    postListData
      .sort((a, b) =>
        parseInt(a.countResponses) > parseInt(b.countResponses) ? 1 : -1
      )
      .reverse()
      .slice(0, 3)
      .map((post, index) => {
        return (
          <Segment
            key={index}
            post={post}
            index={index}
            postType="mostReplies"
            colors={colors}
          />
        );
      });

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '90vh' }}>
        <HomeContainer className="col-md-4 col-sm-12 ">
          <div className="ui centered card">
            <div className="image">
              <img src={faker.image.people()} alt="" />
            </div>
            <div className="content">
              <div className="header">
                {currentUser && currentUser.firstName}{' '}
                {currentUser && currentUser.lastName}
              </div>
              <div className="description">
                <div>{currentUser && currentUser.email}</div>
                <div>
                  {currentUser &&
                    authKit.getCountryText(currentUser.country).name}{' '}
                  <i
                    className={`${
                      currentUser &&
                      authKit.getCountryText(currentUser.country).flag
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </HomeContainer>
        <div className="col-md-8 col-sm-12">
          <div className="jumbotron">
            <div className="row d-flex justify-content-between mr-3">
              <h1 className="display-4">Forum 1.0</h1>
              <Link to="/posts/">
                <CustomButton bgColor="#215fa2">Read Posts</CustomButton>
              </Link>
            </div>
            <p className="lead">
              The best forum about everything in the entire universe.
            </p>
            {loading ? (
              <div className="container-fulid">
                <div className="ui segments">
                  <div className="ui segment ">
                    <h3>Popular Posts</h3>
                    {renderedPopularPosts}
                  </div>
                  <div className="ui segment">
                    <h3>Most Replies </h3>
                    {renderedMostReplies}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="ui loading segment"
                style={{ height: '20vh' }}
              ></div>
            )}

            <hr className="my-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
