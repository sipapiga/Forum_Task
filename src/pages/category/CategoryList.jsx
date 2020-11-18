import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ForumKit from '../../data/ForumKit';
import faker from 'faker';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function CategoryList(props) {
  console.log(props);
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
          Object.entries(postListByCategory.posts).map((post) => {
            console.log(post);
            return (
              <div className="ui brown segment">
                <div className="item">
                  <div class="content">
                    <Link className="header" to={`/posts/${post[1].id}`}>
                      <h4 className="mb-3"> {post[1].title}</h4>
                    </Link>
                    <div className="description">
                      <img
                        className="ui avatar image"
                        src={faker.image.avatar()}
                        alt=""
                      />
                      <b> Written by </b>
                      {post[1].author ? (
                        <>{post[1].author.firstName}</>
                      ) : (
                        <>Anonym</>
                      )}{' '}
                      |<b> Published </b> {moment(post[1].createdAt).fromNow()}
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
