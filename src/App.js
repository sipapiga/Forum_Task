import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import UserContext from './contexts/userContext';
import AuthKit from './data/AuthKit';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const authKit = new AuthKit();

  useEffect(() => {
    if (authKit.getSessionToken() !== null) {
      setCurrentUser(authKit.getSessionToken());
    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Header />
        <Switch>
          <ProtectedRoute path="/home" component={Home}></ProtectedRoute>
          <ProtectedRoute exact path="/" component={Home}></ProtectedRoute>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
