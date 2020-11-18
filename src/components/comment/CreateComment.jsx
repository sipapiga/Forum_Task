import React, { useContext, useEffect, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CreateCommentButton } from './comment.style';
import ForumKit from '../../data/ForumKit';
import CommentContext from '../../contexts/commentContext';

export default function CreateComment({ id }) {
  const { setCommentListData } = useContext(CommentContext);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const forumKit = new ForumKit();

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title,
      content,
      parent: id,
    };
    try {
      forumKit.createComment(payload).then((res) => {
        if (res.status !== 201) {
          res.json().then((data) => {
            toast.error(data.content[0]);
          });
          return;
        }
        toast.dark('Thx for your comment!');
        fetchCommentList();
        setContent('');
        setTitle('');
      });
    } catch (err) {
      console.log(err);
    }
  }

  function fetchCommentList() {
    try {
      forumKit.getComments(id).then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          setCommentListData(data.results);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container-fluid mb-5">
      <ToastContainer />
      <div className="ui segment">
        <h3 className="text-secondary">
          <strong>Join the discussion</strong>
        </h3>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
          <CreateCommentButton type="submit">Submit</CreateCommentButton>
        </form>
      </div>
    </div>
  );
}
