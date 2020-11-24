import React, { useContext, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CreateCommentButton } from './comment.style';
import ForumKit from '../../data/ForumKit';
import PostContext from '../../contexts/postContext';

export default function CreateComment({ id }) {
  const { setPostData } = useContext(PostContext);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const forumKit = new ForumKit();

  function handleSubmit(e) {
    e.preventDefault();
    if (content === '') return toast.error('Please add some comment');
    const payload = {
      title,
      content,
      parent: id,
    };
    try {
      Promise.all([forumKit.createComment(payload), forumKit.getPost(id)]).then(
        ([res1, res2]) => {
          if (res1.status !== 201) {
            res1.json().then((data) => {
              toast.error(data.content[0]);
            });
            return;
          }
          toast.dark('Thx for your comment!');
          setContent('');
          setTitle('');

          if (res2.status !== 200) {
            return;
          }
          res2.json().then((data) => {
            setPostData(data);
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container-fluid mb-5">
      <ToastContainer />
      <div className="ui segment">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
