import React, { useState, useEffect } from 'react';

import ForumKit from '../../data/ForumKit';
import AuthKit from '../../data/AuthKit';
import {
  PostChipLink,
  ContentDiv,
  PostDetailCategory,
  PostDetailsDiv,
} from './post.style';
import PostContext from '../../contexts/postContext';
import CommentList from '../../components/comment/CommentList';
import CreateComment from '../../components/comment/CreateComment';

import moment from 'moment';
import renderHTML from 'react-render-html';
import RelatedPost from '../../components/relatedPost/RelatedPost';
import CustomButton from '../../components/custom-button/Custom-button';

export default function PostDetails(props) {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const ID = props.computedMatch.params.id;
  const [subscribe, setSubscribe] = useState(null);
  const [isPinned, setIsPinned] = useState(null);
  const forumKit = new ForumKit();
  const authKit = new AuthKit();

  function fetchPostData() {
    try {
      forumKit.getPost(ID).then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          console.log(data);
          setPostData(data);
          setLoading(true);
          setSubscribe(data.userSubscribed);
          setIsPinned(data.isPinned);
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
    <>
      <section key={postData.id} className="container mb-5">
        <div className="ui segment">
          <ContentDiv>
            <h2 className="display-5">
              <i class="fas fa-star text-primary"></i> {postData.title}
            </h2>
          </ContentDiv>
          <ContentDiv className="text-right">
            {postData.category ? (
              <PostDetailCategory
                bgColor={forumKit.getCategoryText(postData.category.id)[1]}
                width="10%"
              >
                <PostChipLink to={`/posts/categories/${postData.category.id}`}>
                  {postData.category && postData.category.title}
                </PostChipLink>
              </PostDetailCategory>
            ) : (
              <></>
            )}
          </ContentDiv>
          <ContentDiv>
            {postData.content && renderHTML(postData.content)}
          </ContentDiv>
          <ContentDiv>
            <p class="font-weight-light">
              Last Updated :{' '}
              {moment(postData.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          </ContentDiv>
          <PostDetailsDiv>
            <div className="row ml-1">
              <div className="mr-2">
                {isPinned ? (
                  <div
                    class="ui icon button"
                    onClick={() => setIsPinned(!isPinned)}
                  >
                    <i class="thumbtack icon" style={{ color: 'red' }}></i>
                  </div>
                ) : (
                  <div
                    class="ui icon button"
                    onClick={() => setIsPinned(!isPinned)}
                  >
                    <i class="thumbtack icon"></i>
                  </div>
                )}
              </div>
              |
              <div className="ml-2">
                {' '}
                <b className="lead"> Written by </b>
                {postData.author ? (
                  <>
                    {postData.author.firstName}{' '}
                    <i
                      className={`${
                        authKit.getCountryText(postData.country).flag
                      }`}
                    />
                  </>
                ) : (
                  <>Anonym</>
                )}{' '}
                |<b className="lead"> Published </b>{' '}
                {moment(postData.createdAt).fromNow()}
              </div>
            </div>
            <div className="row mr-2">
              {subscribe ? (
                <>
                  <div
                    class="ui icon button"
                    onClick={() => setSubscribe(!subscribe)}
                  >
                    <i class="bell icon" style={{ color: 'red' }}></i>
                  </div>
                </>
              ) : (
                <div
                  class="ui icon button"
                  onClick={() => setSubscribe(!subscribe)}
                >
                  <i class="bell slash icon"></i>
                </div>
              )}
            </div>
          </PostDetailsDiv>
        </div>
      </section>
      <PostContext.Provider value={{ postData, setPostData }}>
        <section className="container reply mt-5 mb-5">
          <div>
            <p className="text-info ">
              <strong>
                <i className="fa fa-comments"></i>{' '}
                {postData ? postData.countResponses : 0} Comments
              </strong>
            </p>
            <hr />
          </div>

          <CommentList
            id={postData.id}
            comments={postData && postData.responses}
          />
          <div className="mt-5">
            <p className="text-info ">
              <i className="fas fa-comment-dots ml-1"></i>{' '}
              <strong>Join the discussion</strong>
            </p>
            <hr />
          </div>
          {postData.isClosed ? (
            <>
              <div className="ui segment">
                <p>This duscussion is close</p>
              </div>
            </>
          ) : (
            <CreateComment id={postData.id} />
          )}
        </section>
        <section className="container mt-5 mb-5">
          <RelatedPost postData={postData}></RelatedPost>
        </section>
      </PostContext.Provider>
    </>
  );

  return (
    <>
      {loading ? (
        <div className="container-fluid" style={{ backgroundColor: 'white' }}>
          {renderedPost}
        </div>
      ) : (
        <div className="ui loading segment" style={{ height: '80vh' }}>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
