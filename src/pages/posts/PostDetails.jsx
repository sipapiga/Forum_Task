import React, { useState, useEffect } from 'react';

import ForumKit from '../../data/ForumKit';
import { PostCategoryChips, PostChipLink, ContentDiv } from './post.style';
import PostContext from '../../contexts/postContext';
import CommentList from '../../components/comment/CommentList';
import CreateComment from '../../components/comment/CreateComment';

import faker from 'faker';
import moment from 'moment';
import renderHTML from 'react-render-html';

export default function PostDetails(props) {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const ID = props.computedMatch.params.id;
  const forumKit = new ForumKit();

  function fetchPostData() {
    try {
      forumKit.getPost(ID).then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          setPostData(data);
          setLoading(true);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPostData();
  }, []);

  const renderedPost = postData && (
    <div className="container-fluid" key={postData.id}>
      <section>
        <div className="row">
          <img
            src={faker.image.nature()}
            alt=""
            className="img-fluid"
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="container content">
          <ContentDiv className="text-center">
            <h1 className="display-4">{postData.title}</h1>
          </ContentDiv>
          <ContentDiv className="text-right">
            <b className="lead"> Written by </b>
            {postData.author ? <>{postData.author.firstName}</> : <>Anonym</>} |
            <b className="lead"> Published </b>{' '}
            {moment(postData.createdAt).fromNow()}
          </ContentDiv>
          <ContentDiv>
            {postData.category ? (
              <PostCategoryChips
                bgColor={forumKit.getCategoryText(postData.category.id)[1]}
                width="10%"
              >
                <PostChipLink to={`/posts/categories/${postData.category.id}`}>
                  {postData.category && postData.category.title}
                </PostChipLink>
              </PostCategoryChips>
            ) : (
              <></>
            )}
          </ContentDiv>
          <ContentDiv>
            {postData.content && renderHTML(postData.content)}
          </ContentDiv>
        </div>
        <PostContext.Provider value={{ postData, setPostData }}>
          <div className="container reply mt-5 mb-5">
            <section>
              <div className="ui segment">
                <p className="text-info ">
                  <strong>
                    {postData ? postData.countResponses : 0} Comments
                  </strong>
                </p>
                <CreateComment id={postData.id} />
                <CommentList
                  id={postData.id}
                  comments={postData && postData.responses}
                />
              </div>
            </section>
          </div>
        </PostContext.Provider>
      </section>
    </div>
  );

  return (
    <>
      {loading ? (
        <div style={{ backgroundColor: 'white' }}>{renderedPost}</div>
      ) : (
        <div class="ui loading segment" style={{ height: '80vh' }}>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
