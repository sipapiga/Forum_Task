import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { CreatePostButton } from './post.style';
import FormInput from '../../components/form-input/Form-input';
import ForumKit from '../../data/ForumKit';

function CreatePost(props) {
  console.log(props);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const forumKit = new ForumKit();

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title,
      content,
      category: parseInt(selectedCategory),
    };
    console.log(payload);
    try {
      forumKit.createPost(payload).then((res) => {
        console.log(res);
        if (res.status !== 201) {
          return;
        }
        props.history.push({
          pathname: '/posts',
          state: { successMsg: 'Post Created' },
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  function fetchCategories() {
    try {
      forumKit.getCategories().then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          setCategories(data.results);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  const renderedCategories =
    categories &&
    Object.entries(categories).map((category) => {
      return (
        <>
          <ul
            key={category[1].id}
            style={{ maxHeight: '200px', overflowY: 'scroll' }}
          >
            <li className="list-unstyled">
              <input
                onChange={(e) => setSelectedCategory(e.target.value)}
                type="radio"
                className="form-check-input"
                value={category[1].id}
                name="exampleRadios"
              />
              <label className="form-check-label">{category[1].title}</label>
            </li>
          </ul>
        </>
      );
    });

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="title"
              value={title}
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <ReactQuill theme="snow" value={content} onChange={setContent} />
            <CreatePostButton type="submit" bgColor="#215fa2" className>
              Submit
            </CreatePostButton>
          </form>
        </div>
        <div className="col-md-3">
          <h4>Categories</h4>
          <hr />
          {renderedCategories}
        </div>
      </div>
    </div>
  );
}

export default withRouter(CreatePost);
