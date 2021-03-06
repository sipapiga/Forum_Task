import React from 'react';

import faker from 'faker';
import moment from 'moment';
import renderHTML from 'react-render-html';

export default function CommentList({ comments }) {
  const renderedComments =
    comments &&
    comments.map((comment, index) => {
      return (
        <div className="ui segment" key={index}>
          <div className="ui relaxed list">
            <div className="item">
              <p className="text-info">Comment {index + 1}</p>
              <img
                className="ui avatar image"
                alt=""
                src={faker.image.people()}
              />
              <div className="content">
                <p className="header text-secondary">
                  {comment.author ? (
                    <>{comment.author.firstName}</>
                  ) : (
                    <>Anonym</>
                  )}
                  <strong> . </strong>
                  {moment(comment.createdAt).fromNow()}
                </p>
                <div className="description">
                  <strong>{comment.title}</strong>
                  <div>{comment.content && renderHTML(comment.content)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
      {renderedComments}
    </div>
  );
}
