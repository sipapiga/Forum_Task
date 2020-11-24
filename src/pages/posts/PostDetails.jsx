import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';

import ForumKit from '../../data/ForumKit';
import AuthKit from '../../data/AuthKit';
import {
  PostChipLink,
  ContentDiv,
  PostDetailCategory,
  PostDetailsDiv,
} from './post.style';
import PostContext from '../../contexts/postContext';
import UserContext from '../../contexts/userContext';
import CommentList from '../../components/comment/CommentList';
import CreateComment from '../../components/comment/CreateComment';
import RelatedPost from '../../components/relatedPost/RelatedPost';
import CustomButton from '../../components/custom-button/Custom-button';

import moment from 'moment';
import renderHTML from 'react-render-html';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostDetails(props) {
  const [postData, setPostData] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const ID = props.computedMatch.params.id;
  const [subscribe, setSubscribe] = useState(null);
  const [isPinned, setIsPinned] = useState(null);
  const [isOpen, setIsOpen] = useState(false); //set open to modal
  const forumKit = new ForumKit();
  const authKit = new AuthKit();

  const handleClose = () => setIsOpen(false);
  const handleShow = () => {
    setIsOpen(false);
    if (currentUser.id === postData.author.id) {
      setIsOpen(true);
      return;
    }
    toast.error('You are not allowed to delete this post.');
  };

  function fetchPostData() {
    try {
      forumKit.getPost(ID).then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
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
  function handleDeletePost() {
    try {
      forumKit.deletePost(ID).then((res) => {
        if (res.status !== 204) {
          return;
        }
        props.history.push({
          pathname: '/posts',
          state: { successMsg: 'Post Deleted' },
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
          <PostDetailsDiv>
            <h2 className="display-5">
              {postData.category &&
                forumKit.getCategoryText(postData.category.id)[2]}{' '}
              {postData.title}
            </h2>
            <div className="text-danger">
              <i className="trash alternate icon" onClick={handleShow}></i>
            </div>
          </PostDetailsDiv>
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
            <p className="font-weight-light">
              Last Updated :{' '}
              {moment(postData.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          </ContentDiv>
          <PostDetailsDiv>
            <div className="row ml-1">
              <div className="mr-2">
                {isPinned ? (
                  <div
                    className="ui icon button"
                    onClick={() => setIsPinned(!isPinned)}
                  >
                    <i className="thumbtack icon" style={{ color: 'red' }}></i>
                  </div>
                ) : (
                  <div
                    className="ui icon button"
                    onClick={() => setIsPinned(!isPinned)}
                  >
                    <i className="thumbtack icon"></i>
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
                    className="ui icon button"
                    onClick={() => setSubscribe(!subscribe)}
                  >
                    <i className="bell icon" style={{ color: 'red' }}></i>
                  </div>
                </>
              ) : (
                <div
                  className="ui icon button"
                  onClick={() => setSubscribe(!subscribe)}
                >
                  <i className="bell slash icon"></i>
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
                <i className="comments icon"></i>{' '}
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
              <i className="comment alternate icon"></i>{' '}
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
          <ToastContainer />
          {renderedPost}
        </div>
      ) : (
        <div className="ui loading segment" style={{ height: '80vh' }}>
          <p>Loading...</p>
        </div>
      )}
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <CustomButton bgColor="#6c757d" onClick={handleClose}>
            No
          </CustomButton>
          <CustomButton bgColor="#007bff" onClick={handleDeletePost}>
            Yes
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default withRouter(PostDetails);
