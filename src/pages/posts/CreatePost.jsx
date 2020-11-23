import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { CreatePostButton } from './post.style';
import FormInput from '../../components/form-input/Form-input';
import ForumKit from '../../data/ForumKit';
import { modules, formats } from '../../assets/quillSetup';
import Alert from '../../components/alert/Alert';

function CreatePost(props) {
  const [contentData, setContentData] = useState(null);
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [giphyData, setGiphyData] = useState([]);
  const [search, setSearch] = useState('');
  const [giphySelected, setGiphySelected] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);
  const forumKit = new ForumKit();

  function handleSubmit(e) {
    let content = '';
    e.preventDefault();
    if (contentData === null) return setAlert('Please add a message', 'danger');
    if (selectedCategory === null)
      return setAlert('Please select a category', 'danger');
    if (giphySelected) {
      content = contentData + `<img src=${giphySelected} alt="">`;
    } else {
      content = contentData;
    }
    const payload = {
      title,
      content,
      category: parseInt(selectedCategory),
    };
    console.log(payload);
    /*   try {
      forumKit.createPost(payload).then((res) => {
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
    } */
  }

  function fetchCategories() {
    try {
      forumKit.getCategories().then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          setCategories(data.results);
          setLoading(true);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  function fetchGiphyData(e) {
    if (search === '') return;

    e.preventDefault();
    const params = new URLSearchParams({
      api_key: '4JjVU2VmNVztwL1lCLiJ2GTU9ZCVdNBW',
      limit: 10,
      q: search,
    });
    try {
      fetch(`https://api.giphy.com/v1/gifs/search?${params}`).then((res) => {
        if (res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          setGiphyData(data.data);
          setSearch('');
          setGiphySelected(null);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  function setAlert(msg, type) {
    setAlertMsg({ msg, type });
    setTimeout(() => {
      setAlertMsg(null);
    }, 2000);
  }

  const renderedCategories =
    categories &&
    categories.map((category) => {
      return (
        <div key={category.id}>
          <ul>
            <li className="list-unstyled">
              <input
                onChange={(e) => setSelectedCategory(e.target.value)}
                type="radio"
                className="form-check-input"
                value={category.id}
                name="exampleRadios"
              />
              <label className="form-check-label">{category.title}</label>
            </li>
          </ul>
        </div>
      );
    });

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div
      className="container"
      style={{ backgroundColor: 'white', height: '80vh' }}
    >
      <div className="row">
        <div className="col-md-9">
          {alertMsg && <Alert alert={alertMsg} />}
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="title"
              value={title}
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <ReactQuill
              theme="snow"
              value={contentData}
              onChange={setContentData}
              formats={formats}
              modules={modules}
            />
            <div>
              <div className="ui action input" style={{ width: '100%' }}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search Giphy"
                />
                <button
                  className="ui button"
                  onClick={fetchGiphyData}
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
            {giphySelected ? (
              <></>
            ) : (
              <div className="ui small images">
                {giphyData.map((item) => {
                  return (
                    <img
                      style={{ cursor: 'pointer' }}
                      key={item.id}
                      src={item.images.fixed_height.url}
                      alt=""
                      onClick={() => {
                        setGiphySelected(item.images.fixed_height.url);
                        setAlert('Gifs has been added!', 'success');
                      }}
                    />
                  );
                })}
              </div>
            )}

            <CreatePostButton type="submit" bgColor="#215fa2">
              Submit
            </CreatePostButton>
          </form>
        </div>
        <div className="col-md-3">
          <h4 className="mt-5">Categories</h4>
          <hr />
          {loading ? (
            renderedCategories
          ) : (
            <div className="ui loading segment" style={{ height: '50%' }}></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(CreatePost);
