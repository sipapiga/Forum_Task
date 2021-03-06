import React from 'react';

import faker from 'faker';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Segment({ post, index, postType, colors }) {
  return (
    <div key={post.id} className={`ui ${colors[index]} segment`}>
      <div className="item">
        <div className="content">
          <div className="row d-flex justify-content-between mr-1 ml-1">
            <div style={{ width: '70%' }}>
              <Link className="header" to={`/posts/${post.id}`}>
                <h4 className="mb-3"> {post.title}</h4>
              </Link>
            </div>
            <div style={{ width: '30%' }}>
              {postType && postType === 'mostReplies' ? (
                <>
                  {' '}
                  <i className="comments icon"></i> <b> Comments </b>{' '}
                  {post.countResponses}
                </>
              ) : (
                <>
                  {' '}
                  <p className={`ui ${colors[index]} right ribbon label`}>
                    Hot
                  </p>
                  <i className="eye icon"></i> <b> Views </b> {post.viewCount}
                </>
              )}
            </div>
          </div>
          <div className="description">
            <img
              className="ui avatar image"
              src={faker.image.animals()}
              alt=""
            />
            <b> Written by </b>
            {post.author ? <>{post.author.firstName}</> : <>Anonym</>} |
            <b> Published </b> {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
}
