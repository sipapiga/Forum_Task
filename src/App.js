import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import UserContext from './contexts/userContext';
import PostContext from './contexts/postContext';
import AuthKit from './data/AuthKit';
import './App.css';

import PostList from './pages/posts/PostList';
import Header from './components/header/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import CreatePost from './pages/posts/CreatePost';
import PostDetails from './pages/posts/PostDetails';
import CategoryList from './pages/category/CategoryList';
import NotFoundPage from './pages/404/NotFoundPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [postListData, setPostListData] = useState(null);
  const authKit = new AuthKit();

  useEffect(() => {
    if (authKit.getSessionToken() !== null) {
      authKit
        .getMe()
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data);
        });
    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <PostContext.Provider value={{ postListData, setPostListData }}>
          <Header />
          <Switch>
            <ProtectedRoute path="/home" component={Home}></ProtectedRoute>
            <ProtectedRoute exact path="/" component={Home}></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/posts/create/"
              component={CreatePost}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/posts/categories/:id"
              component={CategoryList}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/posts/:id"
              component={PostDetails}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/posts"
              component={PostList}
            ></ProtectedRoute>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route component={NotFoundPage}></Route>
          </Switch>
        </PostContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
