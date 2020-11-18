import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ForumKit from '../../data/ForumKit';
import faker from 'faker';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function CategoryList(props) {
  const [postListByCategory, setPostListByCategory] = useState(null);
  const ID = props.computedMatch.params.id;
  const forumKit = new ForumKit();

  function fetchPostbyCategory() {
    try {
      forumKit.getPostListByCategory(ID).then((res) => {
        if (res.status !== 200) {
          <Redirect to="/404" />;
          return;
        }
        res.json().then((data) => {
          setPostListByCategory(data);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPostbyCategory();
  }, []);

  return (
    <div className="container">
      <h2>{postListByCategory && postListByCategory.title}</h2>
      <div className="ui segment">
        {postListByCategory &&
          postListByCategory.posts.map((post) => {
            return (
              <div key={post.id} className="ui brown segment">
                <div className="item">
                  <div className="content">
                    <Link className="header" to={`/posts/${post.id}`}>
                      <h4 className="mb-3"> {post.title}</h4>
                    </Link>
                    <div className="description">
                      <img
                        className="ui avatar image"
                        src={faker.image.avatar()}
                        alt=""
                      />
                      <b> Written by </b>
                      {post.author ? (
                        <>{post.author.firstName}</>
                      ) : (
                        <>Anonym</>
                      )}{' '}
                      |<b> Published </b> {moment(post.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
