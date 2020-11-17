import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthKit from '../data/AuthKit';

export default class ProtectedRoute extends React.Component {
  render() {
    const authKit = new AuthKit();
    const Component = this.props.component;
    const isAuthenticated = authKit.getSessionToken();
    return isAuthenticated ? (
      <Component {...this.props} />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
  }
}
