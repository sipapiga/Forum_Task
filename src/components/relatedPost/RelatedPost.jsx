import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthKit from '../../data/AuthKit';
import moment from 'moment';

import { ContentDiv, PostDetailsDiv } from '../../pages/posts/post.style';
import PostListContext from '../../contexts/postListContext';

// Get Posts that have the same category as postDetail
export default function RelatedPost({ postData }) {
  const { postListData } = useContext(PostListContext);
  const count = 100;
  const authKit = new AuthKit();

  function isCategoryFound(post) {
    if (post.category) {
      if (postData.category) {
        if (post.id !== postData.id)
          return post.category === postData.category.id;
      }
    }
    return false;
  }
  const relatedPosts =
    postListData && postListData.filter(isCategoryFound, postData);

  useEffect(() => {}, [postListData]);
  return (
    <div className="container-fluid mb-5">
      {relatedPosts && relatedPosts.length !== 0 && (
        <div>
          <p className="text-info ">
            <strong>
              <i className="clone icon"></i>Related Posts
            </strong>
          </p>
          <hr />
        </div>
      )}

      {relatedPosts &&
        relatedPosts
          .sort((a, b) => 0.5 - Math.random()) //Shuffle an array
          .slice(0, 3)
          .map((post) => {
            return (
              <div className="ui segment" key={post.id}>
                <ContentDiv>
                  <Link target="_blank" to={`/posts/${post.id}`}>
                    <h3>{post.title}</h3>
                  </Link>
                  <p className="font-weight-light">
                    {' '}
                    {post.content &&
                      post.content.slice(0, count) +
                        (post.content.length > count ? '...' : '')}
                  </p>
                </ContentDiv>

                <PostDetailsDiv>
                  <div className="ml-2">
                    {' '}
                    <b className="lead"> Written by </b>
                    {post.author ? (
                      <>
                        {post.author.firstName}{' '}
                        <i
                          className={`${
                            authKit.getCountryText(post.country).flag
                          }`}
                        />
                      </>
                    ) : (
                      <>Anonym</>
                    )}{' '}
                    |<b className="lead"> Published </b>{' '}
                    {moment(post.createdAt).fromNow()}
                  </div>
                  <div>
                    <i className="comments icon ui grey "></i>{' '}
                    {post.countResponses}
                  </div>
                </PostDetailsDiv>
              </div>
            );
          })}
    </div>
  );
}
