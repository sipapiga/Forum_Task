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
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [sort, setSort] = useState('createdAt');
  const count = 100;

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
          setCurrentPage(2);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  function loadMorePosts(currentPage) {
    try {
      forumKit.loadMorePosts(currentPage).then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          if (data.next == null) {
            setLastPage(true);
          }
          sortPostList(sort, data);
          setCurrentPage(currentPage + 1);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  function sortPostList(sort, data) {
    if (sort === 'viewCount') {
      setPostListData(
        [...postListData, ...data.results]
          .sort((a, b) => (a.viewCount > b.viewCount ? 1 : -1))
          .reverse()
      );
    } else {
      setPostListData(
        [...postListData, ...data.results]
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .reverse()
      );
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
            <td className="selectable" style={{ width: '60%' }}>
              <PostLink to={`/posts/${post.id}`}>
                {post.category && forumKit.getCategoryText(post.category)[2]}
                {post.title}{' '}
                <p className="font-weight-light" style={{ fontSize: '14px' }}>
                  {' '}
                  {post.content &&
                    post.content.slice(0, count) +
                      (post.content.length > count ? '...' : '')}
                </p>
              </PostLink>
            </td>
            <td className="left aligned selectable categoryColumn">
              {forumKit.getCategoryText(post.category) && (
                <PostChipLink to={`/posts/categories/${post.category}`}>
                  <PostCategoryChips
                    bgColor={forumKit.getCategoryText(post.category)[1]}
                  >
                    {forumKit.getCategoryText(post.category)[0]}
                  </PostCategoryChips>
                </PostChipLink>
              )}
            </td>
            <td className="center aligned">
              {post.author ? <>{post.author.firstName}</> : <>Anonym</>}
            </td>
            <td className="selectable">
              <PostChipLink to={`/posts/${post.id}`}>
                <p className="text-dark">
                  <i className="comments icon"></i>{' '}
                  {post.countResponses ? post.countResponses : 0}
                </p>
              </PostChipLink>
            </td>
            <td>
              {' '}
              <i className="eye icon"></i>
              {post.viewCount}
            </td>
            <td>{moment(post.createdAt).fromNow()}</td>
          </tr>
        </tbody>
      );
    });

  function getTopPosts(selected) {
    if (selected[0] === 'Top Views') {
      setSort('viewCount');
      setPostListData(
        [...postListData]
          .sort((a, b) => (a.viewCount > b.viewCount ? 1 : -1))
          .reverse()
      );
    }
    if (selected[0] === 'Recent') {
      setSort('createdAt');
      setPostListData(
        [...postListData]
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .reverse()
      );
    }
  }

  return (
    <div
      className="container-fluid mb-3"
      style={{ maxHeight: '85vh', overflowY: 'scroll' }}
    >
      <Breadcrumb onClick={getTopPosts}>
        {items.map((item, index) => {
          return <div key={index}>{item.label} </div>;
        })}
      </Breadcrumb>
      {loading ? (
        <>
          <table className="ui unstackable selectable table">
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
              <CustomButton onClick={() => loadMorePosts(currentPage)}>
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
