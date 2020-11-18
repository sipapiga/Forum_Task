import React, { useContext, useEffect } from 'react';
import CommentContext from '../../contexts/commentContext';
import ForumKit from '../../data/ForumKit';

import faker from 'faker';
import moment from 'moment';
import renderHTML from 'react-render-html';

export default function CommentList({ id }) {
  const { commentListData } = useContext(CommentContext);

  const renderedComments =
    commentListData &&
    commentListData.map((comment) => {
      return (
        <div className="ui relaxed list">
          <div className="item">
            <img
              className="ui avatar image"
              alt=""
              src={faker.image.people()}
            />
            <div className="content">
              <p className="header text-secondary">
                {comment.author ? <>{comment.author.firstName}</> : <>Anonym</>}
                <strong> . </strong>
                {moment(comment.createdAt).fromNow()}
              </p>
              <div className="description">
                <strong>{comment.title}</strong>
                <p>{comment.content && renderHTML(comment.content)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  return <div>{renderedComments}</div>;
}
