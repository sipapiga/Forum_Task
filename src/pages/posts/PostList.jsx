import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import ForumKit from '../../data/ForumKit';
import PostListContext from '../../contexts/postListContext';
import { PostLink, PostCategoryChips, PostChipLink } from './post.style';
import CustomButton from '../../components/custom-button/Custom-button';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

export default function Posts() {
  const { postListData, setPostListData } = useContext(PostListContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const forumKit = new ForumKit();
  const items = [{ label: 'Recent' }, { label: 'Top Views' }];

  function getPosts() {
    try {
      forumKit.getPosts().then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          if (data.next == null) {
            setLastPage(true);
          }
          setPostListData(
            data.results
              .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
              .reverse()
          );

          setLoading(true);
          setPage(page + 1);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  function loadMorePosts(page) {
    console.log(page);
    try {
      forumKit.loadMorePosts(page).then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          if (data.next == null) {
            setLastPage(true);
          }
          setPostListData([...postListData, ...data.results]);
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
        <tbody key={post.id}>
          <tr>
            <td className="selectable">
              <PostLink to={`/posts/${post.id}`}>{post.title}</PostLink>
            </td>
            <td className="left aligned selectable categoryColumn">
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
            <td className="right aligned">
              {post.author ? <>{post.author.firstName}</> : <>Anonym</>}
            </td>
            <td className="selectable">
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

  function getTopPosts(selected) {
    if (selected[0] === 'Top Views') {
      setPostListData(
        [...postListData]
          .sort((a, b) => (a.viewCount > b.viewCount ? 1 : -1))
          .reverse()
      );
    }
    if (selected[0] === 'Recent') {
      setPostListData(
        [...postListData]
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .reverse()
      );
    }
    console.log(postListData);
  }

  return (
    <div
      className="container-fluid mb-3"
      style={{ maxHeight: '85vh', overflowY: 'scroll' }}
    >
      <Breadcrumb onClick={getTopPosts}>
        {items.map((item) => {
          return <div>{item.label} </div>;
        })}
      </Breadcrumb>
      {loading ? (
        <>
          <table className="ui selectable table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Category</th>
                <th>Written by</th>
                <th>Replies</th>
                <th>Views</th>
                <th>Published </th>
              </tr>
            </thead>
            {renderedPostList}
          </table>
          {lastPage ? (
            <></>
          ) : (
            <div className="text-center">
              <CustomButton onClick={() => loadMorePosts(page)}>
                Load More
              </CustomButton>
            </div>
          )}
        </>
      ) : (
        <div className="ui loading segment" style={{ height: '80vh' }}></div>
      )}
    </div>
  );
}
