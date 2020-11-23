import React, { useContext, useEffect } from 'react';

import moment from 'moment';
import PostListContext from '../../contexts/postListContext';
import { Link } from 'react-router-dom';

export default function CategoryList(props) {
  const { postListData } = useContext(PostListContext);
  const ID = props.computedMatch.params.id;

  function isCategoryFound(post) {
    if (post.category) {
      return post.category == ID; //ID and post.category is not the same type
    }

    return false;
  }
  const postsByCategory =
    postListData && postListData.filter(isCategoryFound, ID);

  useEffect(() => {}, [postListData]);

  return (
    <div className="container">
      <div className="ui segment">
        <h2>Category {ID}</h2>
        {postsByCategory &&
          postsByCategory.map((post) => {
            return (
              <div key={post.id} className="ui brown segment">
                <div className="item">
                  <div className="content">
                    <Link className="header" to={`/posts/${post.id}`}>
                      <h4 className="mb-3">
                        {' '}
                        <i className="star icon text-info"></i> {post.title}
                      </h4>
                    </Link>
                    <div className="description">
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
