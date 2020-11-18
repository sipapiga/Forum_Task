import React, { useEffect, useContext } from 'react';
import faker from 'faker';
import moment from 'moment';
import ForumKit from '../../data/ForumKit';
import PostContext from '../../contexts/postContext';
import {
  PostContainer,
  PostLink,
  PostCategoryChips,
  PostChipLink,
} from './post.style';

export default function Posts() {
  const { postListData, setPostListData } = useContext(PostContext);
  const forumKit = new ForumKit();

  function getPosts() {
    try {
      forumKit.getPosts().then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          setPostListData(data.results);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const renderedPostList =
    postListData &&
    postListData.map((post) => {
      console.log(post.author);
      return (
        <PostContainer className="ui grey segment middle aligned divided list mt-4">
          <div className="item">
            <div className="right floated content">
              {forumKit.getCategoryText(post.category) && (
                <PostCategoryChips>
                  <PostChipLink to={`/posts/categories/${post.category}`}>
                    {forumKit.getCategoryText(post.category)}
                  </PostChipLink>
                </PostCategoryChips>
              )}
            </div>
            <div class="content">
              <PostLink className="header" to={`/posts/${post.id}`}>
                {post.title}
              </PostLink>
              <div className="description">
                <img
                  className="ui avatar image"
                  src={faker.image.avatar()}
                  alt=""
                />
                <b> Written by </b>
                {post.author ? <>{post.author.firstName}</> : <>Anonym</>} |
                <b> Published </b> {moment(post.createdAt).fromNow()}
              </div>
            </div>
          </div>
        </PostContainer>
      );
    });

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-8"> {renderedPostList}</div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}
