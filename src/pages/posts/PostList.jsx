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
          setPostListData(
            data.results
              .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
              .reverse()
          );
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
      return (
        <tbody>
          <tr>
            <PostLink to={`/posts/${post.id}`}>
              <td>{post.title}</td>
            </PostLink>
            <td className="left aligned">
              {forumKit.getCategoryText(post.category) && (
                <PostCategoryChips
                  bgColor={forumKit.getCategoryText(post.category)[1]}
                >
                  <PostChipLink to={`/posts/categories/${post.category}`}>
                    {forumKit.getCategoryText(post.category)[0]}
                  </PostChipLink>
                </PostCategoryChips>
              )}
            </td>
            <td className="center aligned">
              {post.author ? <>{post.author.firstName}</> : <>Anonym</>}
            </td>
            <td>
              {' '}
              <PostChipLink to={`/posts/${post.id}`}>
                <p className="text-secondary">
                  {post.countResponses ? post.countResponses : 0}
                </p>
              </PostChipLink>
            </td>
            <td>{post.viewCount}</td>
            <td>{moment(post.createdAt).fromNow()}</td>
          </tr>
        </tbody>
      );
    });

  return (
    <div
      className="container mb-3"
      style={{ maxHeight: '85vh', overflowY: 'scroll' }}
    >
      {' '}
      <table className="ui selectable table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Category</th>
            <th>Written by</th>
            <th>Replies</th>
            <th>Views</th>
            <th className="right aligned">Published </th>
          </tr>
        </thead>
        {renderedPostList}
      </table>
    </div>
  );
}
